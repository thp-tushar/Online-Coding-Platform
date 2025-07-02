import dotenv from "dotenv";
import {
    createProblemSchema,
    updateProblemSchema,
    solveProblemSchema,
    problemType,
} from "@zeditor/common";
import {
    CREATE_PROBLEM,
    UPDATE_PROBLEM,
    SOLVE_PROBLEM,
} from "../common/constants";
import { StatusCodes } from "@zeditor/common";
import { problemModel } from "../model/problemModel";
import {
    Judge0Submit_GET,
    Judge0Submit_POST,
} from "../common/problem_execution/Judge0";
import { boolean, ZodError } from "zod";
import { Document } from "mongoose";
import { codeStatus } from "@zeditor/common";

dotenv.config();

export function isZodError(err: unknown): err is ZodError {
    return Boolean(
        err &&
            (err instanceof ZodError || (err as ZodError).name === "ZodError")
    );
}

export async function createProblem(req: any, res: any) {
    console.log("reached create problem");
    try {
        console.log("req.body", req.body);
        const validate = createProblemSchema.safeParse(req.body);

        if (!validate) {
            return res.status(StatusCodes.REQ_BODY_NOT_VALIDATED).json({
                msg: `${CREATE_PROBLEM} req body is not validated`,
            });
        }

        const problem = await problemModel.create(req.body);
        return res.status(StatusCodes.SUCCESS).json({
            msg: `${CREATE_PROBLEM} problem created successfully`,
            problem,
        });
    } catch (err) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            msg: `${CREATE_PROBLEM} problem not created`,
            err,
        });
    }
}

export async function updateProblem(req: any, res: any) {
    try {
        const validate = updateProblemSchema.safeParse(req.body);
        if (!validate) {
            return res.status(StatusCodes.REQ_BODY_NOT_VALIDATED).json({
                msg: `${UPDATE_PROBLEM} req body not validated`,
            });
        }

        const { problemId } = req.params;
        const problem = await problemModel.findByIdAndUpdate(
            problemId,
            req.body,
            {
                new: true,
            }
        );
        return res.status(StatusCodes.SUCCESS).json({
            msg: "problem updated successfully",
            problem,
        });
    } catch (err) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            msg: "problem updation failed",
            err,
        });
    }
}

export async function deleteProblem(req: any, res: any) {
    try {
        const { problemId } = req.params;

        const problem = await problemModel.findByIdAndDelete(problemId);
        return res.status(StatusCodes.SUCCESS).json({
            msg: "problem deleted successfully",
            problem,
        });
    } catch (err) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            msg: "problem deletion failed",
            err,
        });
    }
}

export async function getAllProblems(req: any, res: any) {
    try {
        const problems: Document<problemType>[] = await problemModel.find();
        return res.status(StatusCodes.SUCCESS).json({
            msg: "all problems",
            problems,
        });
    } catch (err) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            msg: "not able to get all problems",
        });
    }
}

export async function getProblem(req: any, res: any) {
    console.log("getProblem");
    console.log("entered");
    try {
        const { problemId } = req.params;
        console.log(problemId);

        const problem = await problemModel.findById(problemId);
        console.log("entered2");
        return res.status(StatusCodes.SUCCESS).json({
            msg: "problem got",
            problem,
        });
    } catch (err) {
        console.log("entered3");
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            msg: "not able to get problem",
            err,
        });
    }
}

// source_code
// stdin
// expected_output
// language_id
export async function solveProblem(req: any, res: any) {
    try {
        console.log("reached here in solveProblem", req.body);
        const validate = solveProblemSchema.safeParse(req.body);
        console.log("validate is: ", validate);
        if (!validate.success) {
            return res.status(StatusCodes.REQ_BODY_NOT_VALIDATED).json({
                msg: `${SOLVE_PROBLEM} req body not validated`,
            });
        }

        const submissionTokens = await Judge0Submit_POST(req.body);
        console.log("submissionToken", submissionTokens);
        const tokens = [];
        if (submissionTokens) {
            for (let i = 0; i < submissionTokens?.length; i++) {
                tokens.push(submissionTokens[i].token);
            }
        }
        let submissionResponse = await Judge0Submit_GET(tokens);
        let retry: boolean = true;
        while (retry) {
            let loop: boolean = true;
            console.log(
                "submissionResponse.submissions",
                submissionResponse.submissions
            );
            for (let i = 0; i < submissionResponse.submissions.length; i++) {
                console.log(
                    "submissionResponse.submissions[i].status.id",
                    submissionResponse.submissions[i].status.id
                );
                if (
                    submissionResponse.submissions[i].status.id === 1 ||
                    submissionResponse.submissions[i].status.id === 2
                ) {
                    submissionResponse = await Judge0Submit_GET(tokens);
                    loop = false;
                }
            }
            if (loop) retry = false;

            console.log("submissionResponse", submissionResponse);
        }

        console.log("final submissionResponse", submissionResponse);
        if (!submissionResponse) {
            console.log("reached hereeeee zaid")
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                msg: "not able to submit",
            });
        }

        console.log("reached hereeeee zaid boyyy")
        return res.status(StatusCodes.SUCCESS).json({
            msg: "problem submitted",
            submissionResponse,
        });
    } catch (err) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            msg: "not able to submit",
            err,
        });
    }
}
