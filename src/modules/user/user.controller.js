const {UserService} = require("./user.service");
const autoBind = require("auto-bind");
const {userMessages} = require("./user.messages");
const {nodeEnv} = require("../../common/constant/env.enum");

class UserController {
    #service

    constructor() {
        autoBind(this)
        this.#service = UserService
    }

    async getProfile(req, res, next) {
        try {
            const user = req.user
            return res.status(200).json(user)
        } catch (err) {
            next(err)
        }
    }


    async logOut(req, res, next) {
        try {

        } catch (err) {
            next(err)
        }
    }


}

module.exports = {
    userController: new UserController()
}