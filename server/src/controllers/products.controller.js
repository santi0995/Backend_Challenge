import CustomError from "../utils/errors/CustomError.js";
import errors from "../utils/errors/errors.js";
import products from "../data/mongo/products.mongo.js";
import service from "../services/products.service.js"
import users from "../data/mongo/users.mongo.js";

class ProductsController {
  constructor() {
    this.service = service;
  }
  create = async (req, res, next) => {
    const { _id } = req.user
    try {
      const data = req.body;
      const response = await this.service.create(data, _id);
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
      if (all.totalDocs === 0) {
        CustomError.new(errors.notFound)
      }
      return res.success200(all);
    } catch (error) {
      return next(error);
    }
  };

  readMine = async (req, res, next) => {
    try {
      const options = {
        limit: req.query.limit || 20,
        page: req.query.page || 1,
        sort: { title: 1 },
        lean: true,
      };
      if (req.query.sort === "desc") {
        options.sort.title = "desc";
      }
      const userEmail = req.body.userEmail;
      const user = await users.readByEmail(userEmail);
      const filter = {
        owner_id: user._id,
      };
      const all = await products.read({ filter, options });
      return res.success200(all)
    } catch (error) {
      return next(error);
    }
  }

   readOne = async (req, res, next) => {
    try {
      const { pid } = req.params;
      const one = await this.service.readOne(pid);
      if (one) {
        return res.success200(one);
      }
      CustomError.new(errors.notFound)
    } catch (error) {
      return next(error);
    }
  }
  update = async (req, res, next) => {
    try {
      const { pid } = req.params;
      const data = req.body;
      const response = await this.service.update(pid, data);
      if (response) {
        return res.success200(response);
      }
      CustomError.new(errors.notFound)
    } catch (error) {
      return next(error);
    }
  }
  destroy =  async (req, res, next) => {
    try {
      const { pid } = req.params;
      const response = await this.service.destroy(pid);
      if (response) {
        return res.success200(response);
      }
      CustomError.new(errors.notFound)
    } catch (error) {
      return next(error);
    }
  }

  
}

export default ProductsController;
const controller = new ProductsController();
const { create, read, readMine, readOne, update, destroy} = controller

export { create, read, readMine, readOne, update, destroy };
