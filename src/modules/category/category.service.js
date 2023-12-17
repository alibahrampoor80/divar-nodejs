const autoBind = require("auto-bind");
const {categoryModel} = require("./category.model");
const {isValidObjectId, default: mongoose} = require("mongoose");
const createHttpError = require("http-errors");
const {CategoryMessage} = require("./category.message");
const slugify = require("slugify");

class CategoryService {
    #model

    constructor() {
        autoBind(this)
        this.#model = categoryModel
    }

    async create(categoryDto) {
        if (categoryDto?.parent && isValidObjectId(categoryDto.parent)) {
            const existCategory = await this.checkExistById(categoryDto.parent)
            categoryDto.parent = existCategory._id
            categoryDto.parents = [
                ...new Set(([existCategory._id.toString()].concat(
                        existCategory.parents.map(id => id.toString())
                    )).map(id => new mongoose.Types.ObjectId(id))
                )
            ]
        }
        if (categoryDto?.slug) {
            categoryDto.slug = slugify(categoryDto.slug)
            await this.alreadyExistBySlug(categoryDto.slug)
        } else {
            categoryDto.slug = slugify(categoryDto.name)
        }
        const category = await this.#model.create(categoryDto)
        return category;
    }

    async find(req, res, next) {
        return await this.#model.find({parent: {$exists: false}})
    }

    async checkExistById(id) {
        const category = await this.#model.findById(id)
        if (!category) throw new createHttpError.NotFound(CategoryMessage.notFound)
        return category
    }

    async checkExistBySlug(slug) {
        const category = await this.#model.findOne({slug})
        if (!category) throw new createHttpError.NotFound(CategoryMessage.notFound)
        return category
    }

    async alreadyExistBySlug(slug) {
        const category = await this.#model.findOne({slug})
        if (category) throw new createHttpError.Conflict(CategoryMessage.alreadyExist)
        return null
    }

}

module.exports = {
    CategoryService: new CategoryService()
}