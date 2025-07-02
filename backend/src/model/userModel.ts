import mongoose from "mongoose";
import isEmail from "validator/lib/isEmail";
import bcrypt from "bcrypt";

export enum Roles {
    Admin,
    Solver,
    Creator,
}

export interface Role {
    type: string;
    enum: string[];
    default: string;
}

export interface Problem {
    type: mongoose.ObjectId;
    ref: string;
    unique: [boolean, string];
}

export interface User {
    name: string;
    email: string;
    password: string;
    profileImage?: string;
    problems_solved?: Problem[];
    role: Role;
    isValidPassword: (password: string) => {};
}

export const userSchema = new mongoose.Schema<User>({
    name: {
        type: String,
        required: [true, "name is required"],
        min: 2,
        max: 20,
    },
    email: {
        type: String,
        required: [true, "email is required"],
        unique: [true, "email should be unique"],
        validate: [isEmail, "email is not valid"],
        min: 2,
        max: 100,
    },
    password: {
        type: String,
        required: [true, "password is required"],
        min: 2,
        max: 20,
    },
    profileImage: {
        type: String,
    },
    problems_solved: {
        type: [
            {
                type: mongoose.Types.ObjectId,
                ref: "problemModel",
                unique: [true, "problem not unique solved by user"],
            },
        ],
        default: [],
    },
    role: {
        type: String,
        enum: ["Admin", "Solver", "Creator"],
        required: [true, "role is required"],
        default: "Admin",
    },
});

userSchema.pre("save", async function (next) {
    try {
        if (!this.isModified("password")) return next();

        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);

        next();
    } catch (error) {
        console.log("error while saving to user table", error);
    }
});

userSchema.methods.isValidPassword = async function (password: string) {
    try {
        console.log("[bcrypt] validating password");
        console.log(password, this.password);
        return await bcrypt.compare(password, this.password);
    } catch (error) {
        console.log("error while validating password", error);
    }
};

//TODO: auth token common function
userSchema.methods.saveAuthToken = function () {};

export const userModel = mongoose.model<User>("userModel", userSchema);
