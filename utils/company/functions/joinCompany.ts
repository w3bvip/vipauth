import { db } from "../../db";
import { User } from "../../models/User";

export async function joinCompany(profile, companyDbName: string) {
    const user = profile.data;
    if (!companyDbName)
        return { status: 200, data: { message: "company does not exist" } };

    if (user.team.includes(companyDbName))
        return {
            status: 200,
            data: { message: "this company already exists" },
        };
    // find the company based on the secret provided by the user

    const dbc = db(companyDbName);
    const oldTeams = (user.team = [...user.team]);
    user.team = [...user.team, companyDbName];

    const joinUser = await dbc.put(user);
    let dbteams;
    oldTeams.forEach(async (team) => {
        dbteams = db(team);
        try {
            await dbteams.put(user.team, profile.key);
        } catch (err) {
            return { status: 500, data: err };
        }
    });
    if (joinUser.key) {
        joinUser.users = [];

        const dbu = db();
        const addcompanyToUser = await dbu.put(joinUser, profile.key);
        joinUser.selectedTeam = companyDbName;
    }
    return { status: 201, data: joinUser };
}
