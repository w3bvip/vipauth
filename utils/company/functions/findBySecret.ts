import Base from "deta/dist/types/base";
import { db } from "../../db";

export async function findBySecret(secret: string) {
    // find the company based on the secret provided by the user
    let company = null;
    try {
        const udb = db();
        const ceo = await udb.fetch({ secret: secret });
        const itemsNumber = ceo.count;
        if (itemsNumber !== 0) company = ceo.items[0].company;
    } catch {}

    return company;
}
