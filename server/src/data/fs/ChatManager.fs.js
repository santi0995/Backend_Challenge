import fs from "fs";
const ruta = "./src/data/fs/files/Chatfs.json";
const config = "utf-8";

class ChatManagerFs {
  constructor() {}
  async create(data) {
    try {
      const existingData = await fs.promises.readFile(ruta, "utf-8");
      const chats = JSON.parse(existingData);

      const chat = {
        name: data.name,
        message: data.message,
      };

      chats.push(chat);
      const jsonData = JSON.stringify(chats, null, 2);
      await fs.promises.writeFile(ruta, jsonData);

      return chat;
    } catch (error) {
      return error.message;
    }
  }

  read() {
    try {
      const contenidoLeido = fs.readFileSync(ruta, config);
      const contenidoparseado = JSON.parse(contenidoLeido);
      const ultimosDiez = contenidoparseado.slice(-10);
      if (contenidoparseado.length === 0) {
        throw new Error("not found!");
      } 
      return ultimosDiez;
    } catch (error) {
      return error.message;
    }
  }
}

const chat = new ChatManagerFs();

export default chat;
