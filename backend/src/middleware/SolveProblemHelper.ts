import axios from "axios";
import { solveProblemHelperSchema, solveProblemType } from "@zeditor/common";
import { StatusCodes } from "@zeditor/common";

//input\n1\n2\n3\n4\n5\noutput\n82\ninput\n2\n3\n4\n5\noutput\n2\n
/*
    submissions: z.ZodArray<z.ZodObject<{
            source_code: z.ZodString;
            input: z.ZodString;
            expected_output: z.ZodString;
            language_id: z.ZodNumber;
        }
*/
export async function SolveProblemHelper(req: any, res: any, next: any) {
    try {
        console.log("reached here");
        const validate = solveProblemHelperSchema.safeParse(req.body);
        console.log("reached here 1");
        if (!validate) {
            return res.status(StatusCodes.REQ_BODY_NOT_VALIDATED).json({
                msg: "req body not validated",
            });
        }
        console.log("reached here 2");
        const { url, source_code, language_id } = req.body;
        console.log(url, source_code, language_id);
        const resp = await axios.post("http://localhost:5001/file/v1/read", {
            url,
        });
        console.log(resp.data);
        // const resp = { data: { file: "" } };
        console.log("reached here 3");

        const file = resp.data.file;
        console.log("file is: ", file);

        //parse file
        const submissions = [];
        const IO = file.split(/(?:input\n|output\n)/).slice(1);
        console.log("IO is: ", IO);
        for (let index = 0; index < IO.length; index++) {
            if (index % 2) continue;
            submissions.push({
                source_code,
                input: btoa(IO[index]),
                expected_output: btoa(IO[index + 1]),
                language_id,
            });
        }

        console.log("submissions", submissions);

        const solveProblemReqBody: solveProblemType = {
            submissions,
        };

        req.body = solveProblemReqBody;
        next();
    } catch (err) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            err,
        });
    }
}
