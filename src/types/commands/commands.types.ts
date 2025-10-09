import type { TaskStatus } from "../core/task.types.js";

export type AddTaskRequest = {
    name: string;
    description?: string | undefined;
};

export type EditTaskRequest = {
    id: number;
    name: string;
};

export type DeleteTaskRequest = {
    id: number;
}

export type ChangeStatusTaskRequest = {
    id: number,
    status: TaskStatus
};

export type ListTaskRequest = {
    status?: TaskStatus | undefined;
}

export type TaskRequest = AddTaskRequest | EditTaskRequest | DeleteTaskRequest | ListTaskRequest;

export interface ICommand {
    execute(request: TaskRequest): void;
};

export interface ICommandRunner {
    run(): void;
}