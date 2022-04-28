import { cAuth } from "../authceo";

export async function ceoautoLogin(req, res) {
    const name = req.body.name;
    const value = req.body.value;

    const ceo = { name, value };
    const profile = await cAuth(ceo).login();
    return { status: 201, data: profile.data };
}
