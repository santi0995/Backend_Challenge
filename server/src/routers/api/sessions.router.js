import {
  badauth,
  github,
  google,
  login,
  me,
  register,
  signout,
  verifyAccount
} from "../../controllers/sessions.controller.js";

import CustomRouter from "../CustomRouter.js";
import passCallBackMid from "../../middlewares/passCallBack.mid.js";
import passport from "../../middlewares/passport.mid.js";

class SessionsRouter extends CustomRouter {
  init() {
    this.create(
      "/register",
      ["PUBLIC"],
      passCallBackMid("register"),
      register
    );

    this.create("/login", ["PUBLIC"], passCallBackMid("login"), login);
    this.create(
      "/google",
      ["PUBLIC"],
      passport.authenticate("google", { scope: ["email", "profile"] })
    );
    this.read(
      "/google/callback",
      ["PUBLIC"],
      passport.authenticate("google", {
        session: false,
        failureRedirect: "/api/sessions/badauth",
      }),
      google
    );
    this.create(
      "/github",
      ["PUBLIC"],
      passport.authenticate("github", { scope: ["email", "profile"] })
    );
    this.read(
      "/github/callback",
      ["PUBLIC"],
      passport.authenticate("github", {
        session: false,
        failureRedirect: "/api/sessions/badauth",
      }),
      github
    );

    this.create("/", ["PUBLIC"], passCallBackMid("jwt"),me);

    this.create("/signout", ["USER", "ADMIN", "PREM"], signout);

    this.read("/badauth", ["PUBLIC"], badauth);
    this.create("/verify", ["PUBLIC"], verifyAccount);
  }
}

let sessionsRouter = new SessionsRouter();
export default sessionsRouter.getRouter();
