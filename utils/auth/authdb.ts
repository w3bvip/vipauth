import { VercelRequest, VercelResponse } from "@vercel/node";
import { db } from "../db";
import { User } from "../models/User";
import { loginFunction } from "./functions/login";
import { validateFunction } from "./functions/validateUser";
import Base from "deta/dist/types/base";
import { registerFunction } from "./functions/register";
import { encryptFunction } from "../encrypt";
import { UserClass } from "../helpers/userClass";

class Auth {
    user: User;
    db: Base;
    validate: boolean;

    constructor(user) {
        // TODO check the user teams before letting them see the db of course
        this.user = user;
        if (user.SelectedTeam) this.db = db(user.SelectedTeam);
        else this.db = db();
        this.validate = validateFunction(this.user);
    }

    // user sign-up
    register = async () =>
        await registerFunction(this.validate, this.user, this.db);

    // user sign-in
    login = async () => await loginFunction(this.validate, this.user, this.db);
}

export const nAuth = (user?: User) => new Auth(user);
