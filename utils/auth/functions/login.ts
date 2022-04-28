import Base from "deta/dist/types/base";
import { FetchResponse } from "deta/dist/types/types/base/response";
import { User } from "../../models/User";

// user login method
export async function loginFunction(validate: boolean, user: User, db: Base) {
    // Controlling fields not to be empty
    if (validate !== true) {
        return { status: 200, data: { message: "check your input" } };
    }
    // encrypting password
    // user["value"] = await encrypt(user.value);
    // checking to see if username exist in database
    const profile = await db.fetch({
        name: user.name,
        value: user.value,
    });

    if (profile.items[0]) {
        const dbuser = profile.items[0];

        // hash the user's key and replace it with the original key
        // Done you should remove this if and make the user create an empty users array when registers this way you look less dumb
        if (dbuser.name === user.name && dbuser.value === user.value) {
            if (user.SelectedTeam) dbuser.SelectedTeam = user.SelectedTeam;
            return { status: 201, data: dbuser };
        }
    }
    // if no user found in the database giving this response
    return {
        status: 200,
        data: { message: "User does not exist" },
    };
}
