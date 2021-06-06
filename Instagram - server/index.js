const express = require("express")
const app = express()
const mongoose = require("mongoose")

const auth = require("./src/routes/auth")
const post = require("./src/routes/post")

app.use("/images/",express.static('Images'))
app.use(express.json())

mongoose.connect("mongodb+srv://bogdanGT:123123321321@cluster0.pmmnh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", { useUnifiedTopology: true,useNewUrlParser: true,useCreateIndex:true }).then(() => console.log("MongoDB Connected")).catch(() => console.log("MongoDB Not Connected"))

app.use("/auth" , auth)
app.use("/" , post)

app.listen(3000 , () => console.log("Server Started"))