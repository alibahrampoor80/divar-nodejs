const {optionController} = require("./option.controller");
const router = require("express").Router()

router.post("/create", optionController.create)
router.get("/get-all", optionController.find)
router.get("/by-category/:categoryId", optionController.findByCategoryId)
router.get("/:id", optionController.findById)

module.exports = {
    optionRouter: router
}