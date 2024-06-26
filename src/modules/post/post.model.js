const {default: mongoose} = require("mongoose")

const postSchema = new mongoose.Schema({
    title: {type: String, required: true},
    content: {type: String, required: true},
    userId: {type: mongoose.Types.ObjectId, required: true},
    amount: {type: Number, required: true, default: 0},
    category: {type: mongoose.Types.ObjectId, ref: "category", required: true},
    province: {type: String, required: false},
    city: {type: String, required: false},
    district: {type: String, required: false},
    address: {type: String, required: false},
    coordinate: {type: [Number], required: true},
    images: {type: [String], required: false, default: []},
    options: {type: Object, default: {}},
}, {timestamps: true})

const postModel = mongoose.model("post", postSchema)

module.exports = {postModel}