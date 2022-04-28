import { VercelRequest, VercelResponse } from "@vercel/node";
import { nAuth } from "../../utils/auth/authdb";
import { autoLogin } from "../../utils/auth/functions/autoLogin";
import { CompanyDb } from "../../utils/company/companydb";
import { allowCors } from "../../utils/cors/cors";

const joinn = async (req: VercelRequest, res: VercelResponse) => {
    // login
    const profile: any = await autoLogin(req);
    const secret = req.body.secret;
    const companydbName = await CompanyDb.CompanyDbName(secret);
    const joinCompany = await CompanyDb.JoinSecretCompany(
        profile,
        companydbName
    );

    res.status(joinCompany.status);
    res.json(joinCompany.data);
};

module.exports = allowCors(joinn);
