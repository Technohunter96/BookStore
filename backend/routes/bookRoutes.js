import express from "express"
const router = express.Router()
import {
  getBooks,
  getBookById,
  createBook,
  updateBook,
} from "../controllers/bookController.js"
import { protect, admin } from "../middleware/authMiddleware.js"
import checkObjectId from "../middleware/checkObjectId.js"

router.route("/").get(getBooks).post(protect, admin, createBook)
router
  .route("/:id")
  .get(checkObjectId, getBookById)
  .put(protect, admin, checkObjectId, updateBook)

export default router
