const autoBind = require("auto-bind");
const {postModel} = require("./post.model");
const {isValidObjectId, default: mongoose} = require("mongoose");
const createHttpError = require("http-errors");

class postService {
    #model
    #categoryService

    constructor() {
        autoBind(this)
        this.#model = postModel
    }

}

module.exports = {
    postService: new postService()
}