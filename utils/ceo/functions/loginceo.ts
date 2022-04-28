import Base from "deta/dist/types/base";
import { FetchResponse } from "deta/dist/types/types/base/response";
import { Ceo } from "../../models/Ceo";

// ceo login method
export async function loginCeoFunction(
    validate: () => boolean,
    ceo: Ceo,
    db: Base,
    encrypt
) {
    // Controlling fields not to be empty
    if (!ceo.name || !ceo.value) {
        return { status: 200, data: { message: "check your input" } };
    }
    // encrypting password
    // ceo["value"] = await encrypt(ceo.value);
    // checking to see if ceoname exist in database
    const profile = await db.fetch({
        name: ceo.name,
        value: ceo.value,
    });
    if (profile.items[0]) {
        const dbceo = profile.items[0];
        // hash the ceo's key and replace it with the original key
        // Done you should remove this if and make the ceo create an empty ceos array when registers this way you look less dumb
        if (dbceo.name === ceo.name && dbceo.value === ceo.value) {
            return { status: 201, data: dbceo };
        }
    }
    // if no ceo found in the database giving this response
    return { status: 200, data: { message: "User does not exist" } };
}
