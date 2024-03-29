import service from "../services/orders.service.js";

class OrdersController {
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
        limit: req.query.limit || 20,
        page: req.query.page || 1,
        sort: { title: 1 },
        lean: true,
      };
      const filter = {};
      if (req.user._id) {
        filter.user_id = req.user._id;
      }
      if (req.query.sort === "desc") {
        options.sort.title = "desc";
      }
      const all = await this.service.read({ filter, options });
      return res.success200(all);
    } catch (error) {
      return next(error);
    }
  };
  readOne = async (req, res, next) => {
    try {
      const { oid } = req.params;
      const one = await this.service.readOne(oid);
      if (typeof one !== "string") {
        return res.success200(one);
      }
    } catch (error) {
      return next(error);
    }
  };
  readOneTotalId = async (req, res, next) => {
    try {
      const { uid } = req.params;
      const report = await this.service.reportBill(uid);
      return resres.success200(report);
    } catch (error) {
      return next(error);
    }
  };

  update = async (req, res, next) => {
    try {
      const { oid } = req.params;
      const data = req.body;
      const response = await this.service.update(oid, data);
      if (response) {
        return res.success200(respone);
      } else if (response === "not found!") {
        return res.error404
      } else {
        return res.error400
      }
    } catch (error) {
      return next(error);
    }
  };

  destroy = async (req, res, next) => {
    try {
      const { oid } = req.params;
      const response = await this.service.destroy(oid);
      if (response === "There isn't any order") {
        return res.error404;
      } else {
        return res.success200(response);
      }
    } catch (error) {
      return next(error);
    }
  };
}

export default OrdersController;
const controller = new OrdersController();
const { create, read, readOne, readOneTotalId, update, destroy } = controller;

export { create, read, readOne, readOneTotalId, update, destroy };
