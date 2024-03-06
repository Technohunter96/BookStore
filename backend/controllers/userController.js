import asyncHandler from "../middleware/asyncHandler.js"
import User from "../models/userModel.js"
import generateToken from "../utils/generateToken.js"

// @desc    Auth user (login) & get token
// @route   POST /api/users/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({ email })

  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id)

    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    })
  } else {
    res.status(401)
    throw new Error("Invalid email or password")
  }
})

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body

  const userExists = await User.findOne({ email })

  if (userExists) {
    res.status(400)
    throw new Error("User already exists")
  }

  const user = await User.create({
    name,
    email,
    password,
  })

  if (user) {
    generateToken(res, user._id)

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    })
  } else {
    res.status(400)
    throw new Error("Invalid user data")
  }
})

// @desc    Logout user
// @route   POST /api/users/logout
// @access  Private
const logoutUser = asyncHandler(async (req, res) => {
  res.clearCookie("jwt")
  res.status(200).json({ message: "Logged out successfully" })
})

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)

  if (user) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      favoriteBooks: user.favoriteBooks,
    })
  } else {
    res.status(404)
    throw new Error("User not found")
  }
})

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)

  if (user) {
    user.name = req.body.name || user.name
    user.email = req.body.email || user.email

    if (req.body.password) {
      user.password = req.body.password
    }

    const updatedUser = await user.save()

    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    })
  } else {
    res.status(404)
    throw new Error("User not found")
  }
})

// @desc    Add book to favorites
// @route   POST /api/users/:id/favoriteBooks/:bookId
// @access  Private
const addToFavorites = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)

  if (user) {
    await user.addToFavorites(req.params.bookId)
    res.status(200).json({ message: "Book added to favorites" })
  } else {
    res.status(404)
    throw new Error("User not found")
  }
})

// @desc    Remove book from favorites
// @route   DELETE /api/users/:id/favoriteBooks/:bookId
// @access  Private
const removeFromFavorites = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)

  if (user) {
    await user.removeFromFavorites(req.params.bookId)
    res.status(200).json({ message: "Book removed from favorites" })
  } else {
    res.status(404)
    throw new Error("User not found")
  }
})

export {
  loginUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  addToFavorites,
  removeFromFavorites,
}
