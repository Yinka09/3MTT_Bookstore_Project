const Joi = require("joi");

const BookAddSchema = Joi.object({
  title: Joi.string().min(5).max(255).trim().required(),
  shortDescription: Joi.string().min(5).max(500).trim().optional(),
  longDescription: Joi.string().min(10).trim().optional(),
  year: Joi.number().integer().max(2024).required(),
  isbn: Joi.string().min(10).max(13).required(),
  price: Joi.number().min(0).required(),
  createAt: Joi.date().default(Date.now),
  lastUpdateAt: Joi.date().default(Date.now),
});

const BookUpdateSchema = Joi.object({
  title: Joi.string().min(5).max(255).trim().optional(),
  shortDescription: Joi.string().min(5).max(500).trim().optional(),
  longDescription: Joi.string().min(10).trim().optional(),
  year: Joi.number().integer().max(2024).optional(),
  isbn: Joi.string().min(10).max(13).optional(),
  price: Joi.number().min(0).required(),
});

// Create the middleware
async function AddBookValidationMw(req, res, next) {
  const bookPayLoad = req.body;

  try {
    await BookAddSchema.validateAsync(bookPayLoad);
    next();
  } catch (error) {
    next({
      message: error.details[0].message,
      status: 400,
    });
  }
}

// Create the middleware
async function UpdateBookValidationMw(req, res, next) {
  const bookPayLoad = req.body;

  try {
    await BookUpdateSchema.validateAsync(bookPayLoad);
    next();
  } catch (error) {
    next({
      message: error.details[0].message,
      status: 400,
    });
  }
}

module.exports = {
  AddBookValidationMw,
  UpdateBookValidationMw,
};
