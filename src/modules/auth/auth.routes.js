const {authController} = require("./auth.controller");
const {authorization} = require("../../common/guard/authorization.guard");
const router = require("express").Router()

router.post("/send-otp", authController.sendOtp)
router.post("/check-otp", authController.checkOtp)
router.get("/logout", authorization, authController.logOut)

module.exports = {
    AuthRouter: router
}