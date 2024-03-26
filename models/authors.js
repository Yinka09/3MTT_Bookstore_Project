const mongoose = require("mongoose");

//Define a schema
const Schema = mongoose.Schema;

//Define author schema
const AuthorSchema = new Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  dob: {
    type: Date,
    required: true,
  },
  country: {
    type: String,
    required: false,
  },
  books: {
    type: Array,
    default: [],
  },
  createAt: {
    type: Date,
    default: Date.now,
  },
  lastUpdateAt: {
    type: Date,
    default: Date.now,
  },
});

// Export the model
module.exports = mongoose.model("Authors", AuthorSchema); //collection name is Authors. This is the name of the collection in the database
