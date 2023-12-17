const {authService} = require("./auth.service");
const autoBind = require("auto-bind");
const {authMessages} = require("./auth.messages");
const {nodeEnv} = require("../../common/constant/env.enum");
const {cookieEnum} = require("../../common/constant/cookie.enum");

class AuthController {
    #service

    constructor() {
        autoBind(this)
        this.#service = authService
    }

    async sendOtp(req, res, next) {
        try {
            const {mobile} = req.body
            const user = await this.#service.sendOtp(mobile)

            return res.json({
                message: authMessages.sendOtpSuccessfully,
                code: user.otp.code
            })
        } catch (err) {
            next(err)
        }
    }

    async checkOtp(req, res, next) {
        try {
            const {mobile, code} = req.body
            const token = await this.#service.checkOtp(mobile, code)
            return res.cookie(cookieEnum.accessToken, token, {
                httpOnly: true,
                secure: process.env.NODE_END === nodeEnv.development
            }).status(200).json({
                message: authMessages.loginInSuccess,
                token
            })
        } catch (err) {
            next(err)
        }
    }

    async logOut(req, res, next) {
        try {
            return res.clearCookie(cookieEnum.accessToken).status(200).json({
                message: authMessages.logOutSuccess
            })
        } catch (err) {
            next(err)
        }
    }


}

module.exports = {
    authController: new AuthController()
}