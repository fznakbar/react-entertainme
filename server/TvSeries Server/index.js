require('dotenv').config()
const { ApolloServer, gql } = require('apollo-server-express')
const express = require('express')
const mongo = require('./config/config')
const port = process.env.PORT || 3002
const app = express()
const { Double } = require('mongodb')

mongo.connect(err => {
  const TvSeries = require('./models/TvSeries')
  if(!err){
    const typeDefs = gql`
    type TvSeries {
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
      getTvSeries : [TvSeries]
      getOneTvSeries(id : String!) : TvSeries
    }

    type Mutation {
      addTvSeries(
        title : String!
        overview : String!
        poster_path : String!
        popularity : Float
        tags : [String]!
      ) : TvSeries

      editTvSeries(
        id : String!
        title : String!
        overview : String!
        poster_path : String!
        popularity : Float!
        tags : [String]!
      ) : Result

      deleteTvSeries(
        id : String!
      ) : Result
    }
    `

    const resolvers = {
      Query : {
        getTvSeries: async () => {
          let result = await TvSeries.find()
          return result
        },
        getOneTvSeries: async (_, args) => {
          let { id } = args
          let result = await TvSeries.findOne(id)
          return result
        }
      },

      Mutation : {
        addTvSeries: async (_, args) => {
          const { title, overview, poster_path, popularity, tags } = args
          const data = { 
            title, 
            overview, 
            poster_path, 
            popularity : Double(popularity),
            tags 
          }
          let result = await TvSeries.create(data)
          return result.ops[0]
        },

        editTvSeries: async (_, args) => {
          const { id, title, overview, poster_path, popularity, tags } = args
          const data = { 
            title, 
            overview, 
            poster_path, 
            popularity : Double(popularity),
            tags 
          }
          let result = await TvSeries.update(id, data)
          return result.result
        },

        deleteTvSeries: async (_, args) => {
          let { id } = args
          let result = await TvSeries.destroy(id)
          return result.result
        }
      }
    }
    
    const server = new ApolloServer({typeDefs, resolvers})
    server.applyMiddleware({ app, path: '/tv' })
    app.listen({ port : port }, () =>
    console.log(`🚀 Server ready at http://localhost:3002${server.graphqlPath}`)
    )
  }
})
 