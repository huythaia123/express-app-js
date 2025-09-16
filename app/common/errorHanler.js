const { StatusCodes, getReasonPhrase } = require('http-status-codes')
const { HttpError } = require('./HttpError')

/**
 * @param {HttpError} err
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
function errorHandler(err, req, res, next) {
    console.error(err)

    const statusCode = err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR
    const message = err.message || getReasonPhrase(statusCode)

    return res.status(statusCode).json({
        success: statusCode >= 200 && statusCode < 300,
        message,
    })
}

module.exports = { errorHandler }
