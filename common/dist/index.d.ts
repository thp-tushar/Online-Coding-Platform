import z from "zod";
import mongoose, { InferRawDocType } from "mongoose";
export declare const signUpSchema: z.ZodObject<{
    name: z.ZodString;
    email: z.ZodString;
    password: z.ZodString;
    confirmPassword: z.ZodString;
    profileImage: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    profileImage?: string | undefined;
}, {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    profileImage?: string | undefined;
}>;
export type signUpType = z.infer<typeof signUpSchema>;
export declare const signInSchema: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    email: string;
    password: string;
}, {
    email: string;
    password: string;
}>;
export type signInType = z.infer<typeof signInSchema>;
export declare const updateUserSchema: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    email: z.ZodOptional<z.ZodString>;
    password: z.ZodOptional<z.ZodString>;
    profileImage: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    name?: string | undefined;
    email?: string | undefined;
    password?: string | undefined;
    profileImage?: string | undefined;
}, {
    name?: string | undefined;
    email?: string | undefined;
    password?: string | undefined;
    profileImage?: string | undefined;
}>;
export type updateUserType = z.infer<typeof updateUserSchema>;
export declare const testCaseSchema: z.ZodObject<{
    image: z.ZodOptional<z.ZodString>;
    input: z.ZodString;
    output: z.ZodString;
    explanation: z.ZodString;
}, "strip", z.ZodTypeAny, {
    input: string;
    output: string;
    explanation: string;
    image?: string | undefined;
}, {
    input: string;
    output: string;
    explanation: string;
    image?: string | undefined;
}>;
export type testCaseType = z.infer<typeof testCaseSchema>;
export declare const Difficulty: z.ZodEnum<["EASY", "MEDIUM", "HARD"]>;
export type DifficultyType = z.infer<typeof Difficulty>;
export declare const createProblemSchema: z.ZodObject<{
    title: z.ZodString;
    description: z.ZodString;
    problemImage: z.ZodOptional<z.ZodString>;
    sample_tc: z.ZodArray<z.ZodObject<{
        image: z.ZodOptional<z.ZodString>;
        input: z.ZodString;
        output: z.ZodString;
        explanation: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        input: string;
        output: string;
        explanation: string;
        image?: string | undefined;
    }, {
        input: string;
        output: string;
        explanation: string;
        image?: string | undefined;
    }>, "many">;
    final_tc: z.ZodOptional<z.ZodString>;
    constraints: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    topics: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    difficulty: z.ZodEnum<["EASY", "MEDIUM", "HARD"]>;
}, "strip", z.ZodTypeAny, {
    title: string;
    description: string;
    sample_tc: {
        input: string;
        output: string;
        explanation: string;
        image?: string | undefined;
    }[];
    difficulty: "EASY" | "MEDIUM" | "HARD";
    problemImage?: string | undefined;
    final_tc?: string | undefined;
    constraints?: string[] | undefined;
    topics?: string[] | undefined;
}, {
    title: string;
    description: string;
    sample_tc: {
        input: string;
        output: string;
        explanation: string;
        image?: string | undefined;
    }[];
    difficulty: "EASY" | "MEDIUM" | "HARD";
    problemImage?: string | undefined;
    final_tc?: string | undefined;
    constraints?: string[] | undefined;
    topics?: string[] | undefined;
}>;
export type createProblemType = z.infer<typeof createProblemSchema>;
export declare const updateProblemSchema: z.ZodObject<{
    title: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodString>;
    problemImage: z.ZodOptional<z.ZodString>;
    sample_tc: z.ZodOptional<z.ZodArray<z.ZodObject<{
        image: z.ZodOptional<z.ZodString>;
        input: z.ZodString;
        output: z.ZodString;
        explanation: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        input: string;
        output: string;
        explanation: string;
        image?: string | undefined;
    }, {
        input: string;
        output: string;
        explanation: string;
        image?: string | undefined;
    }>, "many">>;
    final_tc: z.ZodOptional<z.ZodString>;
    constraints: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    topics: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    difficulty: z.ZodOptional<z.ZodEnum<["EASY", "MEDIUM", "HARD"]>>;
}, "strip", z.ZodTypeAny, {
    title?: string | undefined;
    description?: string | undefined;
    problemImage?: string | undefined;
    sample_tc?: {
        input: string;
        output: string;
        explanation: string;
        image?: string | undefined;
    }[] | undefined;
    final_tc?: string | undefined;
    constraints?: string[] | undefined;
    topics?: string[] | undefined;
    difficulty?: "EASY" | "MEDIUM" | "HARD" | undefined;
}, {
    title?: string | undefined;
    description?: string | undefined;
    problemImage?: string | undefined;
    sample_tc?: {
        input: string;
        output: string;
        explanation: string;
        image?: string | undefined;
    }[] | undefined;
    final_tc?: string | undefined;
    constraints?: string[] | undefined;
    topics?: string[] | undefined;
    difficulty?: "EASY" | "MEDIUM" | "HARD" | undefined;
}>;
export type updateProblemType = z.infer<typeof updateProblemSchema>;
export declare const solveProblemSchema: z.ZodObject<{
    submissions: z.ZodArray<z.ZodObject<{
        source_code: z.ZodOptional<z.ZodString>;
        stdin: z.ZodOptional<z.ZodString>;
        expected_output: z.ZodOptional<z.ZodString>;
        language_id: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        source_code?: string | undefined;
        stdin?: string | undefined;
        expected_output?: string | undefined;
        language_id?: number | undefined;
    }, {
        source_code?: string | undefined;
        stdin?: string | undefined;
        expected_output?: string | undefined;
        language_id?: number | undefined;
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    submissions: {
        source_code?: string | undefined;
        stdin?: string | undefined;
        expected_output?: string | undefined;
        language_id?: number | undefined;
    }[];
}, {
    submissions: {
        source_code?: string | undefined;
        stdin?: string | undefined;
        expected_output?: string | undefined;
        language_id?: number | undefined;
    }[];
}>;
export type solveProblemType = z.infer<typeof solveProblemSchema>;
export declare const readFileSchema: z.ZodObject<{
    url: z.ZodString;
}, "strip", z.ZodTypeAny, {
    url: string;
}, {
    url: string;
}>;
export type readFileType = z.infer<typeof readFileSchema>;
export declare const solveProblemHelperSchema: z.ZodObject<{
    url: z.ZodString;
    source_code: z.ZodString;
    language_id: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    source_code: string;
    language_id: number;
    url: string;
}, {
    source_code: string;
    language_id: number;
    url: string;
}>;
export type solveProblemHelperType = z.infer<typeof solveProblemHelperSchema>;
export declare enum SignInToastMode {
    REQ_BODY_NOT_VALIDATED = 0,
    USER_NOT_FOUND = 1,
    USER_SIGNED_IN = 2,
    PASSWORD_NOT_VALIDATED = 3,
    INTERNAL_SERVER_ERROR = 4
}
export declare enum StatusCodes {
    REQ_BODY_NOT_VALIDATED = 501,
    INTERNAL_SERVER_ERROR = 500,
    SUCCESS = 200
}
export declare const problemSchemaObj: {
    readonly title: {
        readonly type: StringConstructor;
        readonly required: true;
    };
    readonly description: {
        readonly type: StringConstructor;
        readonly required: true;
    };
    readonly problemImage: {
        readonly type: StringConstructor;
    };
    readonly sample_tc: {
        readonly type: readonly [mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
            input: string;
            output: string;
            image?: string | null | undefined;
            explanation?: string | null | undefined;
        }, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
            input: string;
            output: string;
            image?: string | null | undefined;
            explanation?: string | null | undefined;
        }>> & mongoose.FlatRecord<{
            input: string;
            output: string;
            image?: string | null | undefined;
            explanation?: string | null | undefined;
        }> & {
            _id: mongoose.Types.ObjectId;
        } & {
            __v: number;
        }>];
        readonly required: true;
    };
    readonly final_tc: {
        readonly type: StringConstructor;
    };
    readonly constraints: {
        readonly type: readonly [StringConstructor];
    };
    readonly topics: {
        readonly type: readonly [StringConstructor];
    };
    readonly difficulty: {
        readonly type: StringConstructor;
    };
    readonly solution: {
        readonly type: StringConstructor;
    };
};
export type problemType = InferRawDocType<typeof problemSchemaObj>;
export declare const codeStatus: {
    id: number;
    description: string;
}[];
