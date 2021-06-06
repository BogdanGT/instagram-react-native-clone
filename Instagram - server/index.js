const express = require("express")
const app = express()
const mongoose = require("mongoose")

const auth = require("./src/routes/auth")
const post = require("./src/routes/post")

app.use("/images/",express.static('Images'))
app.use(express.json())



app.use("/auth" , auth)
app.use("/" , post)

app.listen(3000 , () => console.log("Server Started"))
