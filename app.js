const express = require('express')
const path = require("path")
const app = express()


// import file router
const indexRouter = require('./routes/indexRouters')

app.use(express.static(path.join(__dirname, 'assets')));

// make you read the body req
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
    extended: true
}));
//to read file from the pubic foldern
app.use(express.static("public"));
//to not use .ejs everytime
app.set("view engine", "ejs");


app.use("/", indexRouter)

const port = process.env.PORT || 3000
app.listen(port, () => console.log(` app listening on port: ${port}`))