// validateMethod

import { Company } from "../../models/Company";
import { User } from "../../models/User";

// check if user's name and value are provided
export function validateFunction(data: any): boolean {
    let { name, value } = data;
    if (name && value) {
        return true;
    } else {
        return false;
    }
}
