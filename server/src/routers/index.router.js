import CustomRouter from "./CustomRouter.js";
import apiRouter from "./api/index.router.js";
import viewsRouter from "./views/index.views.js";

class IndexRouter extends CustomRouter {
  init() {
    this.use("/api", apiRouter);
    this.use("/", viewsRouter);
  }
}

const router = new IndexRouter();
export default router.getRouter();