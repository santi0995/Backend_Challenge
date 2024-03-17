import CustomRouter from "../CustomRouter.js";
import OrdersRouter from "./orders.view.js";
import ProductsRouter from "./products.view.js";
import SessionsRouter from "./sessions.view.js";
import UsersRouter from "./users.view.js";
import passCallBackMid from "../../middlewares/passCallBack.mid.js";
import { products } from "../../data/mongo/manager.mongo.js";

const order = new OrdersRouter();
const orderRouter = order.getRouter();
const product = new ProductsRouter();
const productRouter = product.getRouter();
const user = new UsersRouter();
const userRouter = user.getRouter();
const session = new SessionsRouter();
const sessionRouter = session.getRouter();

export default class ViewsRouter extends CustomRouter {
  init() {
    this.use("/products",  productRouter);
    this.use("/orders", orderRouter);
    this.use("/auth",  userRouter);
    this.use("/sessions", sessionRouter);
    this.read("/", ["PUBLIC"], async (req, res, next) => {
      try {
        const options = {
          limit: req.query.limit || 4,
          page: req.query.page || 1,
          sort: { title: 1 },
          lean: true,
        };
        const filter = {};
        if (req.query.title) {
          filter.title = new RegExp(req.query.title.trim(), "i");
        }
        if (req.query.sort === "desc") {
          options.sort.title = "desc";
        }
        const all = await products.read({ filter, options });
        return res.render("index", {
          products: all.docs,
          next: all.nextPage,
          prev: all.prevPage,
          title: "INDEX",
          filter: req.query.title,
        });
      } catch (error) {
        return next(error);
      }
    });
  }
}
