import OrderDTO from "../dto/orders.dto.js";
import repository from "../repositories/orders.rep.js";

class OrdersService {
  constructor() {
    this.repository = repository;
  }
  create = async (data) => {
    data = new OrderDTO(data);
    const response = await this.repository.create(data);
    return response;
  };

  read = async ({ filter, options }) =>
    await this.repository.read({ filter, options });

  readOne = async (oid) => await this.repository.readOne(oid);

  readBill = async (uid) => await this.repository.reportBill(uid);

  update = async (oid, data) => await this.repository.update(oid, data);

  destroy = async (oid) => await this.repository.destroy(oid);
}

const service = new OrdersService();
export default service;
