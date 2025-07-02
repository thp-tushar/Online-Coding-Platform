import { AlertColor } from "@mui/material";
import { useState } from "react";

export enum SigninToastActionType {
    SET_VALUE,
}

export const SigninToastReducer = () => {
    const [open, setOpen] = useState(false);

    type signinToast = {
        open?: boolean;
        setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
        content?: string;
        severity?: AlertColor;
    };

    type signinToastActionObject = {
        type?: SigninToastActionType;
        payload?: signinToast;
    };
    type signinToastActionBoolean = boolean;

    type signinToastAction = signinToastActionObject | signinToastActionBoolean;

    const signinToastInitialState: signinToast = {
        open: open,
        setOpen: setOpen,
        content: "",
        severity: "success",
    };

    const signinToastReducer = (
        state: signinToast,
        action: signinToastAction
    ) => {
        if (typeof action == "object") {
            switch (action.type) {
                case SigninToastActionType.SET_VALUE:
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
        signinToastReducer,
        signinToastInitialState,
        SigninToastActionType,
    };
};
