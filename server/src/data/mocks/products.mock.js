import { faker } from "@faker-js/faker";
import repository from "../../repositories/products.rep.js"
import winstonUtils from "../../utils/winston.utils.js";

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
    // winstonUtils.INFO("Product created!");
}

