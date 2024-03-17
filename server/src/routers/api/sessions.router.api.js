import CustomRouter from "../CustomRouter.js";
import has8char from "../../middlewares/has8char.mid.js";
import passCallBackMid from "../../middlewares/passCallBack.mid.js";
import passport from "../../middlewares/passport.mid.js";

export default class SessionsRouter extends CustomRouter {
  init() {
    this.create(
      "/register",
      ["PUBLIC"],
      has8char,
      passCallBackMid("register"),
      async (req, res, next) => {
        try {
          return res.json({
            statusCode: 201,
            message: "Registered!",
          });
        } catch (error) {
          return next(error);
        }
      }
    );

    this.create(
      "/login",
      ["PUBLIC"],
      passCallBackMid("login"),
      async (req, res, next) => {
        try {
          return res
            .cookie("token", req.token, {
              maxAge: 7 * 24 * 60 * 60,
              httpOnly: true,
            })
            .json({
              statusCode: 200,
              message: "Logged in!",
            });
        } catch (error) {
          return next(error);
        }
      }
    );

    this.create(
      "/google",
      passport.authenticate("google", {
        scope: ["email", "profile"],
      })
    );

    this.read(
      "/google/callback",
      passport.authenticate("google", {
        session: false,
        failureRedirect: "/api/sessions/badauth",
      }),
      async (req, res, next) => {
        try {
          return res.json({
            statusCode: 200,
            message: "Logged in with google!",
            session: req.session,
          });
        } catch (error) {
          return next(error);
        }
      }
    );

    //me
    this.create("/", passCallBackMid("jwt"), async (req, res, next) => {
      try {
        const user = {
          email: req.user.email,
          role: req.user.role,
          photo: req.user.photo,
        };
        return res.json({
          statusCode: 200,
          response: user,
        });
      } catch (error) {
        return next(error);
      }
    });

    this.create("/signout", passCallBackMid("jwt"), async (req, res, next) => {
      try {
        return res.clearCookie("token").json({
          statusCode: 200,
          message: "Signed out!",
        });
      } catch (error) {
        return next(error);
      }
    });

    this.read("/badauth", (req, res, next) => {
      try {
        return res.json({
          statusCode: 401,
          message: "Bad auth",
        });
      } catch (error) {
        return next(error);
      }
    });

    this.read("/signout/cb", (req, res, next) => {
      try {
        return res.json({
          statusCode: 400,
          message: "Already done",
        });
      } catch (error) {
        return next(error);
      }
    });
  }
}
