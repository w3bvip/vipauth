import {User} from "../../models/User";
import Base from "deta/dist/types/base";

export async function taskList(db:Base,user:User){
   return await db.fetch({"task.createdBy":`${user.name}`,"task.createdFor":`${user.name}`})
}