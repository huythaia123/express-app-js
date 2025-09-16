/**
 *
 * @param {Function} callback
 * @returns
 */
function catchAsync(callback) {
    return function (req, res, next) {
        Promise.resolve(callback(req, res, next)).catch(next)
    }
}

module.exports = { catchAsync }
