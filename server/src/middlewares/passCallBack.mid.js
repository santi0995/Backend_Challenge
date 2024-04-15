import CustomError from "../utils/errors/CustomError.js";
import errors from "../utils/errors/errors.js";
import passport from "passport";

export default (strategy) => {
  return async (req, res, next) => {
    passport.authenticate(strategy, (error, user, info) => {
      if (error) {
        return next(error);
      }
      if (!user) {
        CustomError.new(
          errors.callbackPass(
            info.message || info.toString(),
            info.statusCode || 401
          )
        );
        // return res.json({
        //   statusCode: info.statusCode || 401,
        //   message: info.message || info.toString(),
        // });
      }
      req.user = user;
      return next();
    })(req, res, next);
  };
};
