class UserManager {
    static #users = [];
  
    create(data) {
      if (data.name && data.photo && data.email) {
        let user = {
          name: data.name,
          photo: data.photo,
          email: data.email,
        };
  
        const id = UserManager.#users.length ? UserManager.#users.length + 1 : 1;
  
        UserManager.#users.push({ id, ...data });
        return user;
      }
      else {
        throw new Error('Datos faltantes');
      }
    }
  
    read() {
      return UserManager.#users;
    }

    rreadOne(id){
      const idExist = UserManager.#users.find((user)=> user.id ==id);
      if (!idExist) {
        throw new Error('No existe el id')
      }
      else{
        return idExist;
      }
    }
  }
  
  const user = new UserManager();
  
  
    user.create({
        name: 'Naroha',
        photo: 'https://img.com',
        email: 'naroha@gmail.com',
    });
  
    user.create({
        name: 'Santiago',
        photo: 'https://img.com',
        email: 'santiago@gmail.com',
    });
  
  console.log(user.read());
  console.log(user.readOne(2));
  