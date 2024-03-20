import Comment from "./models/comment.model.js";
import MongoManager from "./manager.mongo.js";

const comments = new MongoManager(Comment);
export default comments;
