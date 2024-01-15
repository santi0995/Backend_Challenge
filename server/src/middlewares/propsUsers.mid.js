function propsUsers(req, res, next) {
    const { name, photo, email } = req.body;
    if (!name || !photo || !email) {
      return res.json({
        statusCode: 400,
        message: `${req.method} ${req.url} ${error.message} All params are required `
    });
    } else {
      return next();
    }
  }
  
  export default propsUsers;
  