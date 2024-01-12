import { Router } from "express";
import product from "../../data/fs/ProductManager.fs.js";
import propsProducts from "../../middlewares/propsProducts.mid.js";

const productsRouter = Router();

productsRouter.post("/", propsProducts, async (req, res, next) => {
  try {
    const data = req.body;
    const response = await product.create(data);

    return res.json({
      statusCode: 201,
      message: "Created",
      response,
    });
  } catch (error) {
    return next(error);
  }
});

productsRouter.get("/", async (req, res, next) => {
  try {
    const all = await product.read();
    if (Array.isArray(all)) {
      return res.json({
        statusCode: 200,
        response: all,
      });
    } else {
      return res.json({
        statusCode: 404,
        message: all,
      });
    }
  } catch (error) {
    return next(error);
  }
});

productsRouter.get("/:pid", async (req, res, next) => {
  try {
    const { pid } = req.params;
    const one = await product.readOne(pid);
    if (typeof one !== "string") {
      return res.json({
        statusCode: 200,
        response: one,
      });
    } else {
      return res.json({
        statusCode: 404,
        message: one,
      });
    }
  } catch (error) {
    return next(error);
  }
});

productsRouter.put(
  "/api/products/:pid/:title/:photo/:price/:stock",
  async (req, res, next) => {
    try {
      const { title, photo, price, stock, pid } = req.params;
      const response = await product.updateProduct(
        title,
        photo,
        price,
        stock,
        pid
      );
      if (response) {
        return res.json({
          statusCode: 200,
          response: response,
        });
      } else if (response === "not found!") {
        return res.json({
          statusCode: 404,
          message: response,
        });
      } else {
        return res.json({
          statusCode: 400,
          message: response,
        });
      }
    } catch (error) {
      return next(error);
    }
  }
);

productsRouter.delete("/:pid", async (req, res, next) => {
  try {
    const { pid } = req.params;
    const response = await product.destroyOne(pid);
    if (response === "There isn't any product") {
      return res.json({
        statusCode: 404,
        message: response,
      });
    } else {
      return res.json({
        statusCode: 200,
        response,
      });
    }
  } catch (error) {
    return next(error);
  }
});

export default productsRouter;
