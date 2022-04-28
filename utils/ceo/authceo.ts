import { VercelRequest, VercelResponse } from "@vercel/node";
import { db } from "../db";
import { Ceo } from "../models/Ceo";
import { encryptFunction } from "../helpers/encrypt";
import { loginCeoFunction } from "./functions/loginceo";
import Base from "deta/dist/types/base";
import { registerCeoFunction } from "./functions/registerCeo";
import { validateCeoFunction } from "./functions/validateCeo";
import { Company } from "../models/Company";
import { registerCompanyFunction } from "./functions/registerCompany";

class AuthCeo {
    ceo: Ceo;
    company: Company;
    db: Base;
    constructor(ceo?: Ceo, company?: Company) {
        if (ceo) this.ceo = ceo;
        if (company) this.company = company;
        this.db = db();
    }

    encrypt = encryptFunction;

    // check if ceo's name and value are provided
    validate = () => validateCeoFunction(this.ceo);
    validateCompany = () => validateCeoFunction(this.company);
    // ceo sign-up
    register = () =>
        registerCeoFunction(this.validate, this.ceo, this.db, this.encrypt);

    // ceo sign-in
    login = () =>
        loginCeoFunction(this.validate, this.ceo, this.db, this.encrypt);
    // register company
    registerCompany = () =>
        registerCompanyFunction(
            this.validate,
            this.company,
            this.db,
            this.encrypt
        );
}

export const cAuth = (ceo) => new AuthCeo(ceo);
