import CustomRouter from "../CustomRouter";

export default class CookiesRouter extends CustomRouter {
  init() {
    this.read("/set/:modo", async (req, res, next) => {
      try {
        const { modo } = req.params;
        const maxAge = 60000 * 5;
        const signed = true;
        return res
          .cookie("modo", modo, { maxAge })
          .cookie("sessionId", "hola1234", { maxAge, signed })
          .json({
            statusCode: 200,
            message: "Cookie configurada - Modo: " + modo,
          });
      } catch (error) {
        return next(error);
      }
    });

    this.read("/get", async (req, res, next) => {
      try {
        const modo = req.cookies.modo;
        const sessionId = req.signedCookies.sessionId;
        return res.json({
          statusCode: 200,
          response: { modo, sessionId },
        });
      } catch (error) {
        return next(error);
      }
    });

    this.read("/clear", async (req, res, next) => {
      try {
        return res
          .clearCookie("modo")
          .clearCookie("sessionId")
          .json({
            statusCode: 200,
            response: {
              modo: req.cookies.modo,
              sessionId: req.signedCookies.sessionId,
            },
          });
      } catch (error) {
        return next(error);
      }
    });
  }
}
