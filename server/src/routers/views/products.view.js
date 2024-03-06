import CustomRouter from "../CustomRouter.js";
import { products } from "../../data/mongo/manager.mongo.js";

export default class ProductsRouter extends CustomRouter{
  init(){
    this.read("/real", async (req, res, next) => {
      try {
        const options = {
            limit: req.query.limit || 14,
            page: req.query.page || 1,
            sort: { title: 1 },
          };
          const filter = {};
          if (req.query.title) {
            filter.title = new RegExp(req.query.title.trim(), "i");
          }
          if (req.query.sort === "desc") {
            options.sort.title = "desc";
          }
          const all = await products.read({ filter, options });
          return res.render("real", {
            products: all.docs,
            next: all.nextPage,
            prev: all.prevPage,
            title: "REAL",
            filter: req.query.title,
          });
      } catch (error) {
        return next(error);
      }
    });
    
    this.read("/form", async (req, res, next) => {
      try {
        return res.render("form");
      } catch (error) {
        return next(error);
      }
    });
    
    this.read("/:pid", async (req, res, next) => {
      try {
        const { pid } = req.params;
        const one = await products.readOne(pid);
        return res.render("detail", { product: one });
      } catch (error) {
       return next(error);
      }
    });
  }
}





