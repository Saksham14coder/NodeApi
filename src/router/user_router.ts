import Express from "express";
import { UserController } from "../controller/user_controller";

const userRouter : Express.Router = Express.Router();


userRouter.post("/signUp",UserController.signUp)
userRouter.post("/signIn",UserController.signIn)
userRouter.get("/myProfile",UserController.myProfile)
userRouter.put("/updateProfile",UserController.updateProfile)
userRouter.put("/updateFollower",UserController.updateFollower)

export default userRouter;