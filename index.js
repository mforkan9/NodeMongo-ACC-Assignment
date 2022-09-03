const express = require('express')
const app = express()
const port = 5000
const userRouter = require('./Routes/user.route')
const fs = require('fs')
const bodyParser = require('body-parser')

app.set('view engine','ejs')
app.use(express.json())

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


app.use('/', userRouter)


app.get('/', (req, res) => {
   res.render('home.ejs')
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})