import { Router } from "express";
//import order from "../../data/fs/OrdersManager.fs.js";
import { orders } from "../../data/mongo/manager.mongo.js";
//import propsOrders from "../../middlewares/propsOrders.mid.js";

const ordersRouter = Router();

ordersRouter.post("/" /*propsOrders*/, async (req, res, next) => {
  try {
    const data = req.body;
    const response = await orders.create(data);

    return res.json({
      statusCode: 201,
      response,
    });
  } catch (error) {
    return next(error);
  }
});

ordersRouter.get("/", async (req, res, next) => {
  try {
    let filter = {};
    let order = {};
    if (req.query.user_id) {
      filter = { user_id: req.query.user_id };
    }
    if (req.query.order) {
      const [field, sortOrder] = req.query.order.split(':');
      
      if (field && sortOrder) {
        order[field] = sortOrder.toLowerCase() === 'asc' ? 1 : -1;
      }
    }
    const all = await orders.read({ filter, order });
    if (Array.isArray(all)) {
      return res.json({
        statusCode: 200,
        response: all,
      });
    } else {
      return res.json({
        statusCode: 404,
        response: all,
      });
    }
  } catch (error) {
    return next(error);
  }
});

ordersRouter.get("/:oid", async (req, res, next) => {
  try {
    const { oid } = req.params;
    const one = await orders.readOne(oid);
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


ordersRouter.get("/total/:uid", async(req,res,next)=>{
  try {
    const {uid} = req.params
    const report = await orders.reportBill(uid)
    return res.json({
      statusCode:200,
      response: report
    })
  } catch (error) {
    return next(error) 
  }
})
ordersRouter.put("/:oid", async (req, res, next) => {
  try {
    const { oid } = req.params;
    const data  = req.body;
    const response = await orders.update(oid, data);
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
});

ordersRouter.delete("/:oid", async (req, res, next) => {
  try {
    const { oid } = req.params;
    const response = await orders.destroy(oid);
    if (response === "There isn't any order") {
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

export default ordersRouter;
