import { VercelRequest, VercelResponse } from "@vercel/node";
import { nAuth } from "../../utils/auth/authdb";
import { allowCors } from "../../utils/cors/cors";
import { UserClass } from "../../utils/helpers/userClass";

const login = async (req: VercelRequest, res: VercelResponse) => {
    const user = await UserClass(req, true);
    const login = await nAuth(user).login();
    res.status(login.status);
    res.json(login.data);
};

module.exports = allowCors(login);
