const express = require("express");
const bodyParser = require("body-parser");
const { requiresAuth } = require("express-openid-connect");
const auth0Middleware = require("./auth/auth0");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const logger = require("./logger/logger");
const httpLogger = require("./logger/httpLogger");
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

// Add rate limiter
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
  standardHeaders: "draft-7", // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
  // store: ... , // Redis, Memcached, etc. See below.
});

// Apply the rate limiting middleware to all requests.
app.use(limiter);

// Add security middleware
app.use(helmet());

app.use(httpLogger);

// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth0Middleware);

// Use books router
app.use("/api/v1/books", requiresAuth(), bookRouter);
app.use("/api/v1/authors", requiresAuth(), authorRouter);

app.get("/", (req, res) => {
  res.send("Hello Bookstore!");
});

// Error handler middleware
app.use((err, req, res, next) => {
  logger.error(err.message);

  const errorStatus = err.status || 500;
  res.status(errorStatus).send("Something Broke");

  next();
});

app.listen(CONFIG.PORT, () => {
  logger.info(`Server is running on http://localhost:${CONFIG.PORT}`);
});
