function propsUsersUtils(data) {
  const { name, photo, email} = data;
  if (!name || !photo || !email) {
    const error = new Error("Todos los campos son obligatorios");
    error.statusCode = 404;
    throw error;
  }
}

export default propsUsersUtils;
