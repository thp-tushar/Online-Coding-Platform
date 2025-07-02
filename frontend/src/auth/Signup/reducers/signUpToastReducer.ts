import { AlertColor } from "@mui/material";
import { useState } from "react";

export enum SignupToastActionType {
    SET_VALUE,
}

export const SignupToastReducer = () => {
    const [open, setOpen] = useState(false);

    type signUpToast = {
        open?: boolean;
        setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
        content?: string;
        severity?: AlertColor;
    };

    type signupToastActionObject = {
        type?: SignupToastActionType;
        payload?: signUpToast;
    };
    type signupToastActionBoolean = boolean;

    type signUpToastAction = signupToastActionObject | signupToastActionBoolean;

    const signupToastInitialState: signUpToast = {
        open: open,
        setOpen: setOpen,
        content: "",
        severity: "success",
    };

    const signupToastReducer = (
        state: signUpToast,
        action: signUpToastAction
    ) => {
        if (typeof action == "object") {
            switch (action.type) {
                case SignupToastActionType.SET_VALUE:
                    return {
                        ...state,
                        open: action.payload?.open,
                        severity: action.payload?.severity,
                        content: action.payload?.content,
                    };
                default:
                    return state;
            }
        } else {
            return { ...state, open: action };
        }
    };

    return {
        signupToastReducer,
        signupToastInitialState,
        SignupToastActionType,
    };
};
