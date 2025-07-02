import cloudinary from "../config/cloudinary";
import got from "got";
import { readFileSchema } from "@zeditor/common";
import { StatusCodes } from "@zeditor/common";

export async function UploadFile(req: any, res: any) {
    try {
        console.log("[upload image] req.file", req.file);
        const b64 = Buffer.from(req.file.buffer).toString("base64");
        let dataURI = "data:" + req.file.mimetype + ";base64," + b64;
        const cldRes = await cloudinary.uploader.upload(dataURI, {
            resource_type: "auto",
        });
        res.json({
            msg: "image uploaded to cloudinary successfully",
            data: cldRes,
        });
    } catch (err) {
        return res.json({
            err,
        });
    }
}

//http://res.cloudinary.com/dfywed5sc/raw/upload/v1736534761/vnwj86hzsxal5uwjx6ci

export async function ReadFile(req: any, res: any) {
    try {
        const validate = readFileSchema.safeParse(req.body);

        if (!validate) {
            return res.status(StatusCodes.REQ_BODY_NOT_VALIDATED).json({
                msg: "[Read File] req body not validated",
            });
        }

        const { url } = req.body;
        console.log("[debug] url: ", url);
        const resp = await got(url);
        const file = resp.body;
        console.log("[debug] file: ", file)
        return res.status(StatusCodes.SUCCESS).json({
            file,
        });
    } catch (err) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            err,
        });
    }
}
