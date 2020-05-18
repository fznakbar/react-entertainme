const express = require('express')
const router = express.Router()
const TvSeriesController = require('../controllers/TvSeriesController')

router.get('/', TvSeriesController.getTvSeries)
router.post('/', TvSeriesController.addTvSeries)
router.delete('/:id', TvSeriesController.deleteTvSeries)
router.put('/:id', TvSeriesController.editTvSeries)
router.get('/:id', TvSeriesController.getOneTvSeries)

module.exports = router