const bookModel = require("../models/books");

function getAllBooks(req, res) {
  bookModel
    .find()
    .then((books) => {
      res.send(books);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send(err);
    });
}

function getBookByID(req, res) {
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
}

function addBook(req, res) {
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
}

function updateBookByID(req, res) {
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
}

function deleteBookByID(req, res) {
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
}

module.exports = {
  getAllBooks,
  getBookByID,
  addBook,
  updateBookByID,
  deleteBookByID,
};
