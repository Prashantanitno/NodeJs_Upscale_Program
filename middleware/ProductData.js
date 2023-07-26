const Joi = require("joi");

const productSchema = Joi.object({
  productName: Joi.string().required(),
  productPrice: Joi.number().greater(2).required(),
  productBrand: Joi.string(),
});

function validateProduct(req, res, next) {
  const { error } = productSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
}

module.exports = validateProduct;
