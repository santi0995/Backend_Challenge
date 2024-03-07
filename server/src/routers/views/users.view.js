import CustomRouter from "../CustomRouter.js";
import user from "../../data/fs/UserManager.fs.js";

export default class UsersRouter extends CustomRouter {
  init() {
    this.read("/register", ["PUBLIC"], (req, res, next) => {
      try {
        const one = user.readOne("");
        return res.render("register", { one });
      } catch (error) {
        return next(error);
      }
    });

    this.read("/login", ["PUBLIC"], (req, res, next) => {
      try {
        return res.render("login", {});
      } catch (error) {
        return next(error);
      }
    });
  }
}
