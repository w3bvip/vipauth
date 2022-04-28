import { Deta } from "deta";
import Base from "deta/dist/types/base";
// Initialize with a Project Key
// const deta = Deta("a03zquh0_gUxofb7P9Y9NYWBaNMieMDq9qGvbUUsi");

// You can create as many as you want without additional charges.
// export const db = deta.Base("vercel");

export const db = (dbName?: string) => {
    return Deta("c0tztczf_tJ2YPMS7dnsh3ithiyJ4HSpy2UhEzL6z").Base(
        dbName || "users"
    );
};

// export const ndb = (dbName?: string) => new Database(dbName || "vercel");
