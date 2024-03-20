import CustomRouter from "../CustomRouter.js";

class SessionsRouter extends CustomRouter {
  init() {
    this.read("/register",["PUBLIC"], async (req, res, next) => {
      try {
        return res.render("register");
      } catch (error) {
        return next(error);
      }
    });
    this.read("/login",["PUBLIC"], async (req, res, next) => {
      try {
        return res.render("login");
      } catch (error) {
        return next(error);
      }
    });
  }
}


const sessionsRouter = new SessionsRouter();
export default sessionsRouter.getRouter();