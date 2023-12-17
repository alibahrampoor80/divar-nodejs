function allExceptionHandler(app) {

    app.use((err, req, res, next) => {
        let status = err?.status ?? err?.statusCode ?? err?.code
        if (!status || isNaN(+status) || status > 511 || status < 200) status = 500
        res.status(status).json({
            message: err?.message ?? err?.stack ?? "internal server error"
        })
    })
}

module.exports = {
    allExceptionHandler
}