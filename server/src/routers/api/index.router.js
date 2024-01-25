import {Router} from "express"

import chatRouter from "./chat.router.js"

import ordersRouter from "./order.router.js";
import productsRouter from "./products.router.js";
import usersRouter from "./users.router.js";

const apiRouter = Router()

apiRouter.use("/users", usersRouter)
apiRouter.use("/products", productsRouter)
apiRouter.use("/orders", ordersRouter)


apiRouter.use("/chat", chatRouter)


export default apiRouter 