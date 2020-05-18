const axios = require('axios')
const Redis = require('ioredis')
const redis = new Redis()

class MoviesController {
  static async getMovies(req, res, next){
    try {
      const dataRedis = await redis.get('Movies')
      if(dataRedis){
        res.send(JSON.parse(dataRedis))
      } else {
        let data = await axios.get('http://localhost:3001')
        await redis.set('Movies', JSON.stringify(data.data))
        res.status(data.status).json(data.data)
      }
    } 
    catch (err) {
      next(err)
    }
  }

  static async getOneMovies(req, res, next){
    try {
      let id = req.params.id
      const dataRedis = await redis.get('Movies')
      if(dataRedis){
        const redisParsed = JSON.parse(dataRedis)
        const found = redisParsed.find((el) => el._id === id)
        if(found){
          res.status(200).json(found)
        } else {
          await redis.del('Movies')
          let { data } = await axios.get(`http://localhost:3001`)
          await redis.set('Movies', JSON.stringify(data))
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
        let { data } = await axios.get(`http://localhost:3001`)
        await redis.set('Movies', JSON.stringify(data))
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

  static async deleteMovies(req, res, next){
    try {
      let id = req.params.id
      const data  = await axios.delete(`http://localhost:3001/${id}`)
        res.status(data.status).json(data.data)
      if(data.data.deletedCount === 1){
      //   const dataRedis = await redis.get('Movies')
      //   let newData = () => {
      //     JSON.parse(dataRedis).filter(el => {
      //       return el._id != id
      //   })
      // }
        await redis.del('Movies')
        const { data }= await axios.get('http://localhost:3001')
        await redis.set('Movies', JSON.stringify(data))
      }
    } catch (err) {
      next(err)
    }
  }

  static async addMovies(req, res, next){
    try {
      const data = await axios.post(`http://localhost:3001`, req.body)
      res.status(data.status).json(data.data)
      if(data){
        await redis.del('Movies')
        const { data }= await axios.get('http://localhost:3001')
        await redis.set('Movies', JSON.stringify(data))
      }
    } 
    catch (err) {
      next(err)
    }
  }

  static async editMovies(req, res, next){
    try {
      let id = req.params.id
      const data = await axios.put(`http://localhost:3001/${id}`, req.body)
      res.status(data.status).json(data.data)
      if(data){
        await redis.del('Movies')
        const { data }= await axios.get('http://localhost:3001')
        await redis.set('Movies', JSON.stringify(data))
      }
    } 
    catch (err) {
      next(err)
    }
  }

}

module.exports = MoviesController