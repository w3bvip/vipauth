import { db } from "../../db";
import { UserClass } from "../../helpers/userClass";
import { User } from "../../models/User";
import { nAuth } from "../authdb";
export async function autoLogin(req) {
    const user = await UserClass(req, false);
    const maindb = db();
    const mainProfile = (await maindb.get(user.key)) as User;
    const profile = await nAuth(user).login();
    if (mainProfile && mainProfile.team) profile.data.team = mainProfile.team;
    return { status: profile.status, data: profile.data };
}
