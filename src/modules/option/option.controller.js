const autoBind = require("auto-bind");
const {optionService} = require("./option.service");
const {optionMessage} = require("./option.message");
const {StatusCodes} = require("http-status-codes")

class optionController {
    #service

    constructor() {
        autoBind(this)
        this.#service = optionService
    }

    async create(req, res, next) {
        try {

            const {title, key, guid, enum: list, type, category, required} = req.body
            await this.#service.create({title, key, guid, enum: list, type, category, required})
            return res.json({
                status: StatusCodes.CREATED,
                message: optionMessage.created
            })
        } catch (err) {
            next(err)
            // console.log(err)
        }
    }

    async update(req, res, next) {
        try {

            const {title, key, guid, enum: list, type, category, required} = req.body
            const {id} = req.params
            await this.#service.update(id, {title, key, guid, enum: list, type, category, required})
            return res.json({
                status: StatusCodes.OK,
                message: optionMessage.updated
            })
        } catch (err) {
            next(err)
            // console.log(err)
        }
    }

    async find(req, res, next) {
        try {
            const options = await this.#service.find()
            return res.json(options)
        } catch (err) {
            next(err)
        }
    }


    async findByCategoryId(req, res, next) {
        try {
            const {categoryId} = req.params
            const options = await this.#service.findByCategoryId(categoryId)

            return res.json(options)
        } catch (err) {
            next(err)
        }
    }

    async findByCategorySlug(req, res, next) {
        try {
            const {slug} = req.params
            const options = await this.#service.findByCategorySlug(slug)

            return res.json(options)
        } catch (err) {
            next(err)
        }
    }

    async findById(req, res, next) {
        try {
            const {id} = req.params
            const option = await this.#service.findById(id)
            return res.json(option)
        } catch (err) {
            next(err)
        }
    }

    async deleteById(req, res, next) {
        try {
            const {id} = req.params
            await this.#service.removeById(id)
            return res.json(optionMessage.deleted)
        } catch (err) {
            next(err)
        }
    }


}

module.exports = {
    optionController: new optionController()
}