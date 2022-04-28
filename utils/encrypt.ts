import { VercelRequest, VercelResponse } from "@vercel/node";
import CryptoJS from "crypto-js";
import { User } from "./models/User";
export async function encryptFunction(userkey: string) {
    var cipherdata = await CryptoJS.SHA3(userkey, {
        outputLength: 224,
    }).toString();
    return cipherdata;
}
