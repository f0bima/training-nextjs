import Joi from "joi";
import defaultValidator from "./default.validator";

const create = defaultValidator({
  body: Joi.object({
    product: Joi.object({
      name: Joi.string().required(),
      description: Joi.string().min(10).max(250).required(),
      price: Joi.number().required(),
    }).required(),
  }),
});

const ProductValidator = {
    create
};

export { ProductValidator };
