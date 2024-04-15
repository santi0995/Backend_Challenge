const errors = {
    error: { message: "Error", statusCode: 400 },
    register: { message: "User already exists", statusCode: 400 },
    token: { message: "Invalid verified token!", statusCode: 400 },
    callbackPass: (message, statusCode) => ({statusCode, message}),
    auth: { message: "Invalid credentials", statusCode: 401 },
    forbidden: { message: "Forbidden", statusCode: 403 },
    notFound: { message: "Not Found", statusCode: 404 },
    fatal: { message: "Fatal", statusCode: 500 },
  };
  
  export default errors;