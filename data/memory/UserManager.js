
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
  destroy(id){
    try {
      let one = UserManager.#users.find((each) => each.id === id)
      if(!one){
        throw new Error("There isn't any user with id=" + id);
      } else{
        UserManager.#users = UserManager.#users.filter((each) => each.id !==id)
        console.log("deleted: " + id);
        return UserManager.#users
      }
    } catch (error) {
      return error.message
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


console.log(user.destroy(1));
// console.log(user.read());
// console.log(user.readOne(2));
