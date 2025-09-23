const { StatusCodes } = require('http-status-codes')
const { userModel } = require('../schema/User')
const { HttpError } = require('../common/HttpError')
const { hashPassword, comparePassword } = require('../utils/bcrypt-handle')

class AuthController {
    /**
     * @param {import("express").Request} req
     * @param {import("express").Response} res
     */
    static async register(req, res) {
        const body = req.body
        const hashPw = await hashPassword(body.password)

        let user = await userModel.findOne({ email: body.email })
        if (user)
            throw new HttpError({
                statusCode: StatusCodes.BAD_REQUEST,
                message: 'User already exists.',
            })

        user = new userModel({ ...body, password: hashPw })
        await user.save()

        return res.json({ user })
    }

    /**
     * @param {import("express").Request} req
     * @param {import("express").Response} res
     */
    static async login(req, res) {
        const body = req.body
        const user = await userModel.findOne({ email: body.email })

        if (!user) throw new HttpError({ statusCode: StatusCodes.UNAUTHORIZED })
        if (!(await comparePassword(body.password, user.password)))
            throw new HttpError({ statusCode: StatusCodes.UNAUTHORIZED })

        return res.json({ user })
    }
}

module.exports = { AuthController }
