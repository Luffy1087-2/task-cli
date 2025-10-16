export type AddCommandRequest = {
  name: string;
  _type?: 'add';
} & CommandRequest;

export type EditCommandRequest = {
  id: number;
  name: string;
  _type?: 'edit';
} & CommandRequest;

export type DeleteCommandRequest = {
  id: number;
  _type?: 'delete';
} & CommandRequest;

export type ChangeStatusCommandRequest = {
  id: number;
  statusCode: number;
  _type?: 'change-status';
} & CommandRequest;

export type ListCommandRequest = {
  statusCode?: string | undefined;
  _type?: 'list';
} & CommandRequest;

export type CommandRequest = { }
