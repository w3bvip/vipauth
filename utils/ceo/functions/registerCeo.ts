import Base from "deta/dist/types/base";
import { FetchResponse } from "deta/dist/types/types/base/response";
import { Ceo } from "../../models/Ceo";
import { db } from "../../db";

// user sign-up method
export async function registerCeoFunction(
    validate: () => boolean,
    ceo: Ceo,
    cdb: Base,
    encrypt
) {
    // validate ceo
    if (!ceo.name || !ceo.value || !ceo.company) {
        return { status: 200, data: { message: "check your input" } };
    }
    // ceo.value = await encrypt(ceo.value);
    // check to see if there is  ceo already registered with this ceoname in database
    let response = (await cdb.fetch({
        name: ceo.name,
    })) as FetchResponse;
    let co = (await cdb.fetch({
        name: ceo.company,
    })) as FetchResponse;
    // check if ceo name and password belong to any ceo (db query is not empty)
    if (response.count || co.count) {
        return {
            status: 200,
            data: {
                message: `${
                    response.items[0].name || co.items[0].company
                }  allready exist`,
            },
        };
        // succesful registeration
    } else {
        let createdceo = await cdb.insert({
            name: ceo.name,
            value: ceo.value,
            role: "ceo",
            company: ceo.company,
            users: [],
        });
        let codb = db(ceo.company) as Base;

        let createdcompany = await codb.insert(createdceo);
        return { status: 201, data: createdceo };
    }
}
