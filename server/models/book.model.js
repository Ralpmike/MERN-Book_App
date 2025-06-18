const { Schema, model } = require("mongoose");

const BookSchema = new Schema(
  {
    title: { type: String, required: true },
    thumbnail: { type: String },
    slug: { type: String, unique: true },
    description: { type: String },
    stars: { type: Number, min: 1, max: 5 },
    category: { type: [String], default: [] },
  },
  { timestamps: true } // Adds createdAt and updatedAt automatically
);

const Book = model("Book", BookSchema);

module.exports = Book;
