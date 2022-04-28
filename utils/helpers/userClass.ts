import { VercelRequest } from "@vercel/node";
import CryptoJS from "crypto-js";
import { User } from "../models/User";

export async function UserClass(req: VercelRequest, encrypt?) {
    let userObject = {} as any;
    // pars all params in the request body and return the user object
    for (const key in req.body) {
        userObject = { ...userObject, [key]: req.body[key] };
    }
    userObject = userObject;
    // encrypt value
    // TODO in production replace it with try/catch like the one in encrypt.ts
    if (encrypt === true) {
        userObject.value = await CryptoJS.SHA3(userObject.value, {
            outputLength: 224,
        }).toString();
        return userObject;
    }
    return userObject;
}
