require('dotenv').config()
const express = require('express')
const app = express()
const PORT = process.env.PORT || 3002
const mongo = require('./config/config')
const errorHandler = require('./middlewares/errorHandler')
const cors = require('cors')

mongo.connect(function(err){
  if(!err){
    app.use(cors())
    app.use(express.urlencoded({extended : false}))
    app.use(express.json())
    app.use('/', require('./routes'))
    app.use(errorHandler)

    app.listen(PORT, console.log(`Running on port >>> ${PORT}`))

  }
})

