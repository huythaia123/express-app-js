const express = require("express")
const { ReqTimeLog } = require("../middleware/ReqTimeLog")
const { router } = require("../routes")
const { default: mongoose } = require("mongoose")
const app = express()
const port = 3000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

mongoose
    .connect("mongodb://127.0.0.1:27017", { dbName: "express-app-js" })
    .then(function (value) {
        console.log("mongoose version:", value.version)
    })
    .catch(function (err) {
        throw err
    })

// request time logging
app.use(ReqTimeLog)

// router
app.use("/", router)

app.listen(port, function () {
    console.log(`app listening on port ${port}`)
})
