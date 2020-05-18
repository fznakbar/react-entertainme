function errorHandler(err, req, res, next){
  if(err.status !== undefined){
    if(err.status === 404){
      res.status(err.status).json(err.message)
    } else if(err.response.status === 400){
      res.status(err.response.status).json(err.response.data)
    } else {
      console.log(err + ' <<<< new Error')
      res.status(500).json(err)
    }
  } else {
    console.log(err + ' <<<< new Error')
    res.status(500).json(err)
  }
}

module.exports = errorHandler