const {AuthRouter} = require("./modules/auth/auth.routes");
const {userRouter} = require("./modules/user/user.routes");
const {categoryRouter} = require("./modules/category/category.routes");
const {optionRouter} = require("./modules/option/option.routes");
const mainRouter = require("express").Router()

mainRouter.get("/", (req,
                     res, next) => {
    res.json({
        status: 200,
        message: "پروژه دیوار"
    })
})
mainRouter.use("/auth", AuthRouter)
mainRouter.use("/user", userRouter)
mainRouter.use("/category", categoryRouter)
mainRouter.use("/option", optionRouter)
module.exports = {
    mainRouter
}