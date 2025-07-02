export type signUpState = {
    name?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
    profileImageUrl?: string;
};

export enum SignupActionType {
    SET_NAME,
    SET_EMAIL,
    SET_PASSWORD,
    SET_CONFIRM_PASSWORD,
    SET_PROFILE_IMAGE_URL,
}

export type signUpAction = {
    type: SignupActionType;
    payload?: signUpState;
};

export const signupInitialState: signUpState = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    profileImageUrl: "",
};

export const signupReducer = (state: signUpState, action: signUpAction) => {
    switch (action.type) {
        case SignupActionType.SET_NAME:
            return { ...state, name: action.payload?.name };
        case SignupActionType.SET_EMAIL:
            return { ...state, email: action.payload?.email };
        case SignupActionType.SET_PASSWORD:
            return { ...state, password: action.payload?.password };
        case SignupActionType.SET_CONFIRM_PASSWORD:
            return {
                ...state,
                confirmPassword: action.payload?.confirmPassword,
            };
        case SignupActionType.SET_PROFILE_IMAGE_URL:
            return {
                ...state,
                profileImageUrl: action.payload?.profileImageUrl,
            };
        default:
            return state;
    }
};
