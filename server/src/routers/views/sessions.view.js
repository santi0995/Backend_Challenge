import CustomRouter from "../CustomRouter.js";

export default class SessionsRouter extends CustomRouter{
  init(){
    this.read("/register", async (req, res, next) => {
      try {
        return res.render("register");
      } catch (error) {
        return next(error);
      }
    });
    this.read("/login", async (req, res, next) => {
      try {
        return res.render("login");
      } catch (error) {
        return next(error);
      }
    });
    
  }
}




