import propsChatsUtils from "../utils/propsChats.utils.js";

function propsChats(req, res, next) {
  try {
    propsChatsUtils(req.body)
    return next()
  } catch (error) {
    return next(error)
  }
}

export default propsChats;