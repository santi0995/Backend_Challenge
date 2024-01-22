import { Router } from "express";
import chat from '../../data/fs/ChatManager.fs.js'
import propsChats from '../../middlewares/propsChats.mid.js'

const chatRouter = Router();

chatRouter.post("/", propsChats,async (req, res, next) => {
  try {
    const data = req.body;
    const response = await chat.create(data);

    return res.json({
      statusCode: 201,
      response,
    });
  } catch (error) {
    return next(error);
  }
});

chatRouter.get("/", async (req, res, next) => {
  try {
    const all = await chat.read();
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

export default chatRouter;
