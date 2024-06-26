import CustomError from "../../utils/errors/CustomError.js";
import errors from "../../utils/errors/errors.js";
import logger from "../../utils/logger/index.js";

class UserManager {
  static #users = [];
  constructor() {}
  create(data) {
    if (data.name && data.photo && data.email) {
      let user = {
        name: data.name,
        photo: data.photo,
        email: data.email,
      };


      const id = UserManager.#users.length ? UserManager.#users.length + 1 : 1;

      UserManager.#users.push({id,...data});
      return user;
    } else {
      CustomError.new(errors.missingData)
    }
  }

  read() {
    return UserManager.#users;
  }

  readOne(id) {
    const idExist = UserManager.#users.find((user) => user.id == Number(id));
    if (!idExist) {
      CustomError.new(errors.notFound)
    } else {
      return idExist;
    }
  }
  destroy(id){
    try {
      let one = UserManager.#users.find((each) => each.id === id)
      if(!one){
        throw new Error("There isn't any user with id=" + id);
      } else{
        UserManager.#users = UserManager.#users.filter((each) => each.id !==id)
        logger.INFO("deleted: " + JSON.stringify(id));
        return UserManager.#users
      }
    } catch (error) {
      return error.message
    }
  }
  updateUser(name, photo, email, uid) {
    try {
      const one = this.readOne(uid);
      if (one === "No existe el id") {
        throw new Error("There isn't any user with id: " + uid);

      } else {
        (one.id = uid),
          (one.name = name),
          (one.photo = photo),
          (one.email = email);

        return one;
      }
    } catch (error) {
      logger.WARN(error.message);
      return error.message;
    }
  }
}

const user = new UserManager();

user.create({
  name: "Naroha",
  photo: "https://img.com",
  email: "naroha@gmail.com",
});

user.create({
  name: "Santiago",
  photo: "https://img.com",
  email: "santiago@gmail.com",
});


user.updateUser("panchi", "png", "panchi2@hotmail.com", "1")




