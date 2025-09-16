const express = require("express")
const { catchAsync } = require("../common/catchAsync")
const { AuthController } = require("../controller/AuthController")
const router = express.Router()

router.post("/auth/register", catchAsync(AuthController.register))
router.post("/auth/login", catchAsync(AuthController.login))

module.exports = { authRouter: router }
