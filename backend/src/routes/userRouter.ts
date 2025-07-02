import express from "express";
import {
    Signup,
    Signin,
    GetUser,
    DeleteUser,
    UpdateUser,
    GetAllUsers,
} from "../controller/userController";
import { IsAuthenticated } from "../middleware/IsAuthenticated";

const userRouter = express.Router();

userRouter.route("/signin").post(Signin);
userRouter.route("/signup").post(Signup);
//test
userRouter.route("/allUsers").get(GetAllUsers);

userRouter.use(IsAuthenticated);
userRouter.route("/getUser").get(GetUser);
userRouter.route("/updateUser").put(UpdateUser);
userRouter.route("/deleteUser").delete(DeleteUser);

export default userRouter;
