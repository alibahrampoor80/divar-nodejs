const autoBind = require("auto-bind");
const {optionService} = require("./option.service");
const {optionMessage} = require("./option.message");
const {StatusCodes} = require("http-status-codes")

class optionController {
    #service = optionService

    constructor() {
        autoBind(this)
        this.#service = optionService
    }

    async create(req, res, next) {
        try {
            res.send("hello")
        } catch (err) {
            next(err)
        }
    }

    async find(req, res, next) {
        try {
            res.send("hello")
        } catch (err) {
            next(err)
        }
    }

    async findByCategoryId(req, res, next) {
        try {
            res.send("hello")
        } catch (err) {
            next(err)
        }
    }

    async findById(req, res, next) {
        try {
            res.send("hello")
        } catch (err) {
            next(err)
        }
    }


}

module.exports = {
    optionController: new optionController()
}