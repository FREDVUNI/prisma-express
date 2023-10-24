const joi = require("joi");

const quoteSchema = joi.object({
  text: joi.string().required().min(3).max(250),
  authorId: joi.number().required().min(1),
});

module.exports = quoteSchema;
