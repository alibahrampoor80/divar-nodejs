const {AuthRouter} = require("./modules/auth/auth.routes");
const {userRouter} = require("./modules/user/user.routes");
const {categoryRouter} = require("./modules/category/category.routes");
const {optionRouter} = require("./modules/option/option.routes");
const {postRouter} = require("./modules/post/post.routes");
const {postController} = require("./modules/post/post.controller");

const mainRouter = require("express").Router()

mainRouter.use("/auth", AuthRouter)
mainRouter.use("/user", userRouter)
mainRouter.use("/category", categoryRouter)
mainRouter.use("/option", optionRouter)
mainRouter.use("/post", postRouter)
mainRouter.get("/", postController.postList)

mainRouter.get('/panel', (req, res) => {
    res.render("./pages/panel/dashboard.ejs")
})
mainRouter.get('/auth/login', (req, res) => {
    res.locals.layout = "./layouts/auth/main.ejs"
    res.render("./pages/auth/login.ejs")
})

module.exports = {
    mainRouter
}