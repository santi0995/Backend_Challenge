import crypto from "crypto";
import fs from "fs";
const ruta = "./data/fs/files/Userfs.json";
const rutaAsync = "./data/fs/files/Userfs.async.json";
const rutaPromise = "./data/fs/files/Userfs.promise.json";
const config = "utf-8";
const users = [];

class UserManagerFs {
  constructor() {}
  async create(data) {
    try {
      if (!data.name || !data.photo || !data.email) {
        throw new Error("Datos faltantes");
      } 
        const user = {
          id: crypto.randomBytes(12).toString("hex"),
          name: data.name,
          photo: data.photo,
          email: data.email,
        }
        users.push(user);
        const jsonData = JSON.stringify(users, null, 2);
        await fs.promises.writeFile(rutaPromise, jsonData);
        return user;
    } catch (error) {
      return error.message;
    }
  }

  // Implementación sincrónica

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
}

const user = new UserManagerFs();

// const contenido = JSON.stringify(users, null, 2);

// fs.writeFileSync(ruta, contenido);

// fs.writeFile(rutaAsync, contenido, (error) => {
//   if (error) {
//     return error.message;
//   }
// });

// fs.promises
//   .writeFile(rutaPromise, contenido)
//   .then((res) => console.log("Creado Correctamente"))
//   .catch((error) => console.log(error));

// Implementación con callbacks

function readAsync() {
  try {
    fs.readFile(rutaAsync, config, (error, resultado) => {
      if (error) {
        return error;
      }
      const parseado = JSON.parse(resultado);
      console.log(parseado);
      return resultado;
    });
  } catch (error) {
    return error.message;
  }
}

function readOneAsync(id) {
  try {
    fs.readFile(rutaAsync, config, (error, resultado) => {
      if (error) {
        return error;
      }
      const parseado = JSON.parse(resultado);
      const idExist = parseado.find((user) => user.id == Number(id));
      if (!idExist) {
        throw new Error("No existe el id");
      }
      console.log(idExist);
    });
  } catch (error) {
    return error.message;
  }
}

function deleteFile() {
  fs.unlink(rutaAsync, (error) => {
    if (error) {
      return error.message;
    }
  });
}

// Implementación con promesas

function readFilePromise() {
  fs.promises
    .readFile(rutaPromise, config)
    .then((res) => {
      const parse = JSON.parse(res);
      console.log(parse);
    })
    .catch((error) => console.log(error));
}

function readOnePromise(id) {
  fs.promises.readFile(rutaPromise, config).then((res) => {
    const parse = JSON.parse(res);
    const idExist = parse.find((user) => user.id == Number(id));
    if (!idExist) {
      throw new Error("No existe el id");
    }
    console.log(idExist);
  });
}

function deletePromise() {
  fs.promises
    .unlink(rutaPromise)
    .then((res) => console.log("Eliminado correctamente"))
    .catch((error) => console.log("Ocurrió un error"));
}

export default user;
