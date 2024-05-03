import CustomRouter from "../CustomRouter.js";
import passCallBack from "../../middlewares/passCallBack.mid.js";
import products from "../../data/mongo/products.mongo.js";
import users from "../../data/mongo/users.mongo.js";

class ProductsRouter extends CustomRouter {
  init() {
    this.read("/real", ["PREM", "USER"], async (req, res, next) => {
      try {
        const options = {
          limit: req.query.limit || 10,
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
        const all = await products.read({});
        return res.render("real", {
          title: "Tienda",
          products: all.docs,
          next: all.nextPage,
          prev: all.prevPage,
          filter: req.query.title,
        });
      } catch (error) {
        return next(error);
      }
    });
    this.read("/form", ["ADMIN", "PREM"], async (req, res, next) => {
      try {
        return res.render("form", {
          title: "Nuevo producto",
        });
      } catch (error) {
        return next(error);
      }
    });

    this.read("/:pid", passCallBack("jwt"), async (req, res, next) => {
      try {
        const { pid } = req.params;
        const one = await products.readOne(pid);
        return res.render("real", /*añadir otro diferente*/ { product: one });
      } catch (error) {
        return next(error);
      }
    });
  }
}

const productsRouter = new ProductsRouter();
export default productsRouter.getRouter();
