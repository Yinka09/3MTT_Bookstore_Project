const Joi = require("joi");

const AuthorAddSchema = Joi.object({
  firstname: Joi.string().max(255).trim().required(),
  lastname: Joi.string().max(255).trim().required(),
  dob: Joi.date().greater("1-1-1900").less("1-1-2024").required(),
  country: Joi.string().optional(),
  books: Joi.array().items(Joi.string()).optional(),
  createAt: Joi.date().default(Date.now),
  lastUpdateAt: Joi.date().default(Date.now),
});

const UpdateAuthorSchema = Joi.object({
  firsrname: Joi.string().max(255).trim(),
  lastname: Joi.string().max(255).trim(),
  dob: Joi.date().min(1900).max(2024),
  country: Joi.string(),
  books: Joi.array().items(Joi.string()),
});

// Create the middleware
async function AddAuthorValidationMw(req, res, next) {
  const authorPayLoad = req.body;

  try {
    await AuthorAddSchema.validateAsync(authorPayLoad);
    next();
  } catch (error) {
    next({
      message: error.details[0].message,
      status: 400,
    });
  }
}

// Create the middleware
async function UpdateAuthorValidationMw(req, res, next) {
  const authorPayLoad = req.body;

  try {
    await UpdateAuthorSchema.validateAsync(authorPayLoad);
    next();
  } catch (error) {
    next({
      message: error.details[0].message,
      status: 400,
    });
  }
}

module.exports = {
  AddAuthorValidationMw,
  UpdateAuthorValidationMw,
};
