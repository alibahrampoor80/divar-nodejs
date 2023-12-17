const {CategoryController} = require("./category.controller");
const {authorization} = require("../../common/guard/authorization.guard");
const router = require("express").Router()

// router.get('/category')
router.post('/create', authorization, CategoryController.create)
router.get('/get-all', authorization, CategoryController.find)

module.exports = {
    categoryRouter: router
}