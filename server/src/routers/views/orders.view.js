import CustomRouter from "../CustomRouter.js";
import { Router } from "express";
import orders from "../../data/mongo/orders.mongo.js"
import passCallBack from "../../middlewares/passCallBack.mid.js";
import users from "../../data/mongo/users.mongo.js"
import winstonUtils from "../../utils/winston.utils.js";

class OrdersRouter extends CustomRouter{
  init(){
    this.read("/", ["USER", "PREM"], passCallBack("jwt"), async (req, res, next) => {
      try {
        const options = {
          limit: req.query.limit || 20,
          page: req.query.page || 1,
          sort: { title: 1 },
          lean: true,
        };
        const user = await users.readByEmail(req.user.email);
        const filter = {
          user_id: user._id,
        };
        const all = await orders.read({ filter, options });
        winstonUtils.INFO(JSON.stringify(all.docs[0].event_id));
        return res.render("orders", { title: "MY CART", orders: all.docs });
      } catch (error) {
        return res.render("orders", {
          title: "MY CART",
          message: "NO ORDERS YET!",
        });
      }
    });
  }
}

const ordersRouter = new OrdersRouter();
export default ordersRouter.getRouter();