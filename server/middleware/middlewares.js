const cors = require("cors");
const express = require("express");

const setUpMiddleware = (app) => {
  //? cors: Cross-Origin Resource Sharing between origins, for security reasons
  app.use(cors());

  //? parsing json
  app.use(express.json());

  //? parsing form data
  app.use(express.urlencoded({ extended: true }));

  //? serving static files
  app.use("/uploads", express.static("uploads"));
};

module.exports = setUpMiddleware;
