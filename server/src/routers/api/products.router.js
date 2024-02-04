import { Router } from "express";
//import isAdmin from "../../middlewares/isAdmin.mid.js";
//import isStockOkMid from "../../middlewares/isStockOk.mid.js";
//import product from "../../data/fs/ProductManager.fs.js";
import { products } from "../../data/mongo/manager.mongo.js";
import propsProducts from "../../middlewares/propsProducts.mid.js";

const productsRouter = Router();

productsRouter.post("/", /*isAdmin*/ propsProducts, async (req, res, next) => {
  try {
    const data = req.body;
    const response = await products.create(data);

    return res.json({
      statusCode: 201,
      response,
    });
  } catch (error) {
    return next(error);
  }
});

productsRouter.get("/", async (req, res, next) => {
  try {
    const orderAndPaginate = {
      limit: req.query.limit || 20,
      page: req.query.page || 1,
      sort: { stock: 1, price: 1 },
    };
    const filter = {};
    if (req.query.title) {
      filter.title = new RegExp(req.query.title.trim(), "i");
    }
    if (req.query.stock === "desc") {
      orderAndPaginate.sort.stock = -1;
    }
    if (req.query.price === "desc") {
      orderAndPaginate.sort.price = -1;
    }
    const all = await products.read({ filter, orderAndPaginate });
      return res.json({
        statusCode: 202,
        response: all,
      }); 
  } catch (error) {
    return next(error);
  }
});

productsRouter.get("/:pid", async (req, res, next) => {
  try {
    const { pid } = req.params;
    const one = await products.readOne(pid);
    if (typeof one !== "string") {
      return res.json({
        statusCode: 200,
        response: one,
      });
    } else {
      return res.json({
        statusCode: 404,
        response: one,
      });
    }
  } catch (error) {
    return next(error);
  }
});

productsRouter.put(
  "/:pid",
  /*isStockOkMid,
  propsProducts,*/

  async (req, res, next) => {
    try {
      const { pid } = req.params;
      const data  = req.body;
      const response = await products.update(pid, data);
      if (response) {
        return res.json({
          statusCode: 200,
          response: response,
        });
      } else if (response === "not found!") {
        return res.json({
          statusCode: 404,
          response: response,
        });
      } else {
        return res.json({
          statusCode: 400,
          response: response,
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
    const response = await products.destroy(pid);
    if (response === "There isn't any product") {
      return res.json({
        statusCode: 404,
        response,
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
