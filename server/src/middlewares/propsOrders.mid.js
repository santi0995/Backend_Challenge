function propsOrders(req, res, next) {
    const { pid, uid, quantity, state } = req.body;
    if (!pid || !uid || !quantity || !state) {
      return res.json({
        statusCode: 400,
        message: `${req.method} ${req.url} ${error.message} All params are required `
      });
    } else {
      return next();
    }
  }
  
  export default propsOrders;
  