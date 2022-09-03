const express = require('express')
const app = express()
require('dotenv').config()
const port = process.env.PORT || 8000
const userRouter = require('./Routes/user.route')
const fs = require('fs')
const bodyParser = require('body-parser')
var ejs = require('ejs');

app.set('view engine','ejs')
app.engine('ejs', require('ejs').__express);

app.use(express.json())

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


app.use('/', userRouter)


app.get('/', (req, res) => {
   res.render('./Views/home.ejs')
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})