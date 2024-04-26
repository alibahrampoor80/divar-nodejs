const {Router} = require("express")
const {postController} = require("./post.controller");
const {upload} = require("../../common/utils/multer");
const {authorization} = require("../../common/guard/authorization.guard");

const router = Router()

router.get("/create", authorization, postController.createPostPage)
router.post("/create", authorization, upload.array("images", 10), postController.create)
router.get("/my", authorization, postController.findMyPost)
router.delete("/delete/:id", authorization, postController.remove)
router.get("/:id", postController.showPost)

module.exports = {postRouter: router}