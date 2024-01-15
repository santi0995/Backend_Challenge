import { Router } from "express";
import order from "../../data/fs/OrdersManager.fs.js";
import propsOrders from "../../middlewares/propsOrders.mid.js";

const ordersRouter = Router();

ordersRouter.post("/", propsOrders, async (req, res, next) => {
  try {
    const data = req.body;
    const response = await order.create(data);

    return res.json({
      statusCode: 201,
      response,
    });
  } catch (error) {
    return next(error);
  }
});


ordersRouter.get("/:oid", async (req, res, next) => {
  try {
    const { oid } = req.params;
    const one = await order.readOne(oid);
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

ordersRouter.put(
  "/api/orders/:oid/:uid/:quantity/:state/:pid",
  async (req, res, next) => {
    try {
      const { pid, uid, quantity, state, oid } = req.params;
      const response = await order.updateOrder(
        pid,
        uid,
        quantity,
        state,
        oid
      );
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

ordersRouter.delete("/:oid", async (req, res, next) => {
  try {
    const { oid } = req.params;
    const response = await order.destroyOne(oid);
    if (response === "There isn't any order") {
      return res.json({
        statusCode: 404,
        response
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

export default ordersRouter;
