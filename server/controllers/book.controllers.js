const Book = require("../models/book.model");
const path = require("path");
const fs = require("fs");
const { ok } = require("assert");

//? get all books
const getAllBooks = async (req, res) => {
  try {
    const { category } = req.query;
    let filter = {};
    if (category) {
      filter = { category };
    }
    const books = await Book.find(filter);
    if (!books) {
      return res.status(404).json({ error: "No books found" });
    }
    res.status(200).json({ books, message: "Books fetched successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//? get single book
const getSingleBook = async (req, res) => {
  try {
    const { slug } = req.params;
    const book = await Book.find({ slug });
    if (!book) {
      return res.status(404).json({ error: "Book not found" });
    }
    res.status(200).json({ book, message: "Book fetched successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//? create book
const postBook = async (req, res) => {
  try {
    const { title, slug, description, category, stars } = req.body;
    const thumbnail = req.file.filename;

    const newBook = new Book({
      title,
      slug,
      description,
      category,
      thumbnail,
      stars,
    });

    await newBook.save();
    // const newBook = await Book.create({
    //   title,
    //   slug,
    //   description,
    //   category,
    //   thumbnail,
    // });
    res.status(201).json({ newBook, message: "Book created successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//? update book

const updateBook = async (req, res) => {
  try {
    const bookId = req.params.slug;
    const { title, slug, description, category, stars } = req.body;
    const editedBook = { title, slug, description, category, stars };

    if (req.file) {
      editedBook.thumbnail = req.file.filename;
    }

    const updatedBook = await Book.findOneAndUpdate(
      { slug: bookId },
      editedBook,
      {
        new: true,
      }
    );
    if (!updatedBook) return res.status(404).json({ error: "Book not found" });
    res.status(200).json({ updatedBook, message: "Book updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//? delete book

const deleteBook = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedBook = await Book.findByIdAndDelete(id);

    if (deletedBook.thumbnail) {
      const thumbnailPath = path.join(
        __dirname,
        "..",
        "uploads",
        deletedBook.thumbnail
      );

      fs.unlink(thumbnailPath, (err) => {
        if (err && err.code !== "ENOENT") {
          // Ignore file not found errors, but log other errors
          console.error("Error deleting thumbnail:", err);
        }
      });
    }
    if (!deletedBook) return res.status(404).json({ error: "Book not found" });
    res
      .status(200)
      .json({ deletedBook, message: "Book deleted successfully", ok: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllBooks,
  getSingleBook,
  postBook,
  updateBook,
  deleteBook,
};
