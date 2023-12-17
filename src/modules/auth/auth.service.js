const autoBind = require("auto-bind");
const {userModel} = require("../user/user.model");
const createHttpError = require("http-errors");
const {authMessages} = require("./auth.messages");
const {randomInt} = require("crypto")
const jwt = require("jsonwebtoken")

class AuthService {
    #model

    constructor() {
        autoBind(this)
        this.#model = userModel
    }

    async sendOtp(mobile) {
        const user = await this.#model.findOne({mobile})
        const now = new Date().getTime()
        const otp = {
            code: randomInt(10000, 99999),
            expireIn: now + (1000 * 60 * 2)
        }
        if (!user) {
            const newUser = await this.#model.create({mobile, otp})
            return newUser
        }
        if (user.otp && user.otp.expireIn > now) {
            throw new createHttpError.BadRequest(authMessages.otpCodeNotExpired)
        }

        user.otp = otp
        await user.save()
        return user
    }

    async checkOtp(mobile, code) {
        const user = await this.checkExistByMobile(mobile)
        const now = new Date().getTime()
        if (user?.otp.expireIn < now) throw new createHttpError.Unauthorized(authMessages.otpCodeExpired)
        if (user?.otp?.code !== code) throw new createHttpError.Unauthorized(authMessages.otpCodeIsIncorrect)

        if (!user.verfiedMobile) {
            user.verfiedMobile = true
        }
        const accessToken = await this.signToken({mobile, id: user._id})
        user.accessToken = accessToken

        await user.save()
        return accessToken
    }

    async logOut() {

    }

    async checkExistByMobile(mobile) {
        const user = await this.#model.findOne({mobile})
        if (!user) throw new createHttpError.NotFound(authMessages.notFound)
        return user
    }

    async signToken(payload) {
        return jwt.sign(payload, process.env.TOKEN_SECRET_KEY, {expiresIn: "1y"})
    }

}

module.exports = {
    authService: new AuthService()
}