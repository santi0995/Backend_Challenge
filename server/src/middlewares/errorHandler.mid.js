import winstonUtils from "../utils/winston.utils.js";

export default (error, req, res, next) => {
  if(!error.statusCode || error.statusCode === 500){
    error.statusCode = 500
    winstonUtils.ERROR(error.message)
  } else {
    winstonUtils.WARN(error.message);
  }
    return res.json({
      statusCode: error.statusCode || 500,
      url: `${req.method} ${req.url}`,
      message: error.message,
    });
  };