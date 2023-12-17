const swaggerJsDocs = require("swagger-jsdoc")
const swaggerUi = require("swagger-ui-express")

const swaggerConfig = (app) => {
    const swaggerDocument = swaggerJsDocs({
        swaggerDefinition: {
            openapi: "3.0.1",
            info: {
                title: "divar-backend",
                description: "یک پروژه خفن mvc برای تست و یادگیری بکند",
                version: "1.0.0"
            }
        },
        apis: [process.cwd() + "/src/modules/**/*.swagger.js"],
    })

    const swagger = swaggerUi.setup(swaggerDocument, {})
    app.use("/api-doc", swaggerUi.serve, swagger)
}


module.exports = {
    swaggerConfig
}