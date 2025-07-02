import { testCaseType } from "@zeditor/common";

export enum sampleTestCaseActionType {
    SET_IMAGE,
    SET_INPUT,
    SET_OUTPUT,
    SET_EXPLANATION,
}

export type sampleTestCaseAction = {
    type: sampleTestCaseActionType;
    payload: testCaseType;
};

export const sampleTestCaseInitialState: testCaseType = {
    input: "",
    output: "",
    explanation: "",
    image: "",
};

export const sampleTestCaseReducer = (
    state: testCaseType,
    action: sampleTestCaseAction
) => {
    switch (action.type) {
        case sampleTestCaseActionType.SET_EXPLANATION:
            return { ...state, explanation: action.payload.explanation };
        case sampleTestCaseActionType.SET_INPUT:
            return { ...state, input: action.payload.input };
        case sampleTestCaseActionType.SET_OUTPUT:
            return { ...state, output: action.payload.output };
        case sampleTestCaseActionType.SET_IMAGE:
            return { ...state, image: action.payload.image };
        default:
            return state;
    }
};
