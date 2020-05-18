const TvSeries = require('../models/TvSeries')

class TvSeriesController {
  static async getAllTvSeries(req, res, next){
    try {
      let result = await TvSeries.find()
      res.status(200).json(result)
      } 
    catch (err) {
      next(err)
    }
  }

  static async getOneTvSeries(req, res, next){
    try {
      let id = req.params.id
      let result = await TvSeries.findOne(id)
      res.status(200).json(result)
      } 
    catch (err) {
      next(err)
    }
  }

  static async addTvSeries(req, res, next){
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
      let result = await TvSeries.create(obj)
      res.status(201).json(result.ops)
    } 
    catch (err) {
      next(err)
    }
  }

  static async editTvSeries(req, res, next){
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
      await TvSeries.update(id, obj)
      res.status(200).json('Update Successful')
    } 
    catch (err) {
      next(err)
    }
  }

  static async deleteTvSeries(req, res, next){
    try {
      let id = req.params.id
      let result = await TvSeries.destroy(id)
      res.status(200).json(result)
      } 
    catch (err) {
      next(err)
    }
  }
}

module.exports = TvSeriesController