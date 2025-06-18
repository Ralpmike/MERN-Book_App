require("dotenv").config();
// const cors = require("cors");
// const mongoose = require("mongoose");
const express = require("express");
const connectDB = require("./config/db.config");
const setUpMiddleware = require("./middleware/middlewares");
// const Book = require("./models/book.model");

const BooksRouter = require("./routes/book.route");

const app = express();
const PORT = process.env.PORT || 8000;

//? connect to database
connectDB();

//* middleware
setUpMiddleware(app);

// app.use(cors());
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static("public/uploads"));

app.use("/api/books", BooksRouter);

app.get("/", (req, res) => {
  console.log("Hello World");
  res.json("Hello World MERN STACK APP");
});

//? handle routes that are not found
app.use((req, res, next) => {
  res.status(404).send("Page Not Found");
});

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
