import { db } from "../../db";

export const addcompany = async (profile, company) => {
    if (profile.data.company.length == 0) {
        const dbc = db(company);
        let ceo = profile.data;
        ceo.mail = profile.mail;
        ceo.company = company;
        ceo.team = [...ceo.team, company];
        ceo.role = "admin";

        const addcompany = await dbc.insert(ceo, profile.data.key);
        if (addcompany.name) {
            ceo.role = "";
            ceo.secret = company;
            ceo.users = [];
            const dbu = db();

            try {
                const addcompanyToUser = await dbu.put(ceo, profile.data.key);
                return { status: 201, data: profile.data };
            } catch {
                try {
                    const addcompanyToUser = await dbu.put(
                        ceo,
                        profile.data.key
                    );
                    return { status: 201, data: profile.data };
                } catch {
                    return {
                        status: 200,
                        data: { message: "somthing is terribly wrong" },
                    };
                }
            }
        }
    } else {
    }
    if (profile.data.status == 200) {
        return { status: 200, data: { message: "User does not exist" } };
    }
};
