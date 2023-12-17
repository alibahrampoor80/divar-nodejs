const autoBind = require("auto-bind");
const {CategoryService} = require("./category.service");
const {CategoryMessage} = require("./category.message");
const {StatusCodes} = require("http-status-codes")

class CategoryController {
    #service = CategoryService

    constructor() {
        autoBind(this)
        this.#service = CategoryService
    }

    async create(req, res, next) {
        try {
            const {name, icon, slug, parent} = req.body
            await this.#service.create({name, icon, slug, parent})
            return res.status(StatusCodes.CREATED).json({
                message: CategoryMessage.created
            })
        } catch (err) {
            next(err)
            // console.log(err)
        }
    }

    async find(req, res, next) {
        try {
            const {name, icon, slug, parent} = req.body
            const categories = await this.#service.find()
            return res.status(StatusCodes.OK).json({
                categories
            })
        } catch (err) {
            next(err)

        }
    }


}

module.exports = {
    CategoryController: new CategoryController()
}