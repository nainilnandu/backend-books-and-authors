const mockData = require('../data/mockData')
const asyncHandler = require('express-async-handler')

// @desc Get all authors 
// @route GET /authors
// @access Private
const getAllAuthors = asyncHandler(async (req, res) => {
    
    const authors = await mockData.authors

    // If no authors 
    if (!authors?.length) {
        return res.status(400).json({ message: 'No authors found' })
    }
    authors.forEach(object => {
        delete object['password'];
      });

    res.json(authors)
})


// @desc Get author by ID 
// @route GET /authors/:id
// @access Private
const getAuthorByID = asyncHandler(async (req, res) => {
    
    const id = req.params.id;

    const requiredAuthor = mockData.authors.find(obj => obj.id === id)

    // If no author 
    if (!requiredAuthor) {
        return res.status(400).json({ message: 'No books found with this ID' })
    }

    res.json(requiredAuthor)
})

// @desc Get logged in author details 
// @route GET /authors/me
// @access Private
const getAuthor = async (req, res) => {
    const {id,name,email, phone_no} = req

    if(!id || !name || !email || !phone_no){
        return res.status(400).json({ message: 'Something is wrong' })
    }

    return res.json({id, name, email, phone_no})
}


module.exports = {
    getAllAuthors,
    getAuthorByID,
    getAuthor
}