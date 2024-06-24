import Express from "express";
import { PostController } from "../controller/post_controller";

const postRouter : Express.Router = Express.Router();


postRouter.get("/getMyPost",PostController.getMyPost)
postRouter.get("/getAllPost",PostController.getAllPost)
postRouter.post("/addPost",PostController.addPost)
postRouter.put("/updatePost",PostController.updatePost)
postRouter.delete("/deletePost",PostController.deletePost)
postRouter.get("/searchPost",PostController.searchByTitle)
postRouter.get("/sortByLikes",PostController.sortByLikes)




export default postRouter;