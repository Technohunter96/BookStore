import mongoose from "mongoose"

const bookSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },

    title: {
      type: String,
      required: true,
    },

    author: {
      type: String,
      required: true,
    },

    published: {
      type: Number,
      required: true,
    },

    pages: {
      type: Number,
      required: true,
    },

    genre: {
      type: String,
      required: true,
    },

    image: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

const Book = mongoose.model("Book", bookSchema)

export default Book
