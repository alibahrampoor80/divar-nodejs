const autoBind = require("auto-bind");
const {optionModel} = require("./option.model");
const {isValidObjectId, default: mongoose} = require("mongoose");
const createHttpError = require("http-errors");
const {optionMessage} = require("./option.message");
const slugify = require("slugify");

class optionService {
    #model

    constructor() {
        autoBind(this)
        this.#model = optionModel
    }
    async find(req, res, next) {

    }

    async create(categoryDto) {

    }


    async checkExistById(id) {

    }
}

module.exports = {
    CategoryService: new optionService()
}