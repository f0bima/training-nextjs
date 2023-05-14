import nc from "next-connect";
import axios, { HttpStatusCode } from "axios";
import ErrorHandler from "@app/src/handler/error.handler";
import { ProductValidator } from "@app/src/validator/produk.validator";
import ProductController from "@app/src/controllers/product.controller";

const handler = nc(ErrorHandler);
/**
 * DEFAULT dari next js
 * @param req
 * @param res
 */

handler
  .post(ProductValidator.create, async (req, res) => {
    try {
      const [err, data] = await new ProductController({
        fields: req.body?.product,
      })._create();

      if (err) {
        res.status(HttpStatusCode.BadRequest);
        return res.json({
          error: true,
          message: err?.message,
        });
      }

      return res.json({
        error: false,
        data: data,
      });
    } catch (err) {
      res.status(500);
      return res.json({
        error: true,
        status: 500,
        message: err?.message,
      });
    }
  })
  .get(async (req, res) => {
    try {
      const response = await axios
        .get("https://dummyjson.com/products")
        .then((result) => {
          return {
            pagination: {
              limit: result?.data?.limit ?? 10,
              skip: result?.data?.skip ?? 0,
              total: result?.data?.total ?? 0,
            },
            data: result?.data?.products ?? [],
          };
        })
        .catch((err) => {
          return {
            pagination: {
              limit: 10,
              skip: 0,
              total: 0,
            },
            data: [],
          };
        });

      return res.json(response);
    } catch (err) {
      res.status(500);
      return res.json({
        error: true,
        status: 500,
        message: err?.message,
      });
    }
  })
  .delete(async (req, res) => {
    //logic
  })
  .put(async (req, res) => {
    //logic
  });

export default handler;
