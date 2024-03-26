import repository from "../repositories/orders.rep.js";

class OrdersService {
  constructor() {
    this.repository = repository;
  }
  create = async (data) => {
    try {
      const response = await this.repository.create(data);
      return response;
    } catch (error) {
      throw error;
    }
  };

  read = async ({ filter, options }) => {
    try {
      const response = await this.repository.read({ filter, options });
      return response;
    } catch (error) {
      throw error;
    }
  };

  readOne = async (oid) => {
    try {
      const response = await this.repository.readOne(oid);
      return response;
    } catch (error) {
      throw error;
    }
  };
  readBill = async (uid) => {
    try {
      const response = await this.repository.reportBill(uid);
      return response;
    } catch (error) {
      throw error;
    }
  };

  update = async (oid, data) => {
    try {
      const response = await this.repository.update(oid, data);
      return response;
    } catch (error) {
      throw error;
    }
  };
  destroy = async (oid) => {
    try {
      const response = await this.repository.destroy(oid);
      return response;
    } catch (error) {
      throw error;
    }
  };
}

const service = new OrdersService();
export default service;
