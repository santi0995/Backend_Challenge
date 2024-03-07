import CustomRouter from "../CustomRouter.js";
import OrdersRouter from "./order.router.js";
import ProductsRouter from "./products.router.js";
import SessionsRouter from "./sessions.router.api.js";
import UsersRouter from "./users.router.js";
import passCallBackMid from "../../middlewares/passCallBack.mid.js";

const product = new ProductsRouter()
const productRouter = product.getRouter()
const user = new UsersRouter()
const userRouter = user.getRouter()
const order = new OrdersRouter()
const orderRouter = order.getRouter()
const session = new SessionsRouter()
const sessionRouter = session.getRouter()

export default class ApiRouter extends CustomRouter {
  init() {
    this.router.use("users", userRouter);
    this.router.use("products", productRouter);
    this.router.use("orders", passCallBackMid("jwt"), orderRouter);
    this.router.use("sessions", sessionRouter);
  }
}
