const {default: mongoose} = require("mongoose")

const categorySchema = new mongoose.Schema({
    name: {type: String, required: true},
    slug: {type: String, required: true, index: true},
    icon: {type: String, required: true},
    parent: {type: mongoose.Types.ObjectId, ref: "category", required: false},
    parents: {type: [mongoose.Types.ObjectId], ref: "category", required: false,
        default: []},
}, {versionKey: false, id: false, toJSON: {virtuals: true}})

categorySchema.virtual("children", {
    ref: "category",
    localField: "_id",
    foreignField: "parent"
})
function autoPopulate(next) {
    this.populate([{path: "children"}])
    next()
}
categorySchema.pre("find", autoPopulate).pre("findOne", autoPopulate)

const categoryModel = mongoose.model("category", categorySchema)

module.exports = {
    categoryModel
}