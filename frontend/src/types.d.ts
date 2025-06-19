export type TaskStatus = "por hacer" | "en progreso" | "completada";

export interface Task {
    _id: string;
    title: string;
    description: string;
    status: TaskStatus;
    owner: string;
}
