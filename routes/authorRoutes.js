const express = require('express')
const router = express.Router()
const authorController = require('../controllers/authorController')
const verifyJWT = require('../middleware/verifyJWT')

router.use(verifyJWT)

router.route('/')
    .get(authorController.getAllAuthors)

router.route('/me')
    .get(authorController.getAuthor)

router.route('/:id')
    .get(authorController.getAuthorByID)


    

module.exports = router