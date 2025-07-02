import express from "express";
import UploadFileHelper from "../middleware/UploadFileHelper";
import { UploadFile, ReadFile } from "../controller/fileController";
import { IsAuthenticated } from "../middleware/IsAuthenticated";

const fileRouter = express.Router();

fileRouter.route("/read").post(ReadFile);
fileRouter.use(UploadFileHelper);
fileRouter.route("/upload").post(UploadFile);

export default fileRouter;
