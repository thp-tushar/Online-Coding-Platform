import jwt, { JwtPayload } from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const SECRET_KEY = process.env.SECRET_KEY || "";

export function IsAuthenticated(req: any, res: any, next: any) {
    try {
        const { authorization } = req.headers;
        console.log("req headers", req.headers);
        console.log("authHeader: ", authorization);

        if (!authorization) {
            return res.json({
                msg: "user not authorized",
            });
        }

        const tokens = authorization.split(" ");
        if (tokens.length !== 2) {
            return res.json({
                msg: "bad auth token sent",
            });
        }

        const authToken = tokens[1];

        const verifiedResult: any = jwt.verify(authToken, SECRET_KEY);
        console.log("verified result", verifiedResult);
        if (!verifiedResult) {
            return res.json({
                msg: "bad auth token sent",
            });
        }

        //TODO req.email = (verifiedResult.email)
        req.email = verifiedResult.email;
        next();
    } catch (err) {
        return res.json({
            msg: "bad auth token sent",
            err,
        });
    }
}
