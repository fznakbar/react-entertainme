const express = require('express')
const router = express.Router()
const MovieController = require('../controllers/MovieController')

router.get('/', MovieController.getAllMovie)
router.post('/', MovieController.addMovie)
router.get('/:id', MovieController.getOneMovie)
router.put('/:id', MovieController.editMovie)
router.delete('/:id', MovieController.deleteMovie)

module.exports = router