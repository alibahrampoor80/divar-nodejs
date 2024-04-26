const express = require("express")
require("dotenv").config()
const {swaggerConfig} = require("./src/config/swagger.config");
const {mainRouter} = require("./src/app.routes");
const {notFound} = require("./src/common/exception/not-found.handler");
const {allExceptionHandler} = require("./src/common/exception/all-exception.handler");
const cookieParser = require('cookie-parser')
const morgan = require('morgan')
const expressEjsLayouts = require('express-ejs-layouts')
const moment = require("jalali-moment");
const methodOverride = require('method-override')


function main() {
    const app = express()
    require("./src/config/mongoose.config")
    app.use(express.json())
    app.use(express.urlencoded({extended: true}))
    app.use(cookieParser(process.env.COOKIE_SECRET_KEY))
    app.use(express.static("public"))
    app.use(morgan('dev'))
    app.use(expressEjsLayouts)
    app.use(methodOverride('_method'))
    app.set("layout extractScripts",true)
    app.set("layout extractStyles",true)
    app.set("view engine", "ejs")
    app.set("layout", "./layouts/panel/main.ejs")
    app.use(mainRouter)
    app.locals.moment = moment
    swaggerConfig(app)
    notFound(app)
    allExceptionHandler(app)

    app.listen(5000, () => {
        console.log(`server : http://localhost:${process.env.PORT}`)
    })

}

main()