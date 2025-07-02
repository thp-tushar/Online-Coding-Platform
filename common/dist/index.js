"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.codeStatus = exports.problemSchemaObj = exports.StatusCodes = exports.SignInToastMode = exports.solveProblemHelperSchema = exports.readFileSchema = exports.solveProblemSchema = exports.updateProblemSchema = exports.createProblemSchema = exports.Difficulty = exports.testCaseSchema = exports.updateUserSchema = exports.signInSchema = exports.signUpSchema = void 0;
const zod_1 = __importDefault(require("zod"));
const mongoose_1 = __importDefault(require("mongoose"));
exports.signUpSchema = zod_1.default.object({
    name: zod_1.default.string().min(2).max(20),
    email: zod_1.default.string().email().min(2).max(100),
    password: zod_1.default.string().min(2).max(20),
    confirmPassword: zod_1.default.string().min(2).max(20),
    profileImage: zod_1.default.string().optional(),
});
exports.signInSchema = zod_1.default.object({
    email: zod_1.default.string().email().min(2).max(100),
    password: zod_1.default.string().min(2).max(20),
});
exports.updateUserSchema = zod_1.default.object({
    name: zod_1.default.string().min(2).max(20).optional(),
    email: zod_1.default.string().email().min(2).max(20).optional(),
    password: zod_1.default.string().min(2).max(20).optional(),
    profileImage: zod_1.default.string().optional(),
});
exports.testCaseSchema = zod_1.default.object({
    image: zod_1.default.string().optional(),
    input: zod_1.default.string(),
    output: zod_1.default.string(),
    explanation: zod_1.default.string(),
});
exports.Difficulty = zod_1.default.enum(["EASY", "MEDIUM", "HARD"]);
exports.createProblemSchema = zod_1.default.object({
    title: zod_1.default.string(),
    description: zod_1.default.string(),
    problemImage: zod_1.default.string().optional(),
    sample_tc: zod_1.default.array(exports.testCaseSchema),
    final_tc: zod_1.default.string().optional(),
    constraints: zod_1.default.array(zod_1.default.string()).optional(),
    topics: zod_1.default.array(zod_1.default.string()).optional(),
    difficulty: exports.Difficulty,
});
exports.updateProblemSchema = zod_1.default.object({
    title: zod_1.default.string().optional(),
    description: zod_1.default.string().optional(),
    problemImage: zod_1.default.string().optional(),
    sample_tc: zod_1.default.array(exports.testCaseSchema).optional(),
    final_tc: zod_1.default.string().optional(),
    constraints: zod_1.default.array(zod_1.default.string()).optional(),
    topics: zod_1.default.array(zod_1.default.string()).optional(),
    difficulty: zod_1.default.enum(["EASY", "MEDIUM", "HARD"]).optional(),
});
exports.solveProblemSchema = zod_1.default.object({
    submissions: zod_1.default.array(zod_1.default.object({
        source_code: zod_1.default.string().optional(),
        stdin: zod_1.default.string().optional(),
        expected_output: zod_1.default.string().optional(),
        language_id: zod_1.default.number().optional(),
    })),
});
exports.readFileSchema = zod_1.default.object({
    url: zod_1.default.string(),
});
exports.solveProblemHelperSchema = zod_1.default.object({
    url: zod_1.default.string(),
    source_code: zod_1.default.string(),
    language_id: zod_1.default.number(),
});
var SignInToastMode;
(function (SignInToastMode) {
    SignInToastMode[SignInToastMode["REQ_BODY_NOT_VALIDATED"] = 0] = "REQ_BODY_NOT_VALIDATED";
    SignInToastMode[SignInToastMode["USER_NOT_FOUND"] = 1] = "USER_NOT_FOUND";
    SignInToastMode[SignInToastMode["USER_SIGNED_IN"] = 2] = "USER_SIGNED_IN";
    SignInToastMode[SignInToastMode["PASSWORD_NOT_VALIDATED"] = 3] = "PASSWORD_NOT_VALIDATED";
    SignInToastMode[SignInToastMode["INTERNAL_SERVER_ERROR"] = 4] = "INTERNAL_SERVER_ERROR";
})(SignInToastMode || (exports.SignInToastMode = SignInToastMode = {}));
var StatusCodes;
(function (StatusCodes) {
    StatusCodes[StatusCodes["REQ_BODY_NOT_VALIDATED"] = 501] = "REQ_BODY_NOT_VALIDATED";
    StatusCodes[StatusCodes["INTERNAL_SERVER_ERROR"] = 500] = "INTERNAL_SERVER_ERROR";
    StatusCodes[StatusCodes["SUCCESS"] = 200] = "SUCCESS";
})(StatusCodes || (exports.StatusCodes = StatusCodes = {}));
exports.problemSchemaObj = {
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    problemImage: {
        type: String,
    },
    //doubt
    sample_tc: {
        type: [
            new mongoose_1.default.Schema({
                image: {
                    type: String,
                },
                input: {
                    type: String,
                    required: true,
                },
                output: {
                    type: String,
                    required: true,
                },
                explanation: {
                    type: String,
                },
            }),
        ],
        required: true,
    },
    final_tc: {
        type: String,
    },
    constraints: {
        type: [String],
    },
    topics: {
        type: [String],
    },
    difficulty: {
        type: String,
    },
    solution: {
        type: String,
    },
};
exports.codeStatus = [
    {
        id: 1,
        description: "In Queue",
    },
    {
        id: 2,
        description: "Processing",
    },
    {
        id: 3,
        description: "Accepted",
    },
    {
        id: 4,
        description: "Wrong Answer",
    },
    {
        id: 5,
        description: "Time Limit Exceeded",
    },
    {
        id: 6,
        description: "Compilation Error",
    },
    {
        id: 7,
        description: "Runtime Error (SIGSEGV)",
    },
    {
        id: 8,
        description: "Runtime Error (SIGXFSZ)",
    },
    {
        id: 9,
        description: "Runtime Error (SIGFPE)",
    },
    {
        id: 10,
        description: "Runtime Error (SIGABRT)",
    },
    {
        id: 11,
        description: "Runtime Error (NZEC)",
    },
    {
        id: 12,
        description: "Runtime Error (Other)",
    },
    {
        id: 13,
        description: "Internal Error",
    },
    {
        id: 14,
        description: "Exec Format Error",
    },
];
