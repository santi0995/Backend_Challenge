import { comments } from "../data/mongo/manager.mongo.js";

class CommentsService {
  constructor() {
    this.model = comments;
  }
  //   create = async (data) => await this.model.create(data);
  //   read = async ({filter,options}) => await this.model.read({ filter, options });
  //   readOne = async (id) => await this.model.readOne(id);
  //   update = async (data) => await this.model.update(id, data);
  //   destroy = async (id) => await this.model.destroy(id);
  create = async (data) => {
    try {
      const response = await this.model.create(data);
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
  readOne = async (id) => {
    try {
        const response = await this.model.readOne(id)
        return response
    } catch (error) {
        throw error
    }
  }
  update = async (id, data) => {
    try {
        const response = await this.model.update(id, data)
        return response
    } catch (error) {
        throw error
    }
  }
  destroy = async (id) => {
    try {
        const response = await this.model.destroy(id)
        return response
    } catch (error) {
        throw error
    }
  }
}

const service = new CommentsService();
export default service;
