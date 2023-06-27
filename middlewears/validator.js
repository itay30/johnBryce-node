const createHttpError = require("http-errors");

const validator = (validator) => async (req, res, next) => {
  try {
    const validated = await validator.validateAsync(req.body);
    req.body = validated;
    return next();
  } catch (error) {
    if (error.isJoi) {
      return next(createHttpError(422, { message: error.message }));
    }
    return next(createHttpError(500));
  }
};

module.exports = validator;
