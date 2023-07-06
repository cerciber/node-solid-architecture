exports.success  = (req, res, status, message, body) => {
    res.status(status).send({
        status: status,
        message: message,
        body: body,
        error: false
    })
}

exports.error  = (req, res, status, message, body) => {
    res.status(status).send({
        status: status,
        message: message,
        body: body,
        error: true
    })
}