import passport from "passport";

export default (strategy) => {
  return async (req, res, next) => {
    passport.authenticate(strategy, (error, user, info) => {
      if (error) {
        return next(eror);
      }
      if (!user) {
        return res.json({
          statusCode: info.statusCode || 401,
          message: info.messages || info.toString(),
        });
      }
      req.user = user;
      return next();
    })(req, res, next);
  };
};
