import chat from "../data/fs/ChatManager.fs.js";
import product from "../data/fs/ProductManager.fs.js";
import propsProductsUtils from "./propsProducts.utils.js";
import { socketServer } from "../../server.js";

// const messages = [];
export default (socket) => {
  console.log("connected id:" + socket.id);
  socket.on("user", () => {
    socket.emit("all", chat.read());
  });
  socket.emit("products", product.read());
  socket.on("new product", async (data) => {
    try {
      propsProductsUtils(data);
      await product.create(data);
      socketServer.emit("products", product.read());
    } catch (error) {
      console.log(error);
    }
  });
// socket.emit("all", messages);
  socket.on("new chat", async (data) => {
    try {
      await chat.create(data);
      // messages.push(data);
      socketServer.emit("all", chat.read());
    } catch (error) {
      console.log(error);
    }
  });

  // socket.on("new user", async (data) => {
  //   try {
  //     await user.create(data);
  //     socket.emit("new sucess", "well done!")
  //   } catch (error) {
  //       console.log(error);
  //   }
  // });
};
