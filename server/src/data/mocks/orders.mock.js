import { faker } from "@faker-js/faker";
import repository from "../../repositories/orders.rep.js";
import winstonUtils from "../../utils/winston.utils.js";

function ordersMock(user_id, product_id) {
  return {
    product_id: product_id,
    user_id: user_id,
    quantity: faker.number.int(20),
    state: faker.helpers.arrayElement(["reserved", "paid", "delivered"]),
  };
}

export default async function createOrder(user_id, product_id) {
  try {
    const data = ordersMock(user_id, product_id)
    await repository.create(data)
    // winstonUtils.INFO("Order created!");
  } catch (error) {
    winstonUtils.WARN(error.message);
  }
}
