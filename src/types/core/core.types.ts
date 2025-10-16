export namespace Core {

  export interface TasksManager {
    readOrCreate(): TaskJson[];
    updateTasksJson(): void;
    getTaskIndexById(id: number): number;
    getTaskById(id: any): TaskJson | undefined;
  };

  export enum TaskStatus {
    TODO = 'todo',
    IN_PROGRESS = 'in-progress',
    DONE = 'done'
  };

  export type TaskJson = {
    id: number,
    description: string,
    status: number
    createdAt: number,
    updatedAt: number
  };

}
