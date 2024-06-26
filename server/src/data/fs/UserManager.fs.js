import CustomError from "../../utils/errors/CustomError.js";
import errors from "../../utils/errors/errors.js";
import fs from "fs";
import logger from "../../utils/logger/index.js";

const config = "utf-8";
const ruta = "./src/data/fs/files/Userfs.json";

class UserManagerFs {
  constructor() {
  }
  async create(data) {
    try {

      const existingData = await fs.promises.readFile(ruta, 'utf-8');
      const users = JSON.parse(existingData);

        users.push(data);
        const jsonData = JSON.stringify(users, null, 2);
        await fs.promises.writeFile(ruta, jsonData);

        return data;

    } catch (error) {
      return error.message;
    }
  }

  read() {
    try {
      const contenidoLeido = fs.readFileSync(ruta, config);
      const contenidoparseado = JSON.parse(contenidoLeido);
      if (contenidoparseado.length === 0) {
        CustomError.new(errors.notFound)
      }
      return contenidoparseado;
    } catch (error) {
      return error.message;
    }
  }

  readOne(id) {
    try {
      const contenidoLeido = fs.readFileSync(ruta, config);
      const contenidoparseado = JSON.parse(contenidoLeido);
      const idExist = contenidoparseado.find((user) => user.id === id);
      if (!idExist) {
        CustomError.new(errors.notFound)
      } else {
        return idExist;
      }
    } catch (error) {
      return error.message;
    }
  }
   readByEmail(email) {
    try {
      const contenidoLeido = fs.readFileSync(ruta, config);
      const contenidoparseado = JSON.parse(contenidoLeido);
      const emailExist = contenidoparseado.find((user) => user.email === email);
      if (!emailExist) {
        CustomError.new(errors.notFound)
      } else {
        return emailExist;
      }
    } catch (error) {
      return error.message;
    }
  }

  async destroy(id) {
    try {
      const contenidoLeido = fs.readFileSync(ruta, config);
      let contenidoparseado = JSON.parse(contenidoLeido);
      let one = contenidoparseado.find((each) => each.id === id);
      if (!one) {
        throw new Error("There isn't any product with id: " + id);
      } else {
        contenidoparseado = contenidoparseado.filter((each) => each.id !== id);
        const jsonData = JSON.stringify(contenidoparseado, null, 2);
        await fs.promises.writeFile(ruta, jsonData);
        logger.INFO("deleted: " + JSON.stringify(id));
        return id;
      }
    } catch (error) {
      return error.message;
    }
  }

  delete() {
    try {
      fs.unlinkSync(ruta);
    } catch (error) {
      return error.message;
    }
  }
  
 async update(name, photo, email, uid) {
    try {
      const existingData = await fs.promises.readFile(ruta, 'utf-8');
      const users = JSON.parse(existingData);
      const one = this.readOne(uid);
      if (one === "not found!") {
        throw new Error("There isn't any user with id: " + uid);

      } else {
        (one.id = uid),
          (one.name = name),
          (one.photo = photo),
          (one.email = email);

        users.push(one);
        const jsonData = JSON.stringify(users, null, 2);
        fs.writeFileSync(ruta, jsonData);
        logger.INFO(JSON.stringify(one));
        return one;
      }
    } catch (error) {
      logger.WARN(error.message);
      return error.message;
    }
  }
}

const user = new UserManagerFs();

export default user;
