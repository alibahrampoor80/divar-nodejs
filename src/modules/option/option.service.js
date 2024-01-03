const autoBind = require("auto-bind");
const {optionModel} = require("./option.model");
const {isValidObjectId, default: mongoose} = require("mongoose");
const createHttpError = require("http-errors");
const {optionMessage} = require("./option.message");
const slugify = require("slugify");
const {categoryModel} = require("../category/category.model");

class optionService {
    #model
    #categoryModel

    constructor() {
        autoBind(this)
        this.#model = optionModel
        this.#categoryModel = categoryModel
    }

    async find(req, res, next) {
        const options = await this.#model.find({}, {__v: 0}, {sort: {_id: -1}})
            .populate([{
                path: "category",
                select: {
                    name: 1,
                    slug: 1,
                    // _id:0
                }
            }])
        return options
    }

    async findByCategoryId(category) {
        return await this.#model.findOne({category}, {__v: 0})
            .populate([{
                path: "category",
                select: {
                    name: 1,
                    slug: 1,
                    // _id:0
                }
            }])
    }

    async findByCategorySlug(slug) {
        const options = await this.#model.aggregate([
            {
                $lookup: {
                    from: "categories",
                    localField: "category",
                    foreignField: "_id",
                    as: "category"
                }
            },
            {
                $unwind: "$category"
            },
            {
                $addFields: {
                    categorySlug: "$category.slug",
                    categoryName: "$category.name",
                    categoryIcon: "$category.icon",
                }
            },
            {
                $project: {
                    category: 0,
                    __v: 0
                },
            },
            {
                $match: {
                    categorySlug: slug
                }
            }
        ])
        return options
    }

    async findById(id) {
        return await this.checkExistById(id)
    }

    async create(optionDto) {

        const category = await this.checkExistById(optionDto.category)
        optionDto.category = category._id
        optionDto.key = slugify(optionDto.key, {trim: true, replacement: "_", lower: true})
        await this.alreadyExistByCategoryAndKey(optionDto.key, optionDto._id)
        if (optionDto?.enum && typeof optionDto.enum === "string") {
            optionDto.enum = optionDto.enum.split(",")
        } else if (Array.isArray(optionDto.enum)) optionDto.enum = []
        const option = await this.#model.create(optionDto)
        return option
    }


    async checkExistById(id) {
        const category = await this.#categoryModel.findById(id);
        if (!category) throw new createHttpError.NotFound(optionMessage.notFound);
        return category;
    }

    async alreadyExistByCategoryAndKey(key, category) {
        const isExist = await this.#model.findOne({category, key})
        if (isExist) throw new createHttpError.Conflict(optionMessage.alreadyExist)
        return null
    }


}

module.exports = {
    optionService: new optionService()
}