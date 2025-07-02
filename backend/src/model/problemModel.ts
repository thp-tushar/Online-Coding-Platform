import mongoose from "mongoose";
import { problemSchemaObj } from "@zeditor/common";

export const problemSchema = new mongoose.Schema(problemSchemaObj);

export const problemModel = mongoose.model("problemModel", problemSchema);
