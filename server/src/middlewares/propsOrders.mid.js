function propsOrders(req, res, next) {
    const { product_id, user_id, quantity, state } = req.body;
    if (!product_id || !user_id || !quantity || !state) {
      return res.json({
        statusCode: 400,
        message: `${req.method} ${req.url} ${error.message} All params are required `
      });
    } else {
      return next();
    }
  }
  
  export default propsOrders;
  