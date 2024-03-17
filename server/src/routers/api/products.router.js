import {
  create,
  destroy,
  read,
  readOne,
  update,
} from "../../controllers/products.controller.js";

import CustomRouter from "../CustomRouter.js";
import isStockOkMid from "../../middlewares/isStockOk.mid.js";
import passCallBackMid from "../../middlewares/passCallBack.mid.js";
import propsProducts from "../../middlewares/propsProducts.mid.js";

export default class ProductsRouter extends CustomRouter {
  init() {
    this.create(
      "/",
      ["ADMIN", "PREM"],
      passCallBackMid("jwt"),
      propsProducts,
      create
    );
    this.read("/", ["PUBLIC"], read);
    this.read("/:pid", ["PUBLIC"], readOne);
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
