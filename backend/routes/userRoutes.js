import express from "express"
import {
  registerUser,
  loginUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  addToFavorites,
  removeFromFavorites,
} from "../controllers/userController.js"
import { protect } from "../middleware/authMiddleware.js"

const router = express.Router()

router.route("/").post(registerUser)
router.post("/login", loginUser)
router.post("/logout", protect, logoutUser)
router
  .route("/:id/favoriteBooks/:bookId")
  .post(protect, addToFavorites)
  .delete(protect, removeFromFavorites)
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile)

export default router
