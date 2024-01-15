import crypto from "crypto";
import fs from "fs";
const config = "utf-8";
const ruta = "./src/data/fs/files/Userfs.json";
const users = [];

class UserManagerFs {
  constructor() {
  }
  async create(data) {
    try {
        const user = {
          id: crypto.randomBytes(12).toString("hex"),
          name: data.name,
          photo: data.photo,
          email: data.email,
        };
        users.push(user);
        const jsonData = JSON.stringify(users, null, 2);
        await fs.promises.writeFile(ruta, jsonData);
        return user.id;
    } catch (error) {
      return error.message;
    }
  }

  read() {
    try {
      const contenidoLeido = fs.readFileSync(ruta, config);
      const contenidoparseado = JSON.parse(contenidoLeido);
      if (contenidoparseado.length === 0) {
        throw new Error("not found!");
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
        throw new Error("not found!");
      } else {
        return idExist;
      }
    } catch (error) {
      return error.message;
    }
  }

  async destroyOne(id) {
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
        console.log("deleted: " + id);
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
  
  updateUser(name, photo, email, uid) {
    try {
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
        console.log(one);
        return one;
      }
    } catch (error) {
      console.log(error.message);
      return error.message;
    }
  }
}

const user = new UserManagerFs();

export default user;
