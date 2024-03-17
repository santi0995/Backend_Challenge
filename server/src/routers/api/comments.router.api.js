import {
  create,
  destroy,
  read,
  readOne,
  update,
} from "../../controllers/comments.controller.js";

import CustomRouter from "../CustomRouter.js";

class CommentsRouter extends CustomRouter {
  init() {
    this.create("/", ["USER", "PREM"], create);
    this.read("/", ["PUBLIC"], read);
    this.read("/:cid", ["PUBLIC"], readOne);
    this.update("/:cid", ["USER", "PREM"], update);
    this.destroy("/:cid", ["USER", "PREM"], destroy);
  }
}

let commentsRouter = new CommentsRouter();
commentsRouter = commentsRouter.getRouter();

export default commentsRouter;
