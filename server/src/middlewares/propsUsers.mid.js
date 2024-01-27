import propsUsersUtils from "../utils/propsUsers.utils.js";
function propsUsers(req, res, next) {
    try {
      propsUsersUtils(req.body)
    } catch (error) {
      return next(error)
    }
  }
  
  export default propsUsers;
  