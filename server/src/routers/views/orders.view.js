import CustomRouter from "../CustomRouter.js";
import logger from "../../utils/logger/index.js";
import orders from "../../data/mongo/orders.mongo.js"
import passCallBack from "../../middlewares/passCallBack.mid.js";
import users from "../../data/mongo/users.mongo.js"

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
        return res.render("cart", { title: "Mi carrito", orders: all.docs });
      } catch (error) {
        return res.render("cart", {
          title: "Mi carrito",
          message: "NO ORDERS YET!",
        });
      }
    });
  }
}

const ordersRouter = new OrdersRouter();
export default ordersRouter.getRouter();