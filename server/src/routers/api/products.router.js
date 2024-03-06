import CustomRouter from "../CustomRouter.js";
import isAdmin from "../../middlewares/isAdmin.mid.js";
import passCallBackMid from "../../middlewares/passCallBack.mid.js";
//import isStockOkMid from "../../middlewares/isStockOk.mid.js";
import { products } from "../../data/mongo/manager.mongo.js";
import propsProducts from "../../middlewares/propsProducts.mid.js";

export default class ProductsRouter extends CustomRouter {
  init() {
    this.create(
      "/",
      ["ADMIN", "PREM"],
      passCallBackMid("jwt"),
      isAdmin,
      propsProducts,
      async (req, res, next) => {
        try {
          const data = req.body;
          const response = await products.create(data);
          return res.success201(response);
        } catch (error) {
          return next(error);
        }
      }
    );

    this.read("/", ["PUBLIC"], async (req, res, next) => {
      try {
        const options = {
          limit: req.query.limit || 20,
          page: req.query.page || 1,
          sort: { stock: 1, price: 1 },
          lean: true
        };
        const filter = {};
        if (req.query.title) {
          filter.title = new RegExp(req.query.title.trim(), "i");
        }
        if (req.query.stock === "desc") {
          options.sort.stock = -1;
        }
        if (req.query.price === "desc") {
          options.sort.price = -1;
        }
        const all = await products.read({ filter, options });
        return res.succes200(all);
      } catch (error) {
        return next(error);
      }
    });

    this.read("/:pid", ["PUBLIC"], async (req, res, next) => {
      try {
        const { pid } = req.params;
        const one = await products.readOne(pid);
        return res.success200(one);
      } catch (error) {
        return next(error);
      }
    });

    this.update(
      "/:pid",

      ["ADMIN", "PREM"],
      /*isStockOkMid,
      propsProducts,*/

      async (req, res, next) => {
        try {
          const { pid } = req.params;
          const response = await products.update(pid, data);
          return res.success200(response);
        } catch (error) {
          return next(error);
        }
      }
    );

    this.destroy("/:pid", 
    ["ADMIN", "PREM"], async (req, res, next) => {
      try {
        const { pid } = req.params;
        const response = await products.destroy(pid);
        return res.success200(response);
      } catch (error) {
        return next(error);
      }
    });
  }
}
