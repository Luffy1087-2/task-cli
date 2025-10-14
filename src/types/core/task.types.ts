export enum TaskStatus {
  TODO = 'todo',
  PROGRESS = 'in-progress',
  DONE = 'done'
};

export type TaskJson = {
  id: number,
  description: string,
  status: number
  createdAt: number,
  updatedAt: number
};
