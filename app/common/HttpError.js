class HttpError extends Error {
    /**
     * @param {object} param0
     * @param {number} param0.statusCode
     * @param {string} param0.message
     */
    constructor({ statusCode, message }) {
        super(message)
        this.statusCode = statusCode
        Error.captureStackTrace(this, this.constructor)
    }
}

module.exports = { HttpError }
