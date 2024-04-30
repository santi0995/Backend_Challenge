import ProductDTO from "../dto/products.dto.js";
import dao from "../data/index.factory.js";

const { products } = dao;

class ProductsRep {
  constructor() {
    this.model = products;
  }
  create = async (data, _id) => {
    data = new ProductDTO(data, _id);
    const response = await this.model.create(data, _id);
    return response;
  };
  read = async ({ filter, options }) =>
    await this.model.read({ filter, options });
  readOne = async (id) => await this.model.readOne(id);
  update = async (id, data) => await this.model.update(id, data);
  destroy = async (id) => await this.model.destroy(id);
}

const repository = new ProductsRep();
export default repository;
