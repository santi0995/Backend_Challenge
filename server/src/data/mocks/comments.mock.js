import { faker } from "@faker-js/faker";
import logger from "../../utils/logger/index.js";
import repository from "../../repositories/comments.rep.js"

function commentsMock(user_id, product_id) {
    return {
        text: faker.lorem.text(),
        user_id: user_id,
        product_id: product_id,
      }
  }

export default async function createComment(user_id, product_id) {
    try {
        const data = commentsMock(user_id, product_id)
        await repository.create(data)
        // logger.INFO("Comment created!");
      } catch (error) {
        logger.WARN(error.message);
      }
}

