import asyncHandler from "../middleware/asyncHandler.js"
import Book from "../models/bookModel.js"

// @desc    Fetch all books
// @route   GET /api/books
// @access  Public
const getBooks = asyncHandler(async (req, res) => {
  const pageSize = process.env.PAGE_SIZE
  const page = Number(req.query.pageNumber) || 1

  const keyword = req.query.keyword
    ? { title: { $regex: req.query.keyword, $options: "i" } }
    : {}

  const count = await Book.countDocuments({ ...keyword })
  const books = await Book.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1))
  res.json({ books, page, pages: Math.ceil(count / pageSize) })
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

// @desc    Delete a book
// @route   DELETE /api/books/:id
// @access  Private/Admin
const deleteBook = asyncHandler(async (req, res) => {
  const book = await Book.findById(req.params.id)

  if (book) {
    await Book.deleteOne({ _id: book._id })
    res.json({ message: "Book removed" })
  } else {
    res.status(404)
    throw new Error("Book not found")
  }
})

// @desc    Get latest books (for carousel)
// @route   GET /api/books/latest
// @access  Public
const getLatestBooks = asyncHandler(async (req, res) => {
  const books = await Book.find({}).sort({ createdAt: -1 }).limit(5)

  res.json(books)
})

export {
  getBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
  getLatestBooks,
}
