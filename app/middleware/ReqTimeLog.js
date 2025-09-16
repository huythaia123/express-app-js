/**
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 */
function ReqTimeLog(req, res, next) {
    const start = Date.now()
    res.on("finish", function () {
        console.log(req.method, res.statusCode, req.url, "time:", Date.now() - start, "ms")
    })
    next()
}

module.exports = { ReqTimeLog }
