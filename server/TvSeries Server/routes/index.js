const express = require('express')
const router = express.Router()
const TvSeriesController = require('../controllers/TvSeriesController')

router.get('/', TvSeriesController.getAllTvSeries)
router.post('/', TvSeriesController.addTvSeries)
router.get('/:id', TvSeriesController.getOneTvSeries)
router.put('/:id', TvSeriesController.editTvSeries)
router.delete('/:id', TvSeriesController.deleteTvSeries)

module.exports = router