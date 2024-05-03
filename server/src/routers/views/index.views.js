import CustomRouter from "../CustomRouter.js";
import ordersRouter from "./orders.view.js";
import products from "../../data/mongo/products.mongo.js";
import productsRouter from "./products.view.js";
import sessionsRouter from "./sessions.view.js";
import users from "../../data/mongo/users.mongo.js";

class ViewsRouter extends CustomRouter {
  init() {
    this.use("/products", productsRouter);
    this.use("/orders", ordersRouter);
    this.use("/sessions", sessionsRouter);
    this.read("/", ["PUBLIC"], async (req, res, next) => {
      try {
        const options = {
          limit: req.query.limit || 4,
          page: req.query.page || 1,
          // sort: { title: 1 },
          lean: true,
        };
        const filter = {};
        if (req.query.title) {
          filter.title = new RegExp(req.query.title.trim(), "i");
        }
        if (req.query.sort === "desc") {
          options.sort.title = "desc";
        }
        const all = await products.read({filter, options});
        return res.render("index", {
          title: "Home",
          products: all.docs,
          next: all.nextPage,
          prev: all.prevPage,
          filter: req.query.title,
        });
      } catch (error) {
        return next(error);
      }
    });
    this.read("/mine", ["PREM"], async (req, res, next) => {
      try {
        const options = {
          limit: req.query.limit || 1000,
          page: req.query.page || 1,
          // sort: { title: 1 },
          lean: true,
        };
        const filter = {};
        if (req.query.title) {
          filter.title = new RegExp(req.query.title.trim(), "i");
        }

        if (req.query.sort === "desc") {
          options.sort.title = "desc";
        }

        const user = await users.readByEmail(req.user.email);

        // const filter = {
        //   owner_id: user._id,
        // };

        let userId = user._id.toString();

        const all = await products.read({ filter, options });
        const productos = all.docs;
        const filtrados = productos.find(
          (prod) => prod.owner_id === user._id
        );
        console.log(filtrados);
        return res.render("userProducts", {
          title: "Tus productos",
          products: filtrados,
          next: all.nextPage,
          prev: all.prevPage,
          // filter: req.query.title,
        });
      } catch (error) {
        return res.render("userProducts", {
          title: "Tus productos",
          message: "Aun no has creado ningun producto",
        });
      }
    });
  }
}

const viewsRouter = new ViewsRouter();
export default viewsRouter.getRouter();