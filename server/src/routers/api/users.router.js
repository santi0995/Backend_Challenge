import { Router } from "express";
import propsUsers from "../../middlewares/propsUsers.mid.js";
import user from "../../data/fs/UserManager.fs.js";

const usersRouter = Router();

usersRouter.post("/", propsUsers, async (req, res, next) => {
  try {
    const data = req.body;
    const response = await user.create(data);

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
    const all = await user.read();
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
usersRouter.get("/:uid", async (req, res, next) => {
  try {
    const { uid } = req.params;
    const one = await user.readOne(uid);
    if (one != {}) {
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
usersRouter.put(
  "/api/users/:uid/:name/:photo/:email",
  async (req, res, next) => {
    try {
      const { name, photo, email, uid } = req.params;
      const response = await user.updateUser(name, photo, email, uid);
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
    const response = await user.destroyOne(uid);
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
