import CustomRouter from "../CustomRouter.js";
import OrdersRouter from "./order.router.js";
import ProductsRouter from "./products.router.js";
import SessionsRouter from "./sessions.router.api.js";
import UsersRouter from "./users.router.js";
import commentsRouter from "./comments.router.api.js";
// import { fork } from "child_process";
import passCallBackMid from "../../middlewares/passCallBack.mid.js";

const product = new ProductsRouter();
const productRouter = product.getRouter();
const user = new UsersRouter();
const userRouter = user.getRouter();
const order = new OrdersRouter();
const orderRouter = order.getRouter();
const session = new SessionsRouter();
const sessionRouter = session.getRouter();

export default class ApiRouter extends CustomRouter {
  init() {
    this.use("/users", userRouter);
    this.use("/products", productRouter);
    this.use("/orders", passCallBackMid("jwt"), orderRouter);
    this.use("/sessions", sessionRouter);
    this.use("/comments", commentsRouter);
    // this.read("/sum", ["PUBLIC"], (req, res, next) => {
    //   try {
    //     const child = fork("./src/utils/sum.utils.js");
    //     child.send("start");
    //     child.on("message", (result) => res.success200(result));
    //   } catch (error) {
    //     return next(error);
    //   }
    // });
  }
}
