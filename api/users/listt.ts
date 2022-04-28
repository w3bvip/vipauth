import { VercelRequest, VercelResponse } from "@vercel/node";
import { allowCors } from "../../utils/cors/cors";
import { db } from "../../utils/db";

// LIST OF ALL USERS
const userss = async (req: VercelRequest, res: VercelResponse) => {
    //TODO check for the empty string it might bring back the ceo db
    // TODO in production you should definetly check the team to see if it really exists on user profile
    // TODO clean up
    if (req.body.SelectedTeam) {
        const udb = db(req.body.SelectedTeam);
        let users = await udb.fetch();

        const userNames: any[] = [];
        users.items.forEach((element: any) => {
            userNames.push(element.name);
        });
        res.status(201).json(userNames);
    } else {
        res.status(200).json({ message: "somthing is not right" });
    }

    // res.redirect("/api/test");
};
module.exports = allowCors(userss);
