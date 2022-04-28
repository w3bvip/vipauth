import { VercelRequest, VercelResponse } from "@vercel/node";
import { autoLogin } from "../../utils/auth/functions/autoLogin";
import { allowCors } from "../../utils/cors/cors";

import { db } from "../../utils/db";
const addProfilee = async (req: VercelRequest, res: VercelResponse) => {
    const profile: any = await autoLogin(req);
    // TODO check The profile for the requested team members
    if (req.body.users && profile.data.key && req.body.SelectedTeam) {
        const pdb = db(profile.data.SelectedTeam);
        let user = profile.data;
        user["users"] = req.body.users;
        const users = await pdb.put(user);
        users.SelectedTeam = req.body.SelectedTeam;
        res.status(profile.status).json(users);
    } else {
        res.status(200).json({ message: "somthing is not quite right" });
    }
};

module.exports = allowCors(addProfilee);
