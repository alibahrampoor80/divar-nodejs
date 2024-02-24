const {default: mongoose} = require("mongoose")

const postSchema = new mongoose.Schema({
    title: {type: String, required: true},
    content: {type: String, required: true},
    category: {type: mongoose.Types.ObjectId, ref: "category", required: true},
    province: {type: String, required: false},
    city: {type: String, required: false},
    district: {type: String, required: false},
    coordinate: {type: [Number], required: true},
    images: {type: [String], required: false, default: []},
    options: {type: Object, default: {}},
}, {timestamps: true})

const postModel = mongoose.model("post", postSchema)

module.exports = {postModel}