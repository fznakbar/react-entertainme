import React from 'react'
import { useHistory } from 'react-router-dom'

function TvSeries(){

  let history = useHistory()

  const moveHome = () => {
    history.push("/")
  }

  return(
    <div className="TvSeries">
      <h1 onClick={() => moveHome()} className="Judul" style={{cursor : "pointer"}}>ZanFlix</h1>
      <h1>TvSeries List</h1>
    </div>
  )
}

export default TvSeries