import express from "express"
const router = express.Router()
import { getBooks, getBookById } from "../controllers/bookController.js"

router.get("/", getBooks)
router.get("/:id", getBookById)

export default router
