import { Router } from "express";
//import propsUsers from "../../middlewares/propsUsers.mid.js";
// import user from "../../data/fs/UserManager.fs.js";
import { users } from "../../data/mongo/manager.mongo.js";

const usersRouter = Router();

usersRouter.post("/", /*propsUsers*/ async (req, res, next) => {
  try {
    const data = req.body;
    const response = await users.create(data);

    return res.json({
      statusCode: 201,
      response,
    });
  } catch (error) {
    return next(error);
  }
});
usersRouter.get("/", async (req, res, next) => {
  try {
    const all = await users.read({});
    if (Array.isArray(all)) {
      return res.json({
        statusCode: 200,
        response: all,
      });
    } else {
      return res.json({
        statusCode: 404,
        response: all,
      });
    }
  } catch (error) {
    return next(error);
  }
});
usersRouter.get("/:email", async (req, res, next) => {
  try {
    const { email } = req.params;
    const one = await users.readByEmail(email);
    if (typeof one !== "string") {
      return res.json({
        statusCode: 200,
        response: one,
      });
    } else {
      return res.json({
        statusCode: 404,
        response: one,
      });
    }
  } catch (error) {
    return next(error);
  }
});
usersRouter.get("/:uid", async (req, res, next) => {
  try {
    const { uid } = req.params;
    const one = await users.readOne(uid);
    return res.json({
      statusCode: 200,
      response: one,
    });
  } catch (error) {
    return next(error);
  }
});
usersRouter.put(
  "/:uid",
  async (req, res, next) => {
    try {
      const {uid} = req.params
      const data = req.body;
      const response = await users.update(uid, data);
      if (response) {
        return res.json({
          statusCode: 200,
          response
        });
      } else if (response === "not found!") {
        return res.json({
          statusCode: 404,
          response
        });
      } else {
        return res.json({
          statusCode: 400,
          response
        });
      }
    } catch (error) {
      return next(error);
    }
  }
);
usersRouter.delete("/:uid", async (req, res, next) => {
  try {
    const { uid } = req.params;
    const response = await users.destroy(uid);
    if (response === "There isn't any user") {
      return res.json({
        statusCode: 404,
        response
      });
    } else {
      return res.json({
        statusCode: 200,
        response,
      });
    }
  } catch (error) {
    return next(error);
  }
});

export default usersRouter;
