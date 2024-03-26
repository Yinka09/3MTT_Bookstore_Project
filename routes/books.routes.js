const express = require("express");
const {
  AddBookValidationMw,
  UpdateBookValidationMw,
} = require("../validators/book.validator");
const bookController = require("../controllers/book.controller");

const bookRouter = express.Router();

bookRouter.get("/", bookController.getAllBooks);

bookRouter.get("/:id", bookController.getBookByID);

bookRouter.post("/", AddBookValidationMw, bookController.addBook);

bookRouter.put("/:id", UpdateBookValidationMw, bookController.updateBookByID);

bookRouter.delete("/:id", bookController.deleteBookByID);

module.exports = bookRouter;
