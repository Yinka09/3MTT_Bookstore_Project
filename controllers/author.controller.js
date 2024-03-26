const authorModel = require("../models/authors");
const bookModel = require("../models/books");
const logger = require("../logger/logger");

function getAllAuthors(req, res) {
  authorModel
    .find()
    .then((authors) => {
      res.send(authors);
    })
    .catch((err) => {
      logger.error(err.message);
      res.status(500).send(err);
    });
}

function getAuthorByID(req, res) {
  const id = req.params.id;
  authorModel
    .findById(id)
    .then((author) => {
      res.status(200).send(author);
    })
    .catch((err) => {
      logger.error(err.message);
      res.status(404).send(err);
    });
}

function addAuthor(req, res) {
  const author = req.body;
  author.lastUpdateAt = new Date();
  authorModel
    .create(author)
    .then((author) => {
      res.status(201).send({
        message: "Author successfully created",
        data: author,
      });
    })
    .catch((err) => {
      res.status(400).send(`An error occured: ${err.message}`);
    });
}

function updateAuthorByID(req, res) {
  const id = req.params.id;
  const author = req.body;

  authorModel
    .findByIdAndUpdate(id, author, { new: true })
    .then((author) => {
      // console.log(author);
      res.status(201).send({
        message: "Author successfully updated",
        data: author,
      });
    })
    .catch((err) => {
      res
        .status(400)
        .send(`Error in updating author with id ${id}: ${err.message}`);
    });
}

function deleteAuthorByID(req, res) {
  const id = req.params.id;
  authorModel
    .findByIdAndDelete(id)
    .then((author) => {
      res
        .status(200)
        .send(`Author with id ${id} successfully deleted: ${author}`);
    })
    .catch((err) => {
      logger.error(err.message);
      res.status(500).send(err);
    });
}

async function addBookToAuthor(req, res, next) {
  const AuthorId = req.params.id;
  const BookId = req.params.bookId;

  try {
    // Fetch the author document from the database
    const author = await authorModel.findById(AuthorId);
    const book = await bookModel.findById(BookId);

    if (!author || !book) {
      throw new Error("Author or book not found");
    }

    // Add the book IDs to the author's books array
    author.books.push(book);

    // Save the updated author document back to the database
    await author.save();

    res.status(200).json({
      message: `Book with id ${BookId} successfully added to author with id ${AuthorId}`,
      data: author,
    });
  } catch (error) {
    res
      .status(400)
      .send(`Error in updating author with id ${id}: ${err.message}`);
  }
}

module.exports = {
  getAllAuthors,
  getAuthorByID,
  addAuthor,
  updateAuthorByID,
  deleteAuthorByID,
  addBookToAuthor,
};
