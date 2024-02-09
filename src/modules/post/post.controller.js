const autoBind = require("auto-bind");
const {postService} = require("./post.service");
const {StatusCodes} = require("http-status-codes")
const {postMessage} = require("./post.message");
const {categoryModel} = require("../category/category.model");
const createHttpError = require("http-errors");

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
            if (slug) {
                slug = slug.trim()
                const category = await categoryModel.findOne({slug})
                if (!category) throw new createHttpError.NotFound(postMessage.notFound)
                showBack = true
                match = {
                    parent: category._id
                }
            } else {
            }
            // console.log(match)
            const categories = await categoryModel.aggregate([
                    {
                        $match: match
                    }
                ]
            )


            res.render("./pages/panel/create-post.ejs", {
                categories,
                showBack,

            })
        } catch (err) {
            next(err)
        }
    }

    async create(req, res, next) {
        try {
            const {name, icon, slug, parent} = req.body
            await this.#service.create({name, icon, slug, parent})
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