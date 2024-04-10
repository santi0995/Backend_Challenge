import createProduct, { productsMock } from "./products.mock.js";

import createOrder from "./orders.mock.js";
import { faker } from "@faker-js/faker";
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
      await createOrder(user._id, product._id);
    }
  } catch (error) {
    console.log(error);
  }
}
for(let i=1; i<=1; i++){
createUser();
}
console.log("Data Mocked");
