import { VercelRequest, VercelResponse } from "@vercel/node";
import { autoLogin } from "../../utils/auth/functions/autoLogin";
import { allowCors } from "../../utils/cors/cors";

import { db } from "../../utils/db";
const getProfilee = async (req: VercelRequest, res: VercelResponse) => {
    const profile: any = await autoLogin(req);
    if (profile.data.team) {
        const udb = db(profile.data.team);
        let users = (await udb.fetch({ name: profile.data.name })) as any;
        res.json(users.items[0].users);
    } else {
        res.status(200).json({ message: "somthing is not quite right" });
    }
};

module.exports = allowCors(getProfilee);
