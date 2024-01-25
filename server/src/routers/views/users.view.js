import { Router } from "express";
import user from "../../data/fs/UserManager.fs.js";

const usersRouter = Router();


usersRouter.get("/register", (req, res, next) => {

  try {
    const one = user.readOne("7bebce74237420337c78b064");
    return res.render("register", { one });
  } catch (error) {
    next(error);
  }
});


usersRouter.get("/chat", (req, res, next) =>{
  try {
    return res.render("chat", {})
  } catch (error) {
    next(error);
  }
})

export default usersRouter;
 