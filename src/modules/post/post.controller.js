const autoBind = require("auto-bind");
const {postService} = require("./post.service");
const {StatusCodes} = require("http-status-codes")
const {postMessage} = require("./post.message");

class postController {
    #service

    constructor() {
        autoBind(this)
        this.#service = postService
    }

    async createPostPage(req, res, next) {
        try {
            res.render("./pages/panel/create-post.ejs")
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