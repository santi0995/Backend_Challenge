import winstonUtils from "../utils/winston.utils.js";

export default (req, res, next) => {
    winstonUtils.WARN(`${req.method} ${req.url} not found endpoint`);
    return res.json({
      statusCode: 404,
      url: `${req.method} ${req.url}`,
      message: `not found path`,
    });
  };