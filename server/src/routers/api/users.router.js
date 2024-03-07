import CustomRouter from "../CustomRouter.js";
//import propsUsers from "../../middlewares/propsUsers.mid.js";
// import user from "../../data/fs/UserManager.fs.js";
import { users } from "../../data/mongo/manager.mongo.js";

export default class UsersRouter extends CustomRouter{
   init(){
    this.create(
      "/",
      /*propsUsers*/ async (req, res, next) => {
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
      }
    );
    this.read("/", async (req, res, next) => {
      try {
        const orderAndPaginate = {
          limit: req.query.limit || 20,
          page: req.query.page || 1,
          sort: { name: 1 },
          lean: true
        };
        const filter = {};
        if (req.query.email) {
          filter.email = new RegExp(req.query.email.trim(), "i");
        }
        if (req.query.name === "desc") {
          orderAndPaginate.sort.name = -1;
        }
        const all = await users.read({ filter, orderAndPaginate });
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
    this.read("/:email", async (req, res, next) => {
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
    this.read("/:uid", async (req, res, next) => {
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
    this.update("/:uid", async (req, res, next) => {
      try {
        const { uid } = req.params;
        const data = req.body;
        const response = await users.update(uid, data);
        if (response) {
          return res.json({
            statusCode: 200,
            response,
          });
        } else if (response === "not found!") {
          return res.json({
            statusCode: 404,
            response,
          });
        } else {
          return res.json({
            statusCode: 400,
            response,
          });
        }
      } catch (error) {
        return next(error);
      }
    });
    this.destroy("/:uid", async (req, res, next) => {
      try {
        const { uid } = req.params;
        const response = await users.destroy(uid);
        if (response === "There isn't any user") {
          return res.json({
            statusCode: 404,
            response,
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
   }
}



