const express = require("express")
require("dotenv").config()
const {swaggerConfig} = require("./src/config/swagger.config");
const {mainRouter} = require("./src/app.routes");
const {notFound} = require("./src/common/exception/not-found.handler");
const {allExceptionHandler} = require("./src/common/exception/all-exception.handler");
const cookieParser = require('cookie-parser')
const morgan = require('morgan')

function main() {
    const app = express()
    require("./src/config/mongoose.config")
    app.use(express.json())
    app.use(express.urlencoded({extended: true}))
    app.use(cookieParser(process.env.COOKIE_SECRET_KEY))
    app.use(morgan('dev'))
    app.use(mainRouter)
    swaggerConfig(app)
    notFound(app)
    allExceptionHandler(app)

    app.listen(5000, () => {
        console.log(`server : http://localhost:${process.env.PORT}`)
    })

}

main()