import CustomRouter from "../CustomRouter.js";
import commentsRouter from "./comments.router.api.js";
import ordersRouter from "./order.router.js";
// import { fork } from "child_process";
import productsRouter from "./products.router.js";
import sessionsRouter from "./sessions.router.api.js";
import usersRouter from "./users.router.js";

class ApiRouter extends CustomRouter {
  init() {
    this.use("/users", usersRouter);
    this.use("/products",  productsRouter);
    this.use("/orders",  ordersRouter);
    this.use("/sessions", sessionsRouter);
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

const apiRouter = new ApiRouter();
export default apiRouter.getRouter();