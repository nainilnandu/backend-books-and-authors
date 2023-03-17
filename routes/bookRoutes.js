const express = require('express')
const router = express.Router()
const bookController = require('../controllers/bookController')
const verifyJWT = require('../middleware/verifyJWT')

router.use(verifyJWT)

router.route('/')
    .get(bookController.getAllBooks)

router.route('/like/:id')
    .put(bookController.likeBook)

router.route('/unlike/:id')
    .put(bookController.unlikeBook)

module.exports = router