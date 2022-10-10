const Joi = require("Joi");
const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [String],
    ispublished: Boolean
});

function validateCourse(user) {
  const schema = Joi.object({
      name: Joi.string().min(5).max(50).required(),
      author: Joi.string().min(5).max(50).required(),
      tags: Joi.array().required(),
      ispublished: Joi.boolean().required()
  });

  return schema.validate(user);
}

module.exports.Course = mongoose.model('Course', courseSchema);
module.exports.validate = validateCourse;