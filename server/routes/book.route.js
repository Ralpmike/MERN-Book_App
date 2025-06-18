const express = require("express");
const router = express.Router();
const upload = require("../middleware/uploads");

const {
  getAllBooks,
  getSingleBook,
  postBook,
  updateBook,
  deleteBook,
} = require("../controllers/book.controllers");

router.get("/", getAllBooks);

router.get("/:slug", getSingleBook);

router.post("/", upload.single("thumbnail"), postBook);

router.put("/:slug", upload.single("thumbnail"), updateBook);

router.delete("/:id", deleteBook);

module.exports = router;
