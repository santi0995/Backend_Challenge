import { Router } from "express";
import chatRouter from "./chat.router.js";
import cookiesRouter from "./cookies.router.js";
import ordersRouter from "./order.router.js";
import passport from "../../middlewares/passport.mid.js";
import productsRouter from "./products.router.js";
import sessionsRouter from "./sessions.router.api.js";
import usersRouter from "./users.router.js";
const apiRouter = Router();

apiRouter.use("/users", usersRouter);
apiRouter.use(
  "/products",
  passport.authenticate("jwt", {
    session: false,
    failureRedirect: "/api/sessions/badauth",
  }),
  productsRouter
);
apiRouter.use(
  "/orders",
  passport.authenticate("jwt", {
    session: false,
    failureRedirect: "/api/sessions/badauth",
  }),
  ordersRouter
);
apiRouter.use("/cookies", cookiesRouter);
apiRouter.use("/sessions", sessionsRouter);

apiRouter.use("/chat", chatRouter);

export default apiRouter;
