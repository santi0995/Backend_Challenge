class SessionsController {
    register = async (req, res, next) => {
        try {
          return res.json({
            statusCode: 201,
            message: "Registered!",
          });
        } catch (error) {
          return next(error);
        }
      }
    login = async (req, res, next) => {
        try {
          return res
            .cookie("token", req.token, {
              maxAge: 7 * 24 * 60 * 60 * 1000,
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
      }
    github = async (req, res, next) => {
        try {
          return res.success200("Logged in with Github!");
        } catch (error) {
          return next(error);
        }
      };
    me = async (req, res, next) => {
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
      }
    signout = async (req, res, next) => {
        try {
          return res.clearCookie("token").json({
            statusCode: 200,
            message: "Signed out!",
          });
        } catch (error) {
          return next(error);
        }
      }
    badauth =  (req, res, next) => {
        try {
          return res.json({
            statusCode: 401,
            message: "Bad auth",
          });
        } catch (error) {
          return next(error);
        }
      }
}

export default SessionsController;
const controller = new SessionsController();
const { register, login, google, github, me, signout, badauth } = controller;
export { register, login, google, github, me, signout, badauth };