import service from "../services/users.service.js";

class UsersController {
  constructor() {
    this.service = service;
  }
  create = async (req, res, next) => {
    try {
      const data = req.body;
      const response = await this.service.create(data);
      return res.success201(response);
    } catch (error) {
      return next(error);
    }
  };
  read = async (req, res, next) => {
    try {
      const options = {
        limit: req.query.limit || 10,
        page: req.query.page || 1,
        sort: { stock: 1, price: 1 },
        lean: true,
      };
      const filter = {};
      if (req.query.title) {
        filter.title = new RegExp(req.query.title.trim(), "i");
      }
      if (req.query.stock === "desc") {
        options.sort.stock = -1;
      }
      if (req.query.price === "desc") {
        options.sort.price = -1;
      }
      const all = await this.service.read({ filter, options });
      return res.success200(all);
    } catch (error) {
      return next(error);
    }
  };
  readOne = async (req, res, next) => {
    try {
      const { uid } = req.params;
      const one = await this.service.readOne(uid);
      return res.success200(one);
    } catch (error) {
      return next(error);
    }
  };
  readOneEmail = async (req, res, next) => {
    try {
      const { email } = req.params;
      const one = await this.service.readByEmail(email);
      if (typeof one !== "string") {
        return res.res.success200(one);
      }
    } catch (error) {
      return next(error);
    }
  };
  update = async (req, res, next) => {
    try {
      const { uid } = req.params;
      const response = await this.service.update(uid, data);
      return res.success200(response);
    } catch (error) {
      return next(error);
    }
  };
  destroy = async (req, res, next) => {
    try {
      const { uid } = req.params;
      const response = await this.service.destroy(uid);
      return res.success200(response);
    } catch (error) {
      return next(error);
    }
  };
}

export default UsersController;
const controller = new UsersController();
const { create, read, readOne, readOneEmail, update, destroy } = controller;

export { create, read, readOne, readOneEmail, update, destroy };
