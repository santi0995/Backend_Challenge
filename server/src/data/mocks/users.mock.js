import createComment from "./comments.mock.js";
import createOrder from "./orders.mock.js";
import { faker } from "@faker-js/faker";
import logger from "../../utils/logger/index.js";
import { productsMock } from "./products.mock.js";
import repository from "../../repositories/users.rep.js";
import repositoryP from "../../repositories/products.rep.js";

function usersMock() {
  return {
    name: faker.person.firstName(),
    email:
      (faker.person.firstName() + faker.person.lastName()).toLowerCase() +
      faker.number.hex(64) +
      "@coder.com",
    password: "hola1234",
  };
}

async function createUser() {
  try {
    const data = usersMock();
    const productData = productsMock();
    const user = await repository.create(data);
    const product = await repositoryP.create(productData);
    for(let i = 1; i<=1; i++){
      await createOrder(user._id, product._id) 
    }
    for(let i = 1; i<=10; i++){
      await createComment(user._id, product._id)
    }
  } catch (error) {
    logger.WARN(error.message);
  }
}
for(let i=1; i<=1; i++){
createUser();
}
logger.INFO("Data Mocked");
