/**
export const updateProblemSchema = z.object({
    title: z.string().optional(),
    description: z.string().optional(),
    problemImage: z.string().optional(),
    sample_tc: z.array(testCaseSchema).optional(),
    final_tc: z.string().optional(),
    constraints: z.array(z.string()).optional(),
    topics: z.array(z.string()).optional(),
    difficulty: z.enum(["EASY", "MEDIUM", "HARD"]).optional(),
});

export const testCaseSchema = z.object({
    image: z.string().optional(),
    input: z.string(),
    output: z.string(),
    explanation: z.string(),
});
 */

import { createProblemType } from "@zeditor/common";

export enum createProblemActionType {
    SET_TITLE,
    SET_DESCRIPTION,
    SET_PROBLEM_IMAGE,
    SET_SAMPLE_TC,
    SET_FINAL_TC,
    SET_CONSTRAINTS,
    SET_TOPICS,
    SET_DIFFICULTY,
}

export type createProblemAction = {
    type: createProblemActionType;
    payload: createProblemType;
};

export const createProblemInitialState: createProblemType = {
    title: "",
    description: "",
    problemImage: "",
    sample_tc: [],
    final_tc: "",
    constraints: [],
    topics: [],
    difficulty: "EASY",
};

export const createProblemReducer = (
    state: createProblemType,
    action: createProblemAction
) => {
    switch (action.type) {
        case createProblemActionType.SET_TITLE:
            return { ...state, title: action.payload.title };
        case createProblemActionType.SET_DESCRIPTION:
            return { ...state, description: action.payload.description };
        case createProblemActionType.SET_PROBLEM_IMAGE:
            return { ...state, problemImage: action.payload.problemImage };
        case createProblemActionType.SET_SAMPLE_TC:
            return {
                ...state,
                sample_tc: action.payload.sample_tc,
            };
        case createProblemActionType.SET_FINAL_TC:
            return {
                ...state,
                final_tc: action.payload.final_tc,
            };
        case createProblemActionType.SET_CONSTRAINTS:
            return {
                ...state,
                constraints: action.payload.constraints,
            };
        case createProblemActionType.SET_DIFFICULTY:
            return {
                ...state,
                difficulty: action.payload.difficulty,
            };
        case createProblemActionType.SET_TOPICS:
            return {
                ...state,
                topics: action.payload.topics,
            };
        default:
            return state;
    }
};
