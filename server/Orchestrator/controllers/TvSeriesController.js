const axios = require('axios')
const Redis = require('ioredis')
const redis = new Redis()

class TvSeriesController {
  static async getTvSeries(req, res, next){
    try {
      const dataRedis = await redis.get('TvSeries')
      if(dataRedis){
        res.send(JSON.parse(dataRedis))
      } else {
        let data = await axios.get('http://localhost:3002')
        await redis.set('TvSeries', JSON.stringify(data.data))
        res.status(data.status).json(data.data)
      }
    } 
    catch (err) {
      next(err)
    }
  }

  static async getOneTvSeries(req, res, next){
    try {
      let id = req.params.id
      const dataRedis = await redis.get('TvSeries')
      if(dataRedis){
        const redisParsed = JSON.parse(dataRedis)
        const found = redisParsed.find((el) => el._id === id)
        if(found){
          res.status(200).json(found)
        } else {
          await redis.del('TvSeries')
          let { data } = await axios.get(`http://localhost:3002`)
          await redis.set('TvSeries', JSON.stringify(data))
          const newFound = data.find((el) => el._id === id)
          if(newFound){
            res.status(200).json(newFound)
          } else {
            throw ({
              status : 404,
              message : 'Data Not Found'
            })
          }
        }
      } else {
        let { data } = await axios.get(`http://localhost:3002`)
        await redis.set('TvSeries', JSON.stringify(data))
        const newFound = data.find((el) => el._id === id)
        if(newFound){
          res.status(200).json(newFound)
        } else {
          throw ({
            status : 404,
            message : 'Data Not Found'
          })
        }
      }
    } 
    catch (err) {
      next(err)
    }
  }

  static async deleteTvSeries(req, res, next){
    try {
      let id = req.params.id
      const data  = await axios.delete(`http://localhost:3002/${id}`)
        res.status(data.status).json(data.data)
      if(data.data.deletedCount === 1){
      //   const dataRedis = await redis.get('TvSeries')
      //   let newData = () => {
      //     JSON.parse(dataRedis).filter(el => {
      //       return el._id != id
      //   })
      // }
        await redis.del('TvSeries')
        const { data }= await axios.get('http://localhost:3002')
        await redis.set('TvSeries', JSON.stringify(data))
      }
    } catch (err) {
      next(err)
    }
  }

  static async addTvSeries(req, res, next){
    try {
      const data = await axios.post(`http://localhost:3002`, req.body)
      res.status(data.status).json(data.data)
      if(data){
        await redis.del('TvSeries')
        const { data }= await axios.get('http://localhost:3002')
        await redis.set('TvSeries', JSON.stringify(data))
      }
    } 
    catch (err) {
      next(err)
    }
  }

  static async editTvSeries(req, res, next){
    try {
      let id = req.params.id
      const data = await axios.put(`http://localhost:3002/${id}`, req.body)
      res.status(data.status).json(data.data)
      if(data){
        await redis.del('TvSeries')
        const { data }= await axios.get('http://localhost:3002')
        await redis.set('TvSeries', JSON.stringify(data))
      }
    } 
    catch (err) {
      next(err)
    }
  }

}

module.exports = TvSeriesController