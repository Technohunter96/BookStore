import asyncHandler from "../middleware/asyncHandler.js"
import Book from "../models/bookModel.js"

// @desc    Fetch all books
// @route   GET /api/books
// @access  Public
const getBooks = asyncHandler(async (req, res) => {
  const books = await Book.find({})
  res.json(books)
})

// @desc    Fetch single book
// @route   GET /api/books/:id
// @access  Public
const getBookById = asyncHandler(async (req, res) => {
  const book = await Book.findById(req.params.id)

  if (book) {
    res.json(book)
  } else {
    res.status(404)
    throw new Error("Book not found")
  }
})

// @desc    Create a book
// @route   POST /api/books
// @access  Private/Admin
const createBook = asyncHandler(async (req, res) => {
  const book = new Book({
    user: req.user._id,
    title: "Sample title",
    author: "Sample author",
    published: 0,
    genre: "Sample genre",
    pages: 0,
    image: "/images/sample.jpg",
    description: "Sample description",
  })

  const createdBook = await book.save()
  res.status(201).json(createdBook)
})

// @desc    Update a book
// @route   PUT /api/books/:id
// @access  Private/Admin
const updateBook = asyncHandler(async (req, res) => {
  const { title, author, published, genre, pages, image, description } =
    req.body

  const book = await Book.findById(req.params.id)

  if (book) {
    book.title = title
    book.author = author
    book.published = published
    book.genre = genre
    book.pages = pages
    book.image = image
    book.description = description

    const updatedBook = await book.save()
    res.json(updatedBook)
  } else {
    res.status(404)
    throw new Error("Book not found")
  }
})

export { getBooks, getBookById, createBook, updateBook }
