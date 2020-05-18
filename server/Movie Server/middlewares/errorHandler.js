function errorHandler(err, req, res, next){
  if(err.errmsg === 'Document failed validation'){
    res.status(400).json('Please fill all the filed')
  } else if (err.message === 'Unexpected token e in JSON at position 1') {
    res.status(400).json('Wrong tags format, should be array of string without space')
  } else if(err.message === 'Argument passed in must be a single String of 12 bytes or a string of 24 hex characters'){
    res.status(404).json('Wrong id')
  }else {
    console.log(err.message + " <<< new error")
    res.status(500).json(err.message)
  }
}

module.exports = errorHandler