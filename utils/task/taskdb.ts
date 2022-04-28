import Base from "deta/dist/types/base";
import { User } from "../models/User";
import { taskList } from "./functions/taskList";
import { db } from "../db";
import { addTask } from "./functions/addTask";

class Task {
    user: User;
    db: Base;
    constructor(req, res, user) {
        if (user.team) this.db = db(user.team + "tasks");
        else this.db = db();
        this.db = db("tasks");
        this.user = user;
    }
    taskList = () => taskList(this.db, this.user);

    addTask = (task) => addTask(this.db, this.user, task);
}
export const nTask = (req, res, user) => new Task(req, res, user);
