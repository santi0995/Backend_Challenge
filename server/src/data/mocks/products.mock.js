import { faker } from "@faker-js/faker";
import logger from "../../utils/logger/index.js";
import repository from "../../repositories/products.rep.js"

export function productsMock() {
    return {
        title: faker.commerce.product(),
        photo: faker.image.url(),
        price: faker.number.int(200),
        stock: faker.number.int(30),
      }
  }

export default async function createProduct() {
    await repository.create(productsMock())
    // logger.INFO("Product created!");
}

