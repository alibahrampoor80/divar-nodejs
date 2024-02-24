const autoBind = require("auto-bind");
const {postService} = require("./post.service");
const {StatusCodes} = require("http-status-codes")
const {postMessage} = require("./post.message");
const {categoryModel} = require("../category/category.model");
const createHttpError = require("http-errors");
const {Types} = require("mongoose");
const axios = require("axios");

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
            console.log(req.body)
            // res.redirect("/post/create")
            const {title_post: title, description: content, lat, lng, category} = req.body
            delete req.body['title_post']
            delete req.body['description']
            delete req.body['lat']
            delete req.body['lng']
            delete req.body['category']
            delete req.body['images']
            const options = req.body
            const result =
                await axios.get(`${process.env.MAP_URL}?lat=${lat}&lon=${lng}`, {
                    headers: {
                        "x-api-key": process.env.MAP_TOKEN
                    }
                }).then(res => res.data)

            await this.#service.create({
                title,
                content,
                coordinate: [lat, lng],
                images: [],
                category: new Types.ObjectId(category),
                options,
                address: result.address,
                province: result.province,
                city: result.city,
                district: result.district
            })
            return res.status(StatusCodes.CREATED).json({
                message: postMessage.created
            })
        } catch (err) {
            next(err)
        }
    }

}

module.exports = {
    postController: new postController()
}