import CustomRouter from "../CustomRouter.js";
import isAdmin from "../../middlewares/isAdmin.mid.js";
import passCallBack from "../../middlewares/passCallBack.mid.js";
import products from "../../data/mongo/products.mongo.js";

class ProductsRouter extends CustomRouter {
  init() {
    this.read(
      "/real",
       ["ADMIN"],
      // passCallBack("jwt"),
      // isAdmin,
       (req, res, next) => {
        try {
          return res.render("real", { title: "REAL" });
        } catch (error) {
          next(error);
        }
      }
    );

    this.read(
      "/form",
      ["ADMIN", "PREM"],
      passCallBack("jwt"),
      isAdmin,
      async (req, res, next) => {
        try {
          return res.render("form");
        } catch (error) {
          return next(error);
        }
      }
    );

    this.read("/:pid", passCallBack("jwt"), isAdmin, async (req, res, next) => {
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
