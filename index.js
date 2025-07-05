const mongoose  = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/usermanagment")

const express = require("express");
const app = express();

//for user routes
const userRoute = require("./routes/userRoute");
app.use('/', userRoute);

app.listen(3000, function() {
    console.log("server is running on port 3000");
})
