const express = require('express')
const { authRouter } = require('./auth')
const { catchAsync } = require('../common/catchAsync')
const { HttpError } = require('../common/HttpError')
const { StatusCodes } = require('http-status-codes')
const router = express.Router()

router.get('/', function (req, res) {
    res.json({ message: 'Hello World' })
})

router.use('/', authRouter)

// 404
router.use(
    catchAsync(function () {
        throw new HttpError({ statusCode: StatusCodes.NOT_FOUND })
    }),
)

module.exports = { router }
