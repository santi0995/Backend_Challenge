import CustomRouter from "../CustomRouter.js";
import user from "../../data/mongo/users.mongo.js";

class UsersRouter extends CustomRouter {
  init() {
    this.read("/register", (req, res, next) => {
      try {
        const one = user.readOne("");
        return res.render("register", { one });
      } catch (error) {
        return next(error);
      }
    });

    this.read("/login", (req, res, next) => {
      try {
        return res.render("login", {});
      } catch (error) {
        return next(error);
      }
    });
  }
}

const usersRouter = new UsersRouter();
export default usersRouter.getRouter();