import {
  create,
  destroy,
  read,
  readOne,
  readOneTotalId,
  update,
} from "../../controllers/orders.controller.js";

import CustomRouter from "../CustomRouter.js";
import propsOrders from "../../middlewares/propsOrders.mid.js";

class OrdersRouter extends CustomRouter {
  init() {
    this.create("/", ["USER", "PREM"], propsOrders, create);

    this.read("/", ["USER", "PREM"], read);

    this.read("/:oid", ["USER", "PREM"], readOne);

    this.read("/total/:oid", ["USER", "PREM"], readOneTotalId);
    this.update("/:oid", ["USER", "PREM"], update);

    this.destroy("/:oid", ["USER", "PREM"], destroy);
  }
}
const ordersRouter = new OrdersRouter();
export default ordersRouter.getRouter();
