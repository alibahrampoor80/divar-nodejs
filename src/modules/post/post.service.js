const autoBind = require("auto-bind");
const {postModel} = require("./post.model");
const {isValidObjectId, default: mongoose} = require("mongoose");
const createHttpError = require("http-errors");
const {optionModel} = require("../option/option.model");
const {postMessage} = require("./post.message");

class postService {
    #model
    #optionModel

    constructor() {
        autoBind(this)
        this.#model = postModel
        this.#optionModel = optionModel
    }

    async getCategoryOptions(categoryId) {
        const options = await this.#optionModel.find({category: categoryId})
        return options
    }

    async create(dto) {
        return await this.#model.create(dto)
    }

    async find(userId) {
        if (userId && isValidObjectId(userId)) return await this.#model.find({userId})
        throw new createHttpError.BadRequest(postMessage.RequestNotValid)
    }

    async checkExistPost(postId) {
        if (!postId || !isValidObjectId(postId)) throw new createHttpError.BadRequest(postMessage.RequestNotValid)
        const post = await this.#model.findById(postId)
        if (!post) throw new createHttpError.NotFound(postMessage.notFound)
        return post
    }

    async remove(postId) {
        await this.checkExistPost(postId);
        await this.#model.deleteOne({_id: postId});
    }
}

module.exports = {
    postService: new postService()
}