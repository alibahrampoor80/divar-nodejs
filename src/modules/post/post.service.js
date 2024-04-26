const autoBind = require("auto-bind");
const {postModel} = require("./post.model");
const {isValidObjectId, default: mongoose, Types} = require("mongoose");
const createHttpError = require("http-errors");
const {optionModel} = require("../option/option.model");
const {postMessage} = require("./post.message");
const {categoryModel} = require("../category/category.model");
const sea = require("node:sea");

class postService {
    #model
    #optionModel
    #categoryModel

    constructor() {
        autoBind(this)
        this.#model = postModel
        this.#optionModel = optionModel
        this.#categoryModel = categoryModel
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

    async findAll(options) {
        let {category, search} = options
        let query = {}
        if (category) {
            const result = await this.#categoryModel.findOne({slug: category})
            if (result) {
                query['category'] = result._id
            } else {
                return []
            }
        }
        if (search) {
            search = new RegExp(search, 'ig')
            query['$or'] = [
                {title: search,},
                {description: search,},
            ]
        }
        const post = await this.#model.find(query, {}, {sort: {_id: -1}})
        return  post
    }

    async checkExistPost(postId) {
        if (!postId || !isValidObjectId(postId)) throw new createHttpError.BadRequest(postMessage.RequestNotValid)
        const [post] = await this.#model.aggregate([
            {
                $match: {_id: new Types.ObjectId(postId)}
            },
            {
                $lookup: {
                    from: "users",
                    localField: "userId",
                    foreignField: "_id",
                    as: "user"
                }
            },
            {
                $unwind: {
                    path: "$user",
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $addFields: {
                    userMobile: "$user.mobile"
                }
            },
            {
                $project: {
                    user: 0
                }
            }
        ])

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