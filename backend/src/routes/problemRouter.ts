import express from "express";
import {
    createProblem,
    updateProblem,
    deleteProblem,
    getAllProblems,
    getProblem,
    solveProblem,
} from "../controller/problemController";
import { IsAuthenticated } from "../middleware/IsAuthenticated";
import { SolveProblemHelper } from "../middleware/SolveProblemHelper";

const problemRouter = express.Router();

problemRouter.use(IsAuthenticated);
problemRouter.route("/createProblem").post(createProblem);
problemRouter.route("/updateProblem/:problemId").post(updateProblem);
problemRouter.route("/deleteProblem/:problemId").delete(deleteProblem);
problemRouter.route("/allProblems").get(getAllProblems);
problemRouter.route("/problem/:problemId").get(getProblem);

problemRouter.use((req, res, next) => {
    if (req.query.file) {
        console.log("reached in the middleware");
        SolveProblemHelper(req, res, next).then(next);
    } else {
        next();
    }
});
problemRouter.route("/solveProblem").post(solveProblem);

export default problemRouter;
