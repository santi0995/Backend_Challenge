import {
  create,
  destroy,
  read,
  readOne,
  readOneEmail,
  update,
} from "../../controllers/users.controller.js";

import CustomRouter from "../CustomRouter.js";
import propsUsers from "../../middlewares/propsUsers.mid.js";

class UsersRouter extends CustomRouter{
   init(){
    this.create(
      "/", ["PUBLIC"],
      propsUsers, create
    );
    this.read("/", ["PUBLIC"], read);
    this.read("/:email", ["ADMIN"], readOneEmail);
    this.read("/:uid", ["ADMIN"], readOne);
    this.update("/:uid", ["ADMIN"], update);
    this.destroy("/:uid", ["ADMIN"], destroy);
   }
}

const usersRouter = new UsersRouter();
export default usersRouter.getRouter();



