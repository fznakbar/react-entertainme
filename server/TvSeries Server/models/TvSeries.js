const { getDatabase } = require('../config/config')
const db = getDatabase()
const Movie = db.collection('TvSeries')
const { ObjectId } = require('mongodb') 

class MovieModel {
  static find(){
    return Movie.find().toArray()
  }

  static findOne(id){
    return Movie.findOne({_id : ObjectId(id)})
  }

  static create(data){
    return Movie.insertOne(data)
  }

  static update(id, updateData){
    return Movie.updateOne({_id : ObjectId(id)}, {$set : updateData})
  }

  static destroy(id){
    return Movie.deleteOne({_id : ObjectId(id)})
  }
}

module.exports = MovieModel