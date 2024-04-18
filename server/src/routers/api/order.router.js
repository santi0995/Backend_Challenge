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

    this.read("/", ["PUBLIC"], read);

    this.read("/:oid", ["ADMIN", "PREM"], readOne);

    this.read("/total/:oid", ["ADMIN", "PREM"], readOneTotalId);
    this.update("/:oid", ["ADMIN", "PREM"], update);

    this.destroy("/:oid", ["ADMIN", "PREM"], destroy);
  }
}
const ordersRouter = new OrdersRouter();
export default ordersRouter.getRouter();
