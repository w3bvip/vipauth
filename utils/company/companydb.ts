import { User } from "../models/User";
import { findBySecret } from "./functions/findBySecret";
import { joinCompany } from "./functions/joinCompany";
import { addcompany } from "./functions/addCompany";

export class CompanyDb {
    static AddNewCompany = (profile, companyName) =>
        addcompany(profile, companyName);

    static CompanyDbName = async (secret) => await findBySecret(secret);

    static JoinSecretCompany = (profile, companyDbName) =>
        joinCompany(profile, companyDbName);
    // taskList = () => taskList(this.db, this.user);

    // addTask = (task) => addTask(this.db, this.user, task);
}
