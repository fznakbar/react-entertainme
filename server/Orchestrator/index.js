require('dotenv').config()
const { ApolloServer, gql } = require('apollo-server-express')
const express = require('express')
const port = process.env.PORT || 3000
const app = express()

const typeDefs = gql`
  type Movies {
    _id : ID
    title : String
    overview : String
    poster_path : String
    popularity : Float
    tags : [String]
  }

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

  type getEntertainme {
    movies : [Movies]
    tvSeries : [TvSeries]
  }

  type Query {
    entertainme : getEntertainme
    getMovies : [Movies]
    getMovie(id : String) : Movies
    getTvSeries : [TvSeries]
    getOneTvSeries(id : String) : TvSeries
  }

  type Mutation {
    addMovie(
      title : String!
      overview : String!
      poster_path : String!
      popularity : Float
      tags : [String]!
    ) : Movies

    addTvSeries(
      title : String!
      overview : String!
      poster_path : String!
      popularity : Float
      tags : [String]!
    ) : TvSeries

    editMovie(
      id : String!
      title : String!
      overview : String!
      poster_path : String!
      popularity : Float!
      tags : [String]!
    ) : Result

    editTvSeries(
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

    deleteTvSeries(
      id : String!
    ) : Result
  }
  `

const resolvers = require('./resolvers')

const server = new ApolloServer({typeDefs, resolvers})
server.applyMiddleware({ app, path: '/entertainme' })
app.listen({ port : port }, () =>
console.log(`🚀 Server ready at http://localhost:3000${server.graphqlPath}`)
)
 