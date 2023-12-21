const crypto = require("crypto");

class UserManager {
  static #users = [];
  constructor() {}
  create(data) {
    if (data.name && data.photo && data.email) {
      let user = {
        id: crypto.randomBytes(12).toString("hex"),
        name: data.name,
        photo: data.photo,
        email: data.email,
      };


      UserManager.#users.push(user);
      return user;
    } else {
      throw new Error("Datos faltantes");
    }
  }

  read() {
    return UserManager.#users;
  }

  readOne(id) {
    const idExist = UserManager.#users.find((user) => user.id == Number(id));
    if (!idExist) {
      throw new Error("No existe el id");
    } else {
      return idExist;
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

console.log(user.read());
console.log(user.readOne(2));
