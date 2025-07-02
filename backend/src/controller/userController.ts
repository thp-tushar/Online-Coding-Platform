import z from "zod";
import { userModel } from "../model/userModel";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import {
    signUpSchema,
    updateUserSchema,
    signInSchema,
    SignInToastMode,
} from "@zeditor/common";

dotenv.config();

export async function Signup(req: any, res: any) {
    //password === confirmPassword

    try {
        console.log(req.body);
        const validate = signUpSchema.safeParse(req.body);
        console.log("validate", validate);
        if (validate.success) {
            const { name, email, password, confirmPassword } = req.body;

            const existingUser = await userModel.findOne({ email: email });

            if (existingUser) {
                return res.json({
                    msg: "user with existing email exists",
                });
            }

            if (!(password === confirmPassword)) {
                return res.json({
                    msg: "password and confirm password don't match",
                });
            }

            //calls the pre 'save' middleware
            const user = await userModel.create({
                name,
                email,
                password,
            });

            //jwt + localstorage
            let secretKey: string = "";
            if (process.env.SECRET_KEY) {
                secretKey = process.env.SECRET_KEY;
            }
            const token = jwt.sign({ email: email }, secretKey, {
                expiresIn: "1 days",
            });

            // localStorage.setItem("authToken", `Bearer ${token}`);
            //TODO: Cookie value with whitespace is encoded on client side
            res.cookie("authToken", `Bearer ${token}`, {
                expires: new Date(Date.now() + 60 * 60 * 60),
                httpOnly: true,
                secure: false,
                sameSite: "none",
            });

            return res.json({
                msg: "user signed up",
                user,
                token,
                validate,
            });
        } else {
            return res.json({
                msg: "signup req body not validated",
                validate,
            });
        }
    } catch (error: any) {
        return res.json({
            msg: "error while signing up user",
            error,
        });
    }
}

export async function Signin(req: any, res: any) {
    let toast_mode;
    try {
        console.log("signin req body", req.body);
        const validate = signInSchema.safeParse(req.body);
        console.log("signin validate", validate);
        if (validate.success) {
            const { email, password } = req.body;

            const user = await userModel.findOne({
                email: email,
            });

            if (!user) {
                toast_mode = SignInToastMode.USER_NOT_FOUND;
                return res.json({
                    msg: "user not found with given email",
                    validate,
                    toast_mode,
                });
            }

            const validatePassword = await user.isValidPassword(password);
            console.log("[validatePassword] value ", validatePassword);
            if (!validatePassword) {
                toast_mode = SignInToastMode.PASSWORD_NOT_VALIDATED;
                return res.json({
                    msg: "password incorrect",
                    toast_mode,
                });
            }

            //jwt + localstorage
            let secretKey: string = "";
            if (process.env.SECRET_KEY) {
                secretKey = process.env.SECRET_KEY;
            }
            const token = jwt.sign({ email: email }, secretKey, {
                expiresIn: "1 days",
            });

            // localStorage.setItem("authToken", `Bearer ${token}`);
            res.cookie("authToken", `Bearer ${token}`, {
                expires: new Date(Date.now() + 60 * 60 * 60),
                httpOnly: true,
                secure: false,
                sameSite: "none",
            });

            toast_mode = SignInToastMode.USER_SIGNED_IN;
            return res.json({
                msg: "user signed in",
                token,
                validate,
                toast_mode,
            });
        } else {
            toast_mode = SignInToastMode.REQ_BODY_NOT_VALIDATED;
            return res.json({
                msg: "signin req body not validated",
                validate,
                toast_mode,
            });
        }
    } catch (error) {
        toast_mode = SignInToastMode.INTERNAL_SERVER_ERROR;
        return res.json({
            msg: "error while signing in user",
            toast_mode,
            error,
        });
    }
}

//no zod validation -> isAuthenticated is internal
export async function GetUser(req: any, res: any) {
    try {
        const email = req.email;
        const user = await userModel.findOne({ email: email });
        if (!user) {
            return res.json({
                msg: "user not found",
            });
        }

        return res.json({
            msg: "user found",
            user,
        });
    } catch (err) {
        return res.json({
            err,
        });
    }
}

export async function UpdateUser(req: any, res: any) {
    try {
        const validate = updateUserSchema.safeParse(req.body);

        if (!validate) {
            return res.json({
                msg: "update user req body not validated",
            });
        }

        const email = req.email;
        console.log("[update] req body", req.body);

        const user = await userModel.findOneAndUpdate(
            { email: email },
            req.body,
            {
                new: true,
            }
        );

        return res.json({
            msg: "user updated",
            user,
        });
    } catch (err) {
        return res.json({
            err,
        });
    }
}

export async function DeleteUser(req: any, res: any) {
    try {
        const email = req.email;
        const user = await userModel.findOneAndDelete({ email: email });

        return res.json({
            msg: "user deleted",
            user,
        });
    } catch (err) {
        return res.json({
            err,
        });
    }
}

export async function GetAllUsers(req: any, res: any) {
    try {
        const user = await userModel.find();

        return res.json({ msg: "all users", user });
    } catch (err) {
        return res.json({
            err,
        });
    }
}
