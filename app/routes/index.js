const { genSaltSync, hashSync, compareSync } = require("bcryptjs")
const express = require("express")
const { userModel } = require("../schema/User")
const { StatusCodes } = require("http-status-codes")
const router = express.Router()

const SALT_ROUND = 12

router.get("/", function (req, res) {
    res.json({ message: "Hello World" })
})

router.post("/register", async function (req, res, next) {
    const body = req.body
    const salt = genSaltSync(SALT_ROUND)
    const hashPw = hashSync(body.password, salt)

    let user = await userModel.findOne({ email })
    if (!user) return res.sendStatus(StatusCodes.UNAUTHORIZED)

    user = new userModel({ ...body, password: hashPw })
    await user.save()

    return res.json({ user })
})

router.post("/login", async function (req, res, next) {
    const body = req.body
    const user = await userModel.findOne({ email: body.email })

    if (!user) return res.sendStatus(StatusCodes.UNAUTHORIZED)
    if (!compareSync(body.password, user.password)) return res.sendStatus(StatusCodes.UNAUTHORIZED)

    return res.json({ user })
})

// 404
router.use(function (req, res, next) {
    return res.sendStatus(404)
})

module.exports = { router }
