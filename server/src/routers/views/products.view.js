import { Router } from "express";
import { products } from "../../data/mongo/manager.mongo.js";
const productsRouter = Router();

productsRouter.get("/real", async (req, res, next) => {
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
    next(error);
  }
});

productsRouter.get("/form", async (req, res, next) => {
  try {
    return res.render("form");
  } catch (error) {
    next(error);
  }
});

productsRouter.get("/:pid", async (req, res, next) => {
  try {
    const { pid } = req.params;
    const one = await products.readOne(pid);
    return res.render("detail", { product: one });
  } catch (error) {
    next(error);
  }
});

export default productsRouter;

// eventsRouter.get("/real", (req, res, next) => {
//   try {
//     return res.render("real", { title: "REAL" });
//   } catch (error) {
//     next(error);
//   }
// });
