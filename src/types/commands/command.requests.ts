import type { TaskStatus } from "../core/task.types.js";

export type AddCommandRequest = {
  name: string;
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
  statusCode: TaskStatus;
};

export type ListCommandRequest = {
  statusCode?: TaskStatus | undefined;
};

export type CommandRequest = AddCommandRequest | EditCommandRequest | DeleteCommandRequest | ListCommandRequest;
