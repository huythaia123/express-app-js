require('dotenv').config()
const express = require('express')
const { ReqTimeLog } = require('../middleware/ReqTimeLog')
const { router } = require('../routes')
const { default: mongoose } = require('mongoose')
const { errorHandler } = require('../common/errorHanler')
const env = require('../config/env')

const app = express()
const port = env.PORT

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

mongoose
    .connect(env.MONGO_URI, { dbName: env.MONGO_DB_NAME })
    .then(function (value) {
        console.log('mongoose version:', value.version)
    })
    .catch(function (err) {
        throw err
    })

// request time logging
app.use(ReqTimeLog)

// router
app.use('/', router)

// error handling
app.use(errorHandler)

app.listen(port, function () {
    console.log(`app listening on port ${port}`)
})
