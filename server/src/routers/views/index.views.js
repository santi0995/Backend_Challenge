import CustomRouter from "../CustomRouter.js";
import OrdersRouter from "./orders.view.js";
import ProductsRouter from "./products.view.js";
import SessionsRouter from "./sessions.view.js";
import UsersRouter from "./users.view.js";
import { products } from "../../data/mongo/manager.mongo.js";

const order = new OrdersRouter();
const product = new ProductsRouter();
const user = new UsersRouter();
const session = new SessionsRouter()

export default class ViewsRouter extends CustomRouter {
  init() {
    this.router.use("/products", product.getRouter());
    this.router.use("/orders", order.getRouter());
    this.router.use("/auth", user.getRouter());
    this.router.use("/sessions", session.getRouter());
    this.read("/", ["PUBLIC"], async (req, res, next) => {
      try {
        const options = {
          limit: req.query.limit || 4,
          page: req.query.page || 1,
          sort: { title: 1 },
          lean: true
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
