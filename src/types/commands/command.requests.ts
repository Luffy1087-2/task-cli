import type { TaskStatus } from "../core/task.types.js";


export type AddCommandRequest = {
    name: string;
    description?: string | undefined;
};

export type EditCommandRequest = {
    id: number;
    name: string;
};

export type DeleteCommandRequest = {
    id: number;
};

export type ChangeStatusCommandRequest = {
    id: number;
    status: TaskStatus;
};

export type ListCommandRequest = {
    status?: TaskStatus | undefined;
};

export type CommandRequest = AddCommandRequest | EditCommandRequest | DeleteCommandRequest | ListCommandRequest;
