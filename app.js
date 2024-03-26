const express = require("express");
const bodyParser = require("body-parser");
const CONFIG = require("./config/config");

//Routes
const bookRouter = require("./routes/books.routes");
const authorRouter = require("./routes/authors.routes");

const connectToDb = require("./db/mongodb");

const app = express();

// Connect to Mongodb Database
connectToDb();

// Add Middleware
app.use(bodyParser.urlencoded({ extended: false }));

// Parse application/json
app.use(bodyParser.json());

// Use books router
app.use("/api/v1/books", bookRouter);
app.use("/api/v1/authors", authorRouter);

app.get("/", (req, res) => {
  res.send("Hello Bookstore!");
});

// Error handler middleware
app.use((err, req, res, next) => {
  console.log(err);

  const errorStatus = err.status || 500;
  res.status(errorStatus).send(err.message);

  next();
});

app.listen(CONFIG.PORT, () => {
  console.log(`Server is running on http://localhost:${CONFIG.PORT}`);
});
