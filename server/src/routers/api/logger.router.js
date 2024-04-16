import CustomRouter from "../CustomRouter.js";
import logger from "../../utils/logger/index.js";

class LoggerRouter extends CustomRouter {
  init() {
    this.read("/", ["PUBLIC"], (req,res)=>{
        try {
            logger.INFO("Mensaje de prueba (info)");
            logger.WARN('Mensaje de prueba (warn)');
            logger.ERROR('Mensaje de prueba (error)');
            
            res.success200("Mensajes de prueba registrados correctamente")
        } catch (error) {
            logger.ERROR('Error al probar el logger:', error);
            res.json({
                statusCode: 500,
                message
            })
        }
    });
  }
}
const loggersRouter = new LoggerRouter();
export default loggersRouter.getRouter();