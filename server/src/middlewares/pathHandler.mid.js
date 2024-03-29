export default (req, res, next) => {
    console.error(`${req.method} ${req.url} not found endpoint`);
    return res.json({
      statusCode: 404,
      url: `${req.method} ${req.url}`,
      message: `not found path`,
    });
  };