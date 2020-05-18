import React from 'react'
// import { Link } from 'react-router-dom'
import Card from '../components/card'
import { gql } from 'apollo-boost'
import { useQuery } from '@apollo/react-hooks'
import { useHistory } from 'react-router-dom'

const GET_MOVIES = gql`
  {
    getMovies {
      _id
      title
      poster_path
      popularity
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

const GET_TVSERIES = gql`
  {
    getTvSeries {
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

function Home(){
  const {loading : loadingMovie, data : dataMovies} = useQuery(GET_MOVIES)
  const {loading : loadingLocalMovies, data : dataLocalMovies} = useQuery(GET_LOCALMOVIES)
  const {loading : loadingTvSeries, data : dataTvSeries} = useQuery(GET_TVSERIES)
  const {loading : loadingLocalTvSeries, data : dataLocalTvSeries} = useQuery(GET_LOCALTVSERIES)

  let history = useHistory()
  // if(!loadingLocalMovies){
  //   console.log(dataLocalMovies.localMovies)
  // }
  const toAdd = () => {
    history.push("/addmovie")
  }
  if(loadingMovie || loadingTvSeries || loadingLocalMovies || loadingLocalTvSeries){
    return(
      <div style={{height : "100vh"}}>
        <h1>Please Wait</h1>
      </div>
    )
  } else {
    return(
      <div className="Home">
        <h1 className="Judul" onClick={toAdd} style={{cursor : "pointer"}}>ZanFlix</h1>
        <div id="carouselExampleControls" className="carousel slide container" data-ride="carousel" style={{height : "450px"}}>
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img src="https://cdn.collider.com/wp-content/uploads/2011/04/transformers-3-movie-poster-bumblebee-01.jpg" className="d-block w-100" alt="" style={{maxHeight : "67vh"}}></img>
            </div>
            <div className="carousel-item">
              <img src="https://geekculture.co/wp-content/uploads/2020/01/1917-movie-review.jpg" className="d-block w-100" alt="" style={{maxHeight : "67vh"}}></img>
            </div>
            <div className="carousel-item">
              <img src="https://cdn.collider.com/wp-content/uploads/2012/03/avengers-movie-banner-mark-ruffalo-robert-downey-jr.jpg" className="d-block w-100" alt="" style={{maxHeight : "67vh"}}></img>
            </div>
            <div className="carousel-item">
              <img src="https://steamuserimages-a.akamaihd.net/ugc/711908238354940293/12FCD99832E6E0C06EBF563E7177AB8DD485A93F/" className="d-block w-100" alt="" style={{maxHeight : "67vh"}}></img>
            </div>
          </div>
          <a className="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="sr-only">Previous</span>
          </a>
          <a className="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="sr-only">Next</span>
          </a>
        </div>

        <div style={{marginTop : "45px", color : 'white'}}>
          <h3 style={{textAlign : "left"}} className="mt-0 mb-3">Movies</h3>
          <div className="row row-cols-1 row-cols-md-6 pl-5 pr-5 pt-0 overflow-auto" style={{display : "flex", maxHeight : "95vh"}}>
            <Card movies={dataMovies.getMovies}/>
            <Card movies={dataLocalMovies.localMovies}/>
          </div>
          <hr style={{backgroundColor : "white"}}></hr>
          <h3 style={{textAlign : "left"}} className="mt-3 mb-3">Tv Series</h3>
          <div className="row row-cols-1 row-cols-md-6 pl-5 pr-5 pt-0 overflow-auto" style={{display : "flex", maxHeight : "95vh"}}>
            <Card movies={dataTvSeries.getTvSeries}/>
            <Card movies={dataLocalTvSeries.localTvSeries}/>
          </div>
        </div>

      </div>
    )
  }
}

export default Home