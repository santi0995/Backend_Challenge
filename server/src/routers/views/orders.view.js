import { orders, users } from "../../data/mongo/manager.mongo.js";

import CustomRouter from "../CustomRouter.js";
import passCallBackMid from "../../middlewares/passCallBack.mid.js";

export default class OrdersRouter extends CustomRouter {
  init() {
    this.read("/cart", passCallBackMid("jwt"), async (req, res, next) => {
      try {
        const options = {
          limit: req.query.limit || 14,
          page: req.query.page || 1,
          sort: { title: 1 },
          lean: true,
        };
        const user = await users.readByEmail(req.user.email);
        const filter = {
          user_id: user._id,
        };
        const all = await orders.read({ filter, options });
        console.log(all.docs[0].event_id);
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
