const express = require("express");
const {
  AddBookValidationMw,
  UpdateBookValidationMw,
} = require("../validators/book.validator");
const bookModel = require("../models/books");

const bookRouter = express.Router();

bookRouter.get("/", (req, res) => {
  bookModel
    .find()
    .then((books) => {
      res.send(books);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send(err);
    });
});

bookRouter.get("/:id", (req, res) => {
  const id = req.params.id;
  bookModel
    .findById(id)
    .then((book) => {
      res.status(200).send(book);
    })
    .catch((err) => {
      console.log(err);
      res.status(404).send(err);
    });
});

bookRouter.post("/", AddBookValidationMw, (req, res) => {
  //   const book = req.body;
  //   book.lastUpdateAt = new Date(); // set the lastUpdateAt to the current date
  //   bookModel
  //     .create(book)
  //     .then((book) => {
  //       res.status(201).send(book);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //       res.status(500).send(err);
  //     });
  const book = req.body;
  book.lastUpdateAt = new Date();
  bookModel
    .create(book)
    .then((book) => {
      res.status(201).send({
        message: "Book successfully created",
        data: book,
      });
    })
    .catch((err) => {
      res.status(400).send(`An error occured: ${err.message}`);
    });
});

bookRouter.put("/:id", UpdateBookValidationMw, (req, res) => {
  //   const id = req.params.id;
  //   const book = req.body;
  //   book.lastUpdateAt = new Date(); // set the lastUpdateAt to the current date
  //   bookModel
  //     .findByIdAndUpdate(id, book, { new: true })
  //     .then((newBook) => {
  //       res.status(200).send(newBook);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //       res.status(500).send(err);
  //     });

  //   res.status(200).send("New update successful");
  const id = req.params.id;
  const book = req.body;

  bookModel
    .findByIdAndUpdate(id, book, { new: true })
    .then((book) => {
      console.log(book);
      res.status(201).send({
        message: "Book successfully updated",
        data: book,
      });
    })
    .catch((err) => {
      res
        .status(400)
        .send(`Error in updating book with id ${id}: ${err.message}`);
    });
});

bookRouter.delete("/:id", (req, res) => {
  //   const id = req.params.id;
  //   bookModel
  //     .findByIdAndRemove(id)
  //     .then((book) => {
  //       res.status(200).send(book);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //       res.status(500).send(err);
  //     });

  const id = req.params.id;
  bookModel
    .findByIdAndDelete(id)
    .then(() => {
      res.status(200).send(`Book with id ${id} successfully deleted`);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send(err);
    });
});

module.exports = bookRouter;
