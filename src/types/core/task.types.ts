export enum TaskStatus {
    TODO,
    PROGRESS,
    DONE
};

export type TaskJson = {
    Id: number,
    Name: string,
    Description: string,
    StatusCode: TaskStatus
    CreatedAt: number,
    UpdatedAt: number
};