const { MongoClient } = require('mongodb')
const createMovies = require('../helpers/movieValidation')
const url = 'mongodb://localhost:27017'
const dbName = "native-fox-entertainMe"
const client = new MongoClient(url, {useUnifiedTopology : true})

var db

function connect(callback){
  client.connect(function(err){
    if(err){
      console.log("Connection to mongodb failed", + err)
    } else {
      db = client.db(dbName)
      createMovies(db)
    }
    callback(err)
  })
}

function getDatabase(){
  return db
}

module.exports = {
  connect, getDatabase
}