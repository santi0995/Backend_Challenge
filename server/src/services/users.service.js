import UserDTO from "../dto/users.dto.js";
import repository from "../repositories/users.rep.js";
import sendEmail from "../utils/sendEmail.util.js";

class UsersService {
  constructor() {
    this.repository = repository;
  }
  create = async (data) => {
    data = new UserDTO(data);
    const response = await this.repository.create(data);
    return response;
  };

  read = async ({ filter, options }) =>
    await this.repository.read({ filter, options });

  readOne = async (uid) => await this.repository.readOne(uid);

  readByEmail = async (email) => await this.repository.readByEmail(email);

  update = async (id, data) => await this.repository.update(id, data);

  destroy = async (id) => await this.repository.destroy(id);

  register = async (data) => {
    try {
      await sendEmail(data);
    } catch (error) {
      throw error;
    }
  };
}

const service = new UsersService();
export default service;
