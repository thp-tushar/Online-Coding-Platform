import { AlertColor } from "@mui/material";
import { useState } from "react";

export enum CreateProblemToastActionType {
    SET_VALUE,
}

export const CreateProblemToastReducer = () => {
    const [open, setOpen] = useState(false);

    type createProblemToast = {
        open?: boolean;
        setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
        content?: string;
        severity?: AlertColor;
    };

    type createProblemToastActionObject = {
        type?: CreateProblemToastActionType;
        payload?: createProblemToast;
    };
    type createProblemToastActionBoolean = boolean;

    type createProblemToastAction =
        | createProblemToastActionObject
        | createProblemToastActionBoolean;

    const createProblemToastInitialState: createProblemToast = {
        open: open,
        setOpen: setOpen,
        content: "",
        severity: "success",
    };

    const createProblemToastReducer = (
        state: createProblemToast,
        action: createProblemToastAction
    ) => {
        if (typeof action == "object") {
            switch (action.type) {
                case CreateProblemToastActionType.SET_VALUE:
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
        createProblemToastReducer,
        createProblemToastInitialState,
        CreateProblemToastActionType,
    };
};
