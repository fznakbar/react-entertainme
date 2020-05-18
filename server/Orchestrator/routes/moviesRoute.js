const express = require('express')
const router = express.Router()
const MoviesController = require('../controllers/MoviesController')

router.get('/', MoviesController.getMovies)
router.post('/', MoviesController.addMovies)
router.delete('/:id', MoviesController.deleteMovies)
router.put('/:id', MoviesController.editMovies)
router.get('/:id', MoviesController.getOneMovies)

module.exports = router