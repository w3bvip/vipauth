import { VercelRequest, VercelResponse } from "@vercel/node";

import { allowCors } from "../../utils/cors/cors";
import { db } from "../../utils/db";
import { autoLogin } from "../../utils/auth/functions/autoLogin";
import { User } from "../../utils/models/User";

import { UserClass } from "../../utils/helpers/userClass";
import { CompanyDb } from "../../utils/company/companydb";

const newcompanyy = async (req: VercelRequest, res: VercelResponse) => {
    // login
    const profile: any = await autoLogin(req);
    // verify a name is provided for the company
    if (req.body.companyName !== null || !undefined) {
        // edit name
        const companyName =
            req.body.companyName +
            (Math.random() * 20).toString(15).replace(/[.|&;$%@"<>()+,]/g, "");
        // register editaed name and put user in the first row as a member
        const newcompany = await CompanyDb.AddNewCompany(profile, companyName);
        res.status(newcompany.status).json(newcompany.data);
    }
};
module.exports = allowCors(newcompanyy);
