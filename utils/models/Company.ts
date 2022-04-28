import { Task } from "./Task";

export type Company = {
    name: string;
    owner: string;
    value?: string;
    db?: string;
    key?: string;
    hash?: string;
    tasks?: Task[];
    users?: string[];
};
