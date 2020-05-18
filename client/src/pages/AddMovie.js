import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { gql } from 'apollo-boost'
import { useMutation } from '@apollo/react-hooks'

const ADD_MOVIE = gql`
  mutation addMovie(
    $title : String!
    $overview : String!
    $poster_path : String!
    $popularity : Float
    $tags : [String]!
    ){
    addMovie(
      title : $title
      overview : $overview
      poster_path : $poster_path
      popularity : $popularity
      tags : $tags
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

const ADD_TVSERIES = gql`
  mutation addTvSeries(
    $title : String!
    $overview : String!
    $poster_path : String!
    $popularity : Float!
    $tags : [String]!
    ){
    addTvSeries(
      title : $title
      overview : $overview
      poster_path : $poster_path
      popularity : $popularity
      tags : $tags
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

const GET_LOCALMOVIES = gql`
  {
    localMovies @client {
      _id
      title
      poster_path
      popularity
    }
  }
`

const GET_LOCALTVSERIES = gql`
  {
    localTvSeries @client {
      _id
      title
      poster_path
      popularity
    }
  }
`

function AddMovie(){
  let history = useHistory()
  const moveHome = () => {
    history.push("/")
  }

  let [title, setTitle] = useState("")
  let [overview, setOverview] = useState("")
  let [poster_path, setPosterPath] = useState("")
  let [popularity, setPopularity] = useState("")
  let [tags, setTags] = useState([])
  let [targetData, setTargetData] = useState("movies")

  // console.log(targetData)

  const [addMovie] = useMutation(ADD_MOVIE, {
    update: (proxy, {data : {addMovie}}) => {
      const { localMovies } = proxy.readQuery({ query : GET_LOCALMOVIES})
      const newLocalMovies = localMovies.concat(addMovie)
      proxy.writeData({
        data : { localMovies : newLocalMovies }
      })
    }
  })
  const [addTvSeries] = useMutation(ADD_TVSERIES, {
    update: (proxy, {data : {addTvSeries}}) => {
      const { localTvSeries } = proxy.readQuery({ query : GET_LOCALTVSERIES})
      const newLocalTvSeries = localTvSeries.concat(addTvSeries)
      proxy.writeData({
        data : { localTvSeries : newLocalTvSeries }
      })
    }
  })

  const addNewMovie = (e) =>{
    e.preventDefault()
    if(targetData === 'tvSeries'){
      addTvSeries({
        variables : {
          title,
          overview,
          poster_path,
          popularity,
          tags
        }
      })
    } else {
      addMovie({
        variables : {
          title,
          overview,
          poster_path,
          popularity,
          tags
        }
      })
    }
    setTitle("")
    setOverview("")
    setPosterPath("")
    setPopularity("")
    setTags([])
    history.push("/")
  }
  return(
    <div className="addMovie">
      <h1 onClick={() => moveHome()} className="Judul" style={{cursor : "pointer"}}>ZanFlix</h1>
      <h1 style={{color : "white"}}>Add Movie</h1>
      <form className="container pl-5 pr-5 pt-5 pb-0" onSubmit={addNewMovie}>
        <div className="container pl-5 pr-5">
          <div className="form-group">
            <label>Title :</label>
            <input type="text" className="form-control" onChange={e => setTitle(e.target.value)} required></input>
          </div>
          <div className="form-group">
            <label>Overview :</label>
            <input type="text" className="form-control" onChange={e => setOverview(e.target.value)} required></input>
          </div>
          <div className="form-group">
            <label>Poster Path :</label>
            <input type="text" className="form-control" onChange={e => setPosterPath(e.target.value)} required></input>
          </div>
          <div className="form-group">
            <label>Popularity :</label>
            <input type="text" className="form-control" onChange={e => setPopularity(parseFloat(e.target.value))} required></input>
          </div>
          <div className="form-group">
            <label>Tags :</label>
            <input type="text" className="form-control" onChange={e => setTags(e.target.value.split(","))} required></input>
          </div>
          {/* <div className="form-group">
            <label>Category :</label>
            <input type="text" className="form-control" onChange={e => setTargetData(e.target.value)} required></input>
          </div> */}
          <div className="form-group">
            <label>Category :</label> <br />
            <input type="radio" onChange={ () => setTargetData('movies') } name="dataType" value="movies" />
            <label className="ml-2">Movies</label><br />
            <input type="radio" onChange={ () => setTargetData('tvSeries') } name="dataType" value="tvSeries" />
            <label className="ml-2">TV Series</label><br />
          </div>
        <button type="submit" className="btn btn-primary mr-2 mb-2">Add</button>
        </div>
      </form>
    </div>
  )
}

export default AddMovie