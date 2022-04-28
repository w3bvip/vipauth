import { VercelRequest, VercelResponse } from "@vercel/node";
import { nAuth } from "../../utils/auth/authdb";
import { allowCors } from "../../utils/cors/cors";
import { UserClass } from "../../utils/helpers/userClass";

const signup = async (req: VercelRequest, res: VercelResponse) => {
    const user = await UserClass(req, true);
    const register = await nAuth(user).register();
    res.status(register.status).json(register.data);
};

module.exports = allowCors(signup);
