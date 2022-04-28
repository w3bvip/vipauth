import Base from "deta/dist/types/base";
import { FetchResponse } from "deta/dist/types/types/base/response";
import { User } from "../../models/User";

// user sign-up method
export async function registerFunction(
    validate: boolean,
    user: User,
    db: Base
) {
    // validate user
    if (!validate) {
        return { status: 200, data: { message: "check your input" } };
    }

    // check to see if there is  user already registered with this username in database
    let response = (await db.fetch({
        name: user.name,
    })) as FetchResponse;
    // check if user name and password belong to any user (db query is not empty)
    if (response.count) {
        return {
            status: 200,
            data: { message: `${response.items[0].name}  allready exist` },
        };

        // succesful registeration
    } else {
        let createduser = await db.insert({
            name: user.name,
            mail: user.mail || "",
            value: user.value,
            team: [],
            company: [],
            secret: "",
            users: [],
        });
        return { status: 201, data: createduser };
    }
}
