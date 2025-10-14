import type { TaskStatus } from '../core/task.types.js';

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
  statusCode: number;
};

export type ListCommandRequest = {
  statusCode?: string | undefined;
};

export type CommandRequest = AddCommandRequest | EditCommandRequest | DeleteCommandRequest | ListCommandRequest;
