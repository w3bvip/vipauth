import { VercelRequest, VercelResponse } from "@vercel/node";
import { nAuth } from "../../utils/auth/authdb";
import { autoLogin } from "../../utils/auth/functions/autoLogin";
import { allowCors } from "../../utils/cors/cors";

const loginn = async (req: VercelRequest, res: VercelResponse) => {
    const profile: any = await autoLogin(req);
    if (
        profile.data.name === req.body.name &&
        profile.data.value === req.body.value
    )
        res.status(201).json(profile.data);
};

module.exports = allowCors(loginn);
