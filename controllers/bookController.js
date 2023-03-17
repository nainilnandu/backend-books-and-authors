const mockData = require('../data/mockData')
const asyncHandler = require('express-async-handler')

// @desc Get all books 
// @route GET /books
// @access Private
const getAllBooks = asyncHandler(async (req, res) => {
    
    const books = await mockData.books

    // If no books 
    if (!books?.length) {
        return res.status(400).json({ message: 'No books found' })
    }

    res.json(books)
})

// @desc Get book by ID 
// @route GET /books/:id
// @access Private
const getBookByID = asyncHandler(async (req, res) => {
    
    const id = req.params.id;

    const requiredBook = mockData.books.find(obj => obj.id === id)

    // If no books 
    if (!requiredBook) {
        return res.status(400).json({ message: 'No books found with this ID' })
    }

    res.json(requiredBook)
})

// @desc Like book by ID 
// @route PUT /books/like/:id
// @access Private
const likeBook = asyncHandler(async (req, res) => {
    
    const id = req.params.id;

    const requiredBook = mockData.books.find(obj => obj.id === id)
    const loggedInAuthor = mockData.authors.find(obj => obj.id === req.id)

    // If no notes 
    if (!requiredBook) {
        return res.status(400).json({ message: 'No books found with this ID' })
    }
    
    let booksLiked = loggedInAuthor.likedBooks
    let isBookLiked = false
    
    //Checking if book is already liked
    if(booksLiked){
        booksLiked.forEach(ele => {
            if(ele==id){
                isBookLiked = true;
            }
        })
    }
    if(isBookLiked){
        return res.status(400).json({ message: 'Book Already Liked' })
    }

    requiredBook.likes++
    loggedInAuthor.likedBooks.push(id)
    return res.status(200).json({ message: 'Book Liked Successfully', requiredBook })
})

// @desc Unlike book by ID 
// @route PUT /books/unlike/:id
// @access Private
const unlikeBook = asyncHandler(async (req, res) => {
    
    const id = req.params.id;

    const requiredBook = mockData.books.find(obj => obj.id === id)
    const loggedInAuthor = mockData.authors.find(obj => obj.id === req.id)

    // If no books 
    if (!requiredBook) {
        return res.status(400).json({ message: 'No books found with this ID' })
    }
    
    let booksLiked = loggedInAuthor.likedBooks
    let isBookLiked = false
    
    //Checking if book is already liked
    if(booksLiked){
        booksLiked.forEach(ele => {
            if(ele==id){
                isBookLiked = true;
            }
        })
    }
    if(!isBookLiked){
        return res.status(400).json({ message: 'Book is not liked'})
    }
    requiredBook.likes--
    var index = loggedInAuthor.likedBooks.indexOf(id);
    if (index !== -1) {
        loggedInAuthor.likedBooks.splice(index, 1);
    }
    return res.status(200).json({ message: 'Book Unliked Successfully', requiredBook })
    
    
})

module.exports = {
    getAllBooks,
    getBookByID,
    likeBook,
    unlikeBook
}