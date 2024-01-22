function propsChatsUtils(data) {
    const { name, message } = data;
    if (!name || !message) {
      const error = new Error("Todos los campos son obligatorios");
      error.statusCode = 404;
      throw error;
    }
  }
  
  export default propsChatsUtils;