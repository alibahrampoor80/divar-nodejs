const {default: mongoose} = require("mongoose")

const optionSchema = new mongoose.Schema({
    title: {type: String, required: true},
    key: {type: String, required: true},
    type: {type: String, enum: ["number", "string", "array", "boolean"]},
    enum: {type: Array, default: []},
    guid: {type: String, required: false},
    required: {type: Boolean, required: false, default: false},
    category: {type: mongoose.Types.ObjectId, ref: "category", required: true}
})
const optionModel = mongoose.model("option", optionSchema)

module.exports = {optionModel}