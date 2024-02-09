const {CategoryController} = require("./category.controller");
const {authorization} = require("../../common/guard/authorization.guard");
const router = require("express").Router()


router.post("/", CategoryController.create)
router.get("/", CategoryController.find)
router.delete("/:id", CategoryController.remove)

module.exports = {
    categoryRouter: router
}