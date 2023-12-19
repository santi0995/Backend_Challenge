const fs = require("fs");
const ruta = "./app/data/Userfs.json";
const rutaAsync = "./app/data/Userfs.async.json";
const rutaPromise = "./app/data/Userfs.promise.json";
const config = "utf-8";
const users = [];

class UserManagerFs {
  create(data) {
    if (data.name && data.photo && data.email) {
        let user = {
          name: data.name,
          photo: data.photo,
          email: data.email,
        };

      const id = user.length === 0 ? 1 : users.length + 1;
      users.push({ id, ...data });
      return user;
    } else {
      throw new Error("Datos faltantes");
    }
  }

  // Implementación sincrónica

  read() {
    const contenidoLeido = fs.readFileSync(ruta, config);
    const contenidoparseado = JSON.parse(contenidoLeido);
    return contenidoparseado;
  }

  readOne(id) {
    const contenidoLeido = fs.readFileSync(ruta, config);
    const contenidoparseado = JSON.parse(contenidoLeido);
    const idExist = contenidoparseado.find((user) => user.id == id);
    if (!idExist) {
      throw new Error("No existe el id");
    } else {
      return idExist;
    }
  }
  delete() {
    fs.unlinkSync(ruta);
  }
}

const user = new UserManagerFs();

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

const contenido = JSON.stringify(users, null, 2);

fs.writeFileSync(ruta, contenido);

fs.writeFile(rutaAsync, contenido, (error) => {
  if (error) {
    return error.message;
  }
});

fs.promises.writeFile(rutaPromise, contenido)
.then(res => console.log("Creado Correctamente"))
.catch(error => console.log(error));

// Implementación con callbacks

function readAsync() {
  fs.readFile(rutaAsync, config, (error, resultado) => {
    if (error) {
      return error;
    }
    const parseado = JSON.parse(resultado);
    console.log(parseado);
    return resultado;
  });
}

function readOneAsync(id) {
  fs.readFile(rutaAsync, config, (error, resultado) => {
    if (error) {
      return error;
    }
    const parseado = JSON.parse(resultado)
    const idExist = parseado.find((user) => user.id == id)
    if(!idExist){
        throw new Error("No existe el id")
    } 
    console.log(idExist);
  });
}

function deleteFile(){
    fs.unlink(rutaAsync, (error) =>{
        if(error) {
            return error.message
        }
    })
}

// Implementación con promesas

function readFilePromise () {
    fs.promises.readFile(rutaPromise, config)
    .then(res => {
        const parse = JSON.parse(res)
        console.log(parse);
    })
    .catch(error => console.log(error))
}

function readOnePromise(id){
    fs.promises.readFile(rutaPromise, config)
    .then(res => {
        const parse = JSON.parse(res)
        const idExist = parse.find((user) => user.id == id)
        if(!idExist){
            throw new Error("No existe el id")
        } 
        console.log(idExist);
    })
}

function deletePromise(){
    fs.promises.unlink(rutaPromise)
    .then(res => (console.log("Eliminado correctamente")))
    .catch(error => console.log("Ocurrió un error"))
}

// readOnePromise(2)
// readFilePromise();
// deleteFile();
// readAsync();
// readOneAsync(2);
// console.log(user.read());
// console.log(user.readOne(2));
// user.delete();
