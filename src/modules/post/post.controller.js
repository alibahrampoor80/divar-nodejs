const autoBind = require("auto-bind");
const {postService} = require("./post.service");
const {StatusCodes} = require("http-status-codes")
const {postMessage} = require("./post.message");
const {categoryModel} = require("../category/category.model");
const createHttpError = require("http-errors");
const {Types} = require("mongoose");
const {getAddressDetail} = require("../../common/utils/http");
const {removeProperty} = require("../../common/utils/function");
const utf8 = require('utf8')

class postController {
    #service

    constructor() {
        autoBind(this)
        this.#service = postService
    }

    async createPostPage(req, res, next) {
        try {
            let {slug} = req.query
            let showBack = false
            let match = {parent: null}
            let options, category
            if (slug) {
                slug = slug.trim()
                category = await categoryModel.findOne({slug})
                if (!category) throw new createHttpError.NotFound(postMessage.notFound)
                options = await this.#service.getCategoryOptions(category._id)
                if (options.length === 0) options = null
                showBack = true
                match = {
                    parent: category._id
                }
            }
            const categories = await categoryModel.aggregate([
                    {
                        $match: match
                    }
                ]
            )
            res.render("./pages/panel/create-post.ejs", {
                categories,
                showBack,
                options,
                category
            })
        } catch (err) {
            next(err)
        }
    }

    async create(req, res, next) {
        try {
            const userId = req.user._id

            const images = req?.files?.map(image => image?.path?.slice(7));
            const {title_post: title, description: content, lat, lng, category} = req.body
            const {address, city, district, province} = await getAddressDetail(lat, lng)
            const options = removeProperty(req.body, ["title_post", "description", "lat", "lng", "category", "images"])
            for (let key in options) {
                let value = options[key]
                delete options[key]
                key = utf8.decode(key)
                options[key] = value
            }
            await this.#service.create({
                title,
                content,
                coordinate: [lat, lng],
                images,
                category: new Types.ObjectId(category),
                options,
                address,
                province,
                city,
                district,
                userId
            })
            const posts = await this.#service.find(userId)
            return res.render("./pages/panel/posts.ejs", {
                posts,
                success_message: postMessage.created,
                error_message: null
            })
            // return res.status(StatusCodes.CREATED).json({
            //     message: postMessage.created
            // })
        } catch (err) {
            next(err)
        }
    }

    async findMyPost(req, res, next) {
        const userId = req.user._id
        try {
            let posts = await this.#service.find(userId)
            // for (let i = 0; i < posts.length; i++) {
            //     let content = posts[i].content;
            //     let index = content.indexOf(">")
            //     let aa = content.indexOf("</p>")
            //     let openTag = content.substring(0, index + 1)
            //     posts[i].content = content.substring(index + 1, aa)
            //     console.log("aaa  ",posts[i].content.split(" ",10).join(" "))
            //     console.log('----,', openTag)
            // }
            // console.log(posts)
            return res.render("./pages/panel/posts.ejs", {
                posts,
                success_message: null,
                error_message: null
            })
        } catch (err) {
            next(err)
        }
    }
}

module.exports = {
    postController: new postController()
}