import { Router } from "express";

import product from "../../data/fs/ProductManager.fs.js";

import productsRouter from "./products.view.js";
import usersRouter from "./users.view.js";

const viewsRouter = Router();

viewsRouter.get("/", async(req,res,next)=>{
  try {
      const all = await product.read()
      return res.render("index", {products : all})

  } catch (error) {
    next(error);
  }
});


viewsRouter.use("/", productsRouter)
viewsRouter.use("/", usersRouter)

export default viewsRouter;
