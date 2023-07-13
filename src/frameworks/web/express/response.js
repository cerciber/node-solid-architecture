exports.success  = (req, res, status, message, body) => {
    res.status(status).send({
        status: status,
        message: message,
        error: false,
        body: body
    })
}

exports.error  = (req, res, status, message, body) => {
    res.status(status).send({
        status: status,
        message: message,
        error: true,
        body: body
    })
}