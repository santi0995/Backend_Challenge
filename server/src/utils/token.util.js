import CustomError from "./errors/CustomError.js";
import env from "./env.utils.js";
import errors from "./errors/errors.js";
import jwt from "jsonwebtoken";

function createToken(data) {
  const token = jwt.sign(
    data, 
    env.SECRET,
    { expiresIn: 60 * 60 * 24 * 7 * 1000}
  );
  return token;
}

function verifyToken(token) {
  if (token) {
    const data = jwt.verify(token, env.SECRET);
    //qué pasa si no verifica
    return data;
  }
  CustomError.new(errors.token)
}

export { createToken, verifyToken };