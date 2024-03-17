import { users } from "../data/mongo/manager.mongo.js";

class UsersService {
  constructor() {
    this.model = users;
  }
  create = async (data) => {
    try {
      const response = await this.model.create(data);
      return response;
    } catch (error) {
      throw error;
    }
  };

  read = async ({ filter, options }) => {
    try {
      const response = await this.model.read({ filter, options });
      return response;
    } catch (error) {
      throw error;
    }
  };

  readOne = async (uid) => {
    try {
      const response = await this.model.readOne(uid);
      return response;
    } catch (error) {
      throw error;
    }
  };

  readByEmail = async (email) => {
    try {
      const one = await this.model.readByEmail({ email });
      return one;
    } catch (error) {
      throw error;
    }
  };

  update = async (uid, data) => {
    try {
      const response = await this.model.update(uid, data);
      return response;
    } catch (error) {
      throw error;
    }
  };
  destroy = async (uid) => {
    try {
      const response = await this.model.destroy(uid);
      return response;
    } catch (error) {
      throw error;
    }
  };
}

const service = new UsersService();
export default service;
