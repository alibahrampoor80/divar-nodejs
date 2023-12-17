const createHttpError = require("http-errors");
const {authMessages} = require("../messages/auth.messages");
const jwt = require('jsonwebtoken')
const {userModel} = require("../../modules/user/user.model");
require('dotenv').config()
const authorization = async (req, res, next) => {
    try {
        const token = req?.cookies?.access_token
        if (!token) throw new createHttpError.Unauthorized(authMessages.login)
        const data = jwt.verify(token, process.env.TOKEN_SECRET_KEY)
        if (typeof data === 'object' && "id" in data) {
            const user = await userModel.findById(data.id, {
                accessToken: 0,
                otp: 0, __v: 0,
                updatedAt: 0,
                verifiedMobile: 0
            }).lean()
            if (!user) throw new createHttpError.Unauthorized(authMessages.notFoundAccount)
            req.user = user
            return next()
        }
        throw new createHttpError.Unauthorized(authMessages.invalidToken)
    } catch (err) {
        next(err)
    }
}
module.exports = {
    authorization
}