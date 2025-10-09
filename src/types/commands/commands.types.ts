export type AddTaskRequest = {
    name: string;
    description?: string;
};

export type EditTaskNameRequest = {
    id: number;
    name: string;
};

export type DeleteTaskRequest = {
    id: number;
}

export type ChangeStatusTaskRequest = {
    id: number,
    type: 0 | 1 | 2
};

export type ListTaskRequest = {
    filter?: 'done' | 'todo' | 'progress';
}

export interface ICommand {
    execute(request: AddTaskRequest | EditTaskNameRequest | DeleteTaskRequest | ChangeStatusTaskRequest | ListTaskRequest): void;
};

export interface ICommandRunner {
    run(): void;
}