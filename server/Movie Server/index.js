require('dotenv').config()
const { ApolloServer, gql } = require('apollo-server-express')
const express = require('express')
const mongo = require('./config/config')
const port = process.env.PORT || 3001
const app = express()
const { Double } = require('mongodb')


mongo.connect(err => {
  const Movie = require('./models/movie')
  if(!err){
    const typeDefs = gql`
    type Movie {
      _id : ID
      title : String
      overview : String
      poster_path : String
      popularity : Float
      tags : [String]
    }

    type Result {
      n : Int
      nModified : Int
      ok: Int
    }

    type Query {
      getMovies : [Movie]
      getMovie(id : String!) : Movie
    }

    type Mutation {
      addMovie(
        title : String!
        overview : String!
        poster_path : String!
        popularity : Float
        tags : [String]!
      ) : Movie

      editMovie(
        id : String!
        title : String!
        overview : String!
        poster_path : String!
        popularity : Float!
        tags : [String]!
      ) : Result

      deleteMovie(
        id : String!
      ) : Result
    }
    `

    const resolvers = {
      Query : {
        getMovies: async () => {
          let result = await Movie.find()
          return result
        },
        getMovie: async (_, args) => {
          let { id } = args
          let result = await Movie.findOne(id)
          return result
        }
      },

      Mutation : {
        addMovie: async (_, args) => {
          const { title, overview, poster_path, popularity, tags } = args
          const data = { 
            title, 
            overview, 
            poster_path, 
            popularity : Double(popularity),
            tags 
          }
          let result = await Movie.create(data)
          return result.ops[0] 
        },

        editMovie: async (_, args) => {
          const { id, title, overview, poster_path, popularity, tags } = args
          const data = { 
            title, 
            overview, 
            poster_path, 
            popularity : Double(popularity),
            tags 
          }
          let result = await Movie.update(id, data)
          return result.result
        },

        deleteMovie: async (_, args) => {
          let { id } = args
          let result = await Movie.destroy(id)
          return result.result
        }
      }
    }
    
    const server = new ApolloServer({typeDefs, resolvers})
    server.applyMiddleware({ app, path: '/movies' })
    app.listen({ port : port }, () =>
    console.log(`🚀 Server ready at http://localhost:3001${server.graphqlPath}`)
    )
  }
})
 