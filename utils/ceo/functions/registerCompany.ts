import Base from "deta/dist/types/base";
import { FetchResponse } from "deta/dist/types/types/base/response";
import { Company } from "../../models/Company";

// data sign-up method
export async function registerCompanyFunction(
    validate: () => boolean,
    data: Company,
    db: Base,
    encrypt
) {
    // validate data
    if (!data.name || !data.owner) {
        return { status: 200, data: { message: "check your input" } };
    }
    // data.value = await encrypt(data.value);
    // check to see if there is  data already registered with this dataname in database
    let response = (await db.fetch({
        name: data.owner,
    })) as FetchResponse;
    // check if data name and password belong to any data (db query is not empty)
    if (response.count && response.items[0].company) {
        return {
            status: 200,
            data: {
                message: `${response.items[0].company}  allready exist you cant have more than one Co at this time`,
            },
        };
        // succesful registeration
    } else {
        let createddata = await db.insert({
            name: data.name,
            owner: data.owner,
            value: data.value,
            users: [],
        });
        return { status: 201, data: createddata };
    }
}
