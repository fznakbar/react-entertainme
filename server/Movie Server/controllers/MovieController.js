const Movie = require('../models/movie')

class MovieController {
  static async getAllMovie(req, res, next){
    try {
      let result = await Movie.find()
      res.status(200).json(result)
      } 
    catch (err) {
      next(err)
    }
  }

  static async getOneMovie(req, res, next){
    try {
      let id = req.params.id
      let result = await Movie.findOne(id)
      res.status(200).json(result)
      } 
    catch (err) {
      next(err)
    }
  }

  static async addMovie(req, res, next){
    try {
      let { title, overview, poster_path, popularity, tags } = req.body 
      let obj = {
        title : title,
        overview : overview,
        poster_path : poster_path,
        popularity : Number(popularity),
        tags : JSON.parse(tags)
      }
      // console.log(obj)
      let result = await Movie.create(obj)
      res.status(201).json(result.ops)
    } 
    catch (err) {
      next(err)
    }
  }

  static async editMovie(req, res, next){
    try {
      let id = req.params.id
      let { title, overview, poster_path, popularity, tags } = req.body 
      let obj = {
        title : title,
        overview : overview,
        poster_path : poster_path,
        popularity : Number(popularity),
        tags : JSON.parse(tags)
      }
      await Movie.update(id, obj)
      res.status(200).json('Update Successful')
    } 
    catch (err) {
      next(err)
    }
  }

  static async deleteMovie(req, res, next){
    try {
      let id = req.params.id
      let result = await Movie.destroy(id)
      res.status(200).json(result)
      } 
    catch (err) {
      next(err)
    }
  }
}

module.exports = MovieController