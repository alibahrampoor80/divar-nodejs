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
}

module.exports = {
    postService: new postService()
}