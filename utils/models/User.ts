import { Task } from "./Task";

export type User = {
    name: string;
    mail?: string;
    value: string;
    role?: string;
    SelectedTeam?: string;
    company?: string;
    team?: string;
    key?: string;
    hash?: string;
    tasks?: Task[];
    users?: string[];
};
