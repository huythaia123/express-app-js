const { genSaltSync, hashSync, compareSync } = require('bcryptjs')
const { StatusCodes } = require('http-status-codes')
const { userModel } = require('../schema/User')
const { HttpError } = require('../common/HttpError')
const env = require('../config/env')

const SALT_ROUND = env.BCRYPT_SALT_ROUND

class AuthController {
    /**
     * @param {import("express").Request} req
     * @param {import("express").Response} res
     */
    static async register(req, res) {
        const body = req.body
        const salt = genSaltSync(SALT_ROUND)
        const hashPw = hashSync(body.password, salt)

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
        if (!compareSync(body.password, user.password))
            throw new HttpError({ statusCode: StatusCodes.UNAUTHORIZED })

        return res.json({ user })
    }
}

module.exports = { AuthController }
