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
export type createProblemFileType = {
    problemImage?: File | null;
    final_tc?: File | null;
};

export enum createProblemFileActionType {
    SET_PROBLEM_IMAGE,
    SET_FINAL_TC,
    SET_PROBLEM_SOLUTION,
}

export type createProblemFileAction = {
    type: createProblemFileActionType;
    payload: createProblemFileType;
};

export const createProblemFileInitialState: createProblemFileType = {
    problemImage: null,
    final_tc: null,
};

export const createProblemFileReducer = (
    state: createProblemFileType,
    action: createProblemFileAction
) => {
    switch (action.type) {
        case createProblemFileActionType.SET_PROBLEM_IMAGE:
            return { ...state, problemImage: action.payload.problemImage };
        case createProblemFileActionType.SET_FINAL_TC:
            return { ...state, final_tc: action.payload.final_tc };
        default:
            return state;
    }
};
