import CustomError from "../utils/errors/CustomError.js";
import errors from "../utils/errors/errors.js";
import service from "../services/users.service.js";

class SessionsController {
  constructor() {
    this.service = service;
  }
  register = async (req, res, next) => {
    const { email, name, verifiedCode } = req.user;
    await this.service.register({ email, name, verifiedCode });
    try {
      return res.success201("Registered");
    } catch (error) {
      return next(error);
    }
  };
  login = async (req, res, next) => {
    try {
      return res
        .cookie("token", req.token, {
          maxAge: 7 * 24 * 60 * 60 * 1000,
          httpOnly: true,
        })
        .success200("Logged in");
    } catch (error) {
      return next(error);
    }
  };
  google = async (req, res, next) => {
    try {
      return res.json({
        statusCode: 200,
        message: "Logged in with google!",
        session: req.session,
      });
    } catch (error) {
      return next(error);
    }
  };
  github = async (req, res, next) => {
    try {
      return res.success200("Logged in with Github!");
    } catch (error) {
      return next(error);
    }
  };
  me = async (req, res, next) => {
    try {
      if (!req.user) {
        CustomError.new(errors.auth);
      }
      const user = {
        email: req.user.email,
        role: req.user.role,
        _id: req.user._id,
        photo: req.user.photo,
      };
      return res.success200(user);
    } catch (error) {
      return next(error);
    }
  };
  signout = async (req, res, next) => {
    try {
      return res.clearCookie("token").success200("Signed out");
    } catch (error) {
      return next(error);
    }
  };
  badauth = (req, res, next) => {
    try {
      return res.error401();
    } catch (error) {
      return next(error);
    }
  };

  verifyAccount = async (req, res, next) => {
    try {
      // const { verifiedCode } = req.query
      const { email, verifiedCode } = req.body;
      const user = await service.readByEmail(email);
      if (user.verifiedCode === verifiedCode) {
        await service.update(user._id, { verified: true });
        return res.success200("Verified user!");
      } else {
        CustomError.new(errors.token)
      }
    } catch (error) {
      return next(error);
    }
  };
}

export default SessionsController;
const controller = new SessionsController();
const { register, login, google, github, me, signout, badauth, verifyAccount } =
  controller;
export { register, login, google, github, me, signout, badauth, verifyAccount };
