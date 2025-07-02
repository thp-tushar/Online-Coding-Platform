import { Button } from "@mui/material/";
import { Link, useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { CloudUpload } from "@mui/icons-material";
import { useReducer, useState } from "react";
import axios from "axios";
import { Toast } from "../../../common/Toast";
import {
    SignupActionType,
    signupInitialState,
    signupReducer,
} from "../reducers/signUpReducer";
import {
    SignupToastActionType,
    SignupToastReducer,
} from "../reducers/signUpToastReducer";
import Cookies from "js-cookie";
import { useFile } from "../../../common/hooks/useFile";

const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
});

type Field = {
    label: string;
    type: string;
    actionType: SignupActionType;
    stateField: string;
};

export const Signup: React.FC = () => {
    const [uploadFile] = useFile();

    const [signupState, signupStateDispatch] = useReducer(
        signupReducer,
        signupInitialState
    );

    const [signupToastState, signupToastStateDispatch] = useReducer(
        SignupToastReducer().signupToastReducer,
        SignupToastReducer().signupToastInitialState
    );

    const navigate = useNavigate();

    //TODO: make these 2 usestates in reducer
    const [selectImageToast, setSelectImageToast] = useState(false);
    const [uploadImageToast, setUploadImageToast] = useState(false);

    const [uploadImageLoading, setUploadImageLoading] = useState(false);
    const [profileImage, setProfileImage] = useState(null);

    //rate limiting
    const [rateLimit, setRateLimit] = useState(true);

    const fields: Field[] = [
        {
            label: "Name",
            type: "text",
            actionType: SignupActionType.SET_NAME,
            stateField: "name",
        },
        {
            label: "Email",
            type: "email",
            actionType: SignupActionType.SET_EMAIL,
            stateField: "email",
        },
        {
            label: "Password",
            type: "password",
            actionType: SignupActionType.SET_PASSWORD,
            stateField: "password",
        },
        {
            label: "Confirm Password",
            type: "password",
            actionType: SignupActionType.SET_CONFIRM_PASSWORD,
            stateField: "confirmPassword",
        },
    ];

    function handleImageInputChange(e: React.ChangeEvent<HTMLInputElement>) {
        if (e.target && e.target.files != null) {
            console.log("[image] set file");
            setRateLimit(true);
            setProfileImage(
                //@ts-ignore
                e.target.files[0]
            );
            setSelectImageToast(true);
        }
    }

    function handleImageInputClick(e: React.MouseEvent<HTMLInputElement>) {
        (e.target as HTMLInputElement).value = "";
    }

    async function handleImageUpload() {
        if (!(profileImage && rateLimit)) {
            return;
        }

        setUploadImageLoading(true);
        setRateLimit(false);
        const url = await uploadFile(profileImage);
        setUploadImageToast(true);
        setUploadImageLoading(false);
        signupStateDispatch({
            type: SignupActionType.SET_PROFILE_IMAGE_URL,
            payload: { profileImageUrl: url },
        });
    }

    async function handleSignUp() {
        const res = await axios.post(
            "http://localhost:5001/user/v1/signup",
            signupState
        );
        console.log("res: ", res);
        console.log("res.data: ", res.data);

        //TODO: mongodb not able to store data -> 404, error
        if (res.data.validate) {
            if (!res.data.validate.success) {
                signupToastStateDispatch({
                    type: SignupToastActionType.SET_VALUE,
                    payload: {
                        open: true,
                        severity: "warning",
                        content: "signup validation failed",
                    },
                });
            } else {
                signupToastStateDispatch({
                    type: SignupToastActionType.SET_VALUE,
                    payload: {
                        open: true,
                        severity: "success",
                        content: "user signed up successfully",
                    },
                });
                //TODO: set cookie from backend
                Cookies.set("authToken", `Bearer ${res.data.token}`);
                navigate("/");
            }
        }
    }

    return (
        <>
            <div className="w-screen h-screen flex h-screen">
                <div className="h-[90%] mt-10 w-1/2 border border-2 mx-auto pt-10">
                    <div className="text-xl text-center mt-3">SignUp</div>
                    {/* text-center -> alternate */}
                    <div className="mt-10 text-center">
                        {fields.map((field, index) => (
                            <div key={index} className="mb-10">
                                <label htmlFor={`yay ${index}`}>
                                    {field.label}
                                </label>
                                <input
                                    onChange={(
                                        e: React.ChangeEvent<HTMLInputElement>
                                    ) => {
                                        return signupStateDispatch({
                                            type: field.actionType,
                                            payload: {
                                                [field.stateField]:
                                                    e.target.value,
                                            },
                                        });
                                    }}
                                    id={`yay ${index}`}
                                    className="w-1/2 border-2"
                                    type={field.type}
                                />
                            </div>
                        ))}
                        <div className="mb-10 flex w-full justify-center">
                            <div className="mr-14">
                                <Button
                                    component="label"
                                    role={undefined}
                                    variant="outlined"
                                >
                                    {profileImage
                                        ? "Change Profile Image"
                                        : "Select Profile Image"}
                                    <VisuallyHiddenInput
                                        type="file"
                                        onClick={handleImageInputClick}
                                        onChange={handleImageInputChange}
                                    />
                                </Button>
                                <Toast
                                    open={selectImageToast}
                                    //@ts-ignore
                                    setOpen={setSelectImageToast}
                                    severity="success"
                                    variant="filled"
                                    content="profile image selected"
                                    horizontal="center"
                                    vertical="top"
                                />
                            </div>
                            <div>
                                <Button
                                    variant="outlined"
                                    startIcon={<CloudUpload />}
                                    onClick={handleImageUpload}
                                >
                                    {uploadImageLoading
                                        ? "Uploading..."
                                        : "Upload"}
                                </Button>
                                <Toast
                                    open={uploadImageToast}
                                    //@ts-ignore
                                    setOpen={setUploadImageToast}
                                    severity="success"
                                    variant="filled"
                                    content="image uploaded"
                                    horizontal="center"
                                    vertical="top"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-center mb-10">
                        <Button variant="outlined" onClick={handleSignUp}>
                            Sign Up
                        </Button>
                    </div>
                    <div className="flex justify-center">
                        <div className="mr-2">Already have an account ?</div>
                        <div>
                            <Link to="/signin" className="underline">
                                Signin
                            </Link>
                        </div>
                    </div>
                </div>
                <Toast
                    open={signupToastState.open!}
                    //@ts-ignore
                    setOpen={signupToastStateDispatch}
                    severity={signupToastState.severity!}
                    variant="filled"
                    content={signupToastState.content}
                    horizontal="center"
                    vertical="top"
                />
            </div>
        </>
    );
};
