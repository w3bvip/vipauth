// import { VercelRequest, VercelResponse } from "@vercel/node";
// import CryptoJS from "crypto-js";
// import { UserClass } from "./userClass";

// export class EncryptClass extends UserClass {
//     static user = async () => {
//         let value = this.userObject.value;
//         try {
//             value = await CryptoJS.SHA3(value, {
//                 outputLength: 224,
//             }).toString();
//         } catch {
//             value = null;
//         } finally {
//             this.userObject.value = value;
//             return value;
//         }
//     };
// }
