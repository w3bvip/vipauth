import { VercelRequest, VercelResponse } from "@vercel/node";
import { allowCors } from "../utils/cors/cors";
import { db } from "../utils/db";

// LIST OF ALL USERS
const users = async (req: VercelRequest, res: VercelResponse) => {
    //TODO check for the empty string it might bring back the ceo db
    if (req.body.team) {
        let users = await db(req.body.team).fetch();
        res.send(users);
    }
    let users = await db().fetch();
    res.send({});

    // res.redirect("/api/test");
};
module.exports = allowCors(users);
