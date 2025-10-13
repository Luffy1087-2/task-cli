export enum TaskStatus {
    TODO,
    PROGRESS,
    DONE
};

export type TaskJson = {
    Id: number,
    Name: string,
    StatusCode: TaskStatus
    CreatedAt: number,
    UpdatedAt: number
};

export interface ITaskManager {
    readOrCreate(): TaskJson[];
    updateTasksJson(): void;
    getTaskIndexById(id: number): number;
    getTaskById(id: number): TaskJson | undefined;
};