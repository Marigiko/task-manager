export type TaskStatus = "por hacer" | "en progreso" | "completada";

export interface Task {
    id: string;
    title: string;
    description: string;
    status: TaskStatus;
}
