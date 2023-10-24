const joi = require("joi");

const authorSchema = joi.object({
  name: joi.string().required().min(3),
});

module.exports = authorSchema;
