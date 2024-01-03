const {default: mongoose} = require("mongoose")
const dotenv = require("dotenv")
dotenv.config()

mongoose.connect(process.env.MONGODB_URL).then(() => {
    console.log("connected to mongodb...")
}).catch(err => {
    console.log(err?.message ?? "error connected")
})