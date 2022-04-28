// validateMethod

import { Ceo } from "../../models/Ceo";
import { Company } from "../../models/Company";

// check if user's name and value are provided
export function validateCeoFunction(data: Ceo | Company): boolean {
    let { name, value } = data;
    if (name && value) {
        return true;
    } else {
        return false;
    }
}
