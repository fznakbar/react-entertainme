import React from 'react'

function Card(props){
  return(
    <>
      {props.movies.map(el => {
        return(
          <div className="col" key={el._id}>
          <div className="card p-0 d-flex mt-2" style={{backgroundColor : "black"}}>
            <img src={el.poster_path} className="card-img-top" style={{height : "260px"}} alt=""></img>
            <div className="card-body ml-0 mr-0 mt-2 mb-0 p-0">
              <p className="card-text mb-0" style={{color : "red"}}>{el.popularity}</p>
              <h5 className="card-title m-0">{el.title}</h5>
              {/* <p className="card-text">{el.overview}</p> */}
            </div>
          </div>
          </div>
        )
      })}
    </>
  )
}

export default Card