import {
  create,
  destroy,
  read,
  readMine,
  readOne,
  update,
} from "../../controllers/products.controller.js";

import CustomRouter from "../CustomRouter.js";
import isStockOkMid from "../../middlewares/isStockOk.mid.js";
import propsProducts from "../../middlewares/propsProducts.mid.js";

class ProductsRouter extends CustomRouter {
  init() {
    this.create(
      "/",
      ["ADMIN", "PREM"],
      propsProducts,
      create
    );
    this.read("/", ["USER", "PREM", "ADMIN"], read);
    this.create("/userProducts", ["USER", "PREM", "ADMIN"], readMine);
    this.read("/:pid", ["USER", "PREM", "ADMIN"], readOne);
    this.update(
      "/:pid",
      ["ADMIN", "PREM"],
      isStockOkMid,
      propsProducts,
      update
    );
    this.destroy("/:pid", ["ADMIN", "PREM"], destroy);
  }
}
const productsRouter = new ProductsRouter();
export default productsRouter.getRouter();
