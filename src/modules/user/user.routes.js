const {userController} = require("./user.controller");
const {authorization} = require("../../common/guard/authorization.guard");
const router = require("express").Router()

router.get("/get-profile", authorization, userController.getProfile)

module.exports = {
    userRouter: router
}