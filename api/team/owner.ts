import { VercelRequest, VercelResponse } from "@vercel/node";

import { allowCors } from "../../utils/cors/cors";
import { db } from "../../utils/db";
import { autoLogin } from "../../utils/auth/functions/autoLogin";
import { User } from "../../utils/models/User";

import { UserClass } from "../../utils/helpers/userClass";
import { CompanyDb } from "../../utils/company/companydb";

const newcompany = async (req: VercelRequest, res: VercelResponse) => {
    // login
    const profile: any = await autoLogin(req);
    const maindb = db();

    const teams = profile.data.team;
    var teamsinfo = {};
    for (var team of teams) {
        const ownerprofile = await maindb.fetch({ company: team });
        const owner = ownerprofile.items[0].name as any;
        teamsinfo = { ...teamsinfo, [owner]: team };
    }
    res.status(201).json(teamsinfo);
};

module.exports = allowCors(newcompany);
