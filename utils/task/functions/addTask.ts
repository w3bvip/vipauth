import {User} from "../../models/User";
import Base from "deta/dist/types/base";
import {Task} from "../../models/Task";

export async function addTask(db:Base,user:User,task:Task){

    return await db.put({task})
}