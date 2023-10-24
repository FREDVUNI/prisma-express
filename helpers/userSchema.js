const joi = require("joi");

const userSchema = joi.object({
  username: joi.string().required().min(3).max(40),
  password: joi.string().required().min(8).max(25),
});

module.exports = userSchema;
