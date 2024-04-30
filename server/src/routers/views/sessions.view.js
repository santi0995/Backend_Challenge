import CustomRouter from "../CustomRouter.js";
import users from "../../data/mongo/users.mongo.js";

class SessionsRouter extends CustomRouter {
  init() {
    this.read("/register", ["PUBLIC"], async (req, res, next) => {
      try {
        return res.render("register");
      } catch (error) {
        return next(error);
      }
    });
    this.read("/login", ["PUBLIC"], async (req, res, next) => {
      try {
        return res.render("login");
      } catch (error) {
        return next(error);
      }
    });
    this.read("/verify", ["PUBLIC"], async (req, res, next) => {
      try {
        return res.render("verify");
      } catch (error) {
        return next(error);
      }
    });
    this.read("/users", ["ADMIN"], async (req, res, next) => {
      try {
        const options = {
          limit: req.query.limit || 10,
          page: req.query.page || 1,
          sort: { title: 1 },
          lean: true,
        };
        const filter = {};
        if (req.query.title) {
          filter.title = new RegExp(req.query.title.trim(), "i");
        }
        if (req.query.sort === "desc") {
          options.sort.title = "desc";
        }
        const all = await users.read({ filter, options });
        return res.render("users", {
          title: "Usuarios",
          users: all.docs,
          next: all.nextPage,
          prev: all.prevPage,
          filter: req.query.title,
        });
      } catch (error) {
        return next(error);
      }
    });
  }
}

const sessionsRouter = new SessionsRouter();
export default sessionsRouter.getRouter();
