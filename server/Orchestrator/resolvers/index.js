const Redis = require('ioredis')
const redis = new Redis()
const { request } = require('graphql-request')
const moviesURL = 'http://localhost:3001/movies'
const TvSeriesURL = 'http://localhost:3002/tv'

const resolvers = {
  Query : {
    entertainme: async () => {
      console.log('masukkkkk');
      
      const query = `
        {
          getMovies {
            _id
            title
            overview
            poster_path
            popularity
            tags
          }
        }
        `

      const query2 = `
        {
          getTvSeries {
            _id
            title
            overview
            poster_path
            popularity
            tags
          }
        }
        `
      let data = await redis.get('Entertainme')

      if(!data){
        await redis.del('Movies')
        let { getMovies } = await request(moviesURL, query)
        await redis.set('Movies', JSON.stringify(getMovies))

        await redis.del('TvSeries')
        let { getTvSeries } = await request(TvSeriesURL, query2)
        await redis.set('TvSeries', JSON.stringify(getTvSeries))

        let result = {
          movies: getMovies,
          tvSeries: getTvSeries
        }
        await redis.set('Entertainme', JSON.stringify(result))
        return result
        
      } else {
        return JSON.parse(data)
      }
    },

    getMovies: async () => {
      const query = `
        {
          getMovies {
            _id
            title
            overview
            poster_path
            popularity
            tags
          }
        }
        `
      const dataRedis = await redis.get('Movies')
      if(dataRedis){
        return(JSON.parse(dataRedis))
      } else {
        let { getMovies } = await request(moviesURL, query)
        await redis.set('Movies', JSON.stringify(getMovies))
        return getMovies
      }
    },

    getMovie: async (_, args) => {
      const query = `
        {
          getMovies {
            _id
            title
            overview
            poster_path
            popularity
            tags
          }
        }
        `
        const dataRedis = await redis.get('Movies')
        if(dataRedis){
          const redisParsed = JSON.parse(dataRedis)
          const found = redisParsed.find((el) => el._id === args.id)
          if(found){
            return found
          } else {
            await redis.del('Movies')
            let { getMovies } = await request(moviesURL, query)
            await redis.set('Movies', JSON.stringify(getMovies))
            const newFound = getMovies.find((el) => el._id === args.id)
            if(newFound){
              return newFound
            } else {
              return 'Data Not Found'
            }
          }
        } else {
          let { getMovies } = await request(moviesURL, query)
          await redis.set('Movies', JSON.stringify(getMovies))
          const newFound = getMovies.find((el) => el._id === args.id)
          if(newFound){
            return newFound
          } else {
            return 'Data Not Found'
          }
        }
      },

    getTvSeries: async () => {
      const query = `
        {
          getTvSeries {
            _id
            title
            overview
            poster_path
            popularity
            tags
          }
        }
        `
        const dataRedis = await redis.get('TvSeries')
        if(dataRedis){
          return(JSON.parse(dataRedis))
        } else {
          let { getTvSeries } = await request(TvSeriesURL, query)
          await redis.set('TvSeries', JSON.stringify(getTvSeries))
          return getTvSeries
        }
    },

    getOneTvSeries: async (_, args) => {
      const query = `
        {
          getTvSeries {
            _id
            title
            overview
            poster_path
            popularity
            tags
          }
        }
        `
      const dataRedis = await redis.get('TvSeries')
      if(dataRedis){
        const redisParsed = JSON.parse(dataRedis)
        const found = redisParsed.find((el) => el._id === args.id)
        if(found){
          return found
        } else {
          await redis.del('TvSeries')
          let { getTvSeries } = await request(TvSeriesURL, query)
          await redis.set('TvSeries', JSON.stringify(getTvSeries))
          const newFound = getTvSeries.find((el) => el._id === args.id)
          if(newFound){
            return newFound
          } else {
            return 'Data Not Found'
          }
        }
      } else {
        let { getTvSeries } = await request(TvSeriesURL, query)
        await redis.set('TvSeries', JSON.stringify(getTvSeries))
        const newFound = getTvSeries.find((el) => el._id === args.id)
        if(newFound){
          return newFound
        } else {
          return 'Data Not Found'
        }
      }
    }
  },

  Mutation : {
    addMovie: async (_, args) => {
      const query = `
        mutation {
          addMovie(
            title: "${args.title}"
            overview: "${args.overview}"
            poster_path: "${args.poster_path}"
            popularity: ${args.popularity}
            tags: ["${args.tags.join(`","`)}"]
          ){
            _id
            title
            overview
            poster_path
            popularity
            tags
          }
        }
      `
      const getQuery = `
        {
          getMovies {
            _id
            title
            overview
            poster_path
            popularity
            tags
          }
        }
        `
      let { addMovie } = await request(moviesURL, query)
      if(addMovie){
        await redis.del('Movies')
        const { getMovies } = await request(moviesURL, getQuery)
        await redis.set('Movies', JSON.stringify(getMovies))
      }
      return addMovie
    },

    addTvSeries: async (_, args) => {
      const query = `
        mutation {
          addTvSeries(
            title: "${args.title}"
            overview: "${args.overview}"
            poster_path: "${args.poster_path}"
            popularity: ${args.popularity}
            tags: ["${args.tags.join(`","`)}"]
          ){
            _id
            title
            overview
            poster_path
            popularity
            tags
          }
        }
      `
      const getQuery = `
        {
          getTvSeries {
            _id
            title
            overview
            poster_path
            popularity
            tags
          }
        }
        `
      let { addTvSeries } = await request(TvSeriesURL, query)
      if(addTvSeries){
        await redis.del('TvSeries')
        const { getTvSeries } = await request(TvSeriesURL, getQuery)
        await redis.set('TvSeries', JSON.stringify(getTvSeries))
      }
      return addTvSeries
    },

    editMovie : async (_,args) => {
      const query = `
        mutation {
          editMovie(
            id: "${args.id}"
            title: "${args.title}"
            overview: "${args.overview}"
            poster_path: "${args.poster_path}"
            popularity: ${args.popularity}
            tags: ["${args.tags.join(`","`)}"]
          ){
            n
            nModified
            ok
          }
        }
      `
      const getQuery = `
        {
          getMovies {
            _id
            title
            overview
            poster_path
            popularity
            tags
          }
        }
        `
      let { editMovie } = await request(moviesURL, query)
      if(editMovie){
        await redis.del('Movies')
        const { getMovies } = await request(moviesURL, getQuery)
        await redis.set('Movies', JSON.stringify(getMovies))
      }
      return editMovie
    },

    editTvSeries : async (_,args) => {
      const query = `
        mutation {
          editTvSeries(
            id: "${args.id}"
            title: "${args.title}"
            overview: "${args.overview}"
            poster_path: "${args.poster_path}"
            popularity: ${args.popularity}
            tags: ["${args.tags.join(`","`)}"]
          ){
            n
            nModified
            ok
          }
        }
      `
      const getQuery = `
        {
          getTvSeries {
            _id
            title
            overview
            poster_path
            popularity
            tags
          }
        }
        `
      let { editTvSeries } = await request(TvSeriesURL, query)
      if(editTvSeries){
        await redis.del('TvSeries')
        const { getTvSeries } = await request(TvSeriesURL, getQuery)
        await redis.set('TvSeries', JSON.stringify(getTvSeries))
      }
      return editTvSeries
    },

    deleteMovie : async (_, args) => {
      const query = `
      mutation {
        deleteMovie(id: "${args.id}") {
          n
          ok
        }
      }
      `
      const getQuery = `
      {
        getMovies {
          _id
          title
          overview
          poster_path
          popularity
          tags
        }
      }
      `

      const { deleteMovie }  = await request(moviesURL, query)
      if(deleteMovie.n === 1){
        await redis.del('Movies')
        const { getMovies }= await request(moviesURL, getQuery)
        await redis.set('Movies', JSON.stringify(getMovies))
      }
      return deleteMovie
    },

    deleteTvSeries : async (_, args) => {
      const query = `
      mutation {
        deleteTvSeries(id: "${args.id}") {
          n
          ok
        }
      }
      `
      const getQuery = `
      {
        getTvSeries {
          _id
          title
          overview
          poster_path
          popularity
          tags
        }
      }
      `

      const { deleteTvSeries }  = await request(TvSeriesURL, query)
      if(deleteTvSeries.n === 1){
        await redis.del('TvSeries')
        const { getTvSeries }= await request(TvSeriesURL, getQuery)
        await redis.set('TvSeries', JSON.stringify(getTvSeries))
      }
      return deleteTvSeries
    }
  }
}
    module.exports = resolvers