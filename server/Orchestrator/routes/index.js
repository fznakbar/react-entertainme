const express = require('express')
const router = express.Router()
const moviesRoute = require('./moviesRoute')
const TvSeriesRoute = require('./TvSeriesRoute')

router.use('/movies', moviesRoute)
router.use('/tvseries', TvSeriesRoute)

module.exports = router