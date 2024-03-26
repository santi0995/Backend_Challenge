import repository from "../repositories/users.rep.js";
import sendEmail from '../utils/sendEmail.util.js'

class UsersService {
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

  readOne = async (uid) => {
    try {
      const response = await this.repository.readOne(uid);
      return response;
    } catch (error) {
      throw error;
    }
  };

  readByEmail = async (email) => {
    try {
      const one = await this.repository.readByEmail(email);
      return one;
    } catch (error) {
      throw error;
    }
  };

  update = async (uid, data) => {
    try {
      const response = await this.repository.update(uid, data);
      return response;
    } catch (error) {
      throw error;
    }
  };
  destroy = async (uid) => {
    try {
      const response = await this.repository.destroy(uid);
      return response;
    } catch (error) {
      throw error;
    }
  };
  
  register = async(data) => {
    try {
      await sendEmail (data)
    } catch (error) {
      throw error
    }
  }  
}

const service = new UsersService();
export default service;
