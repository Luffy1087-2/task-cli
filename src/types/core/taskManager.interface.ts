import type { TaskJson } from './task.types.js';

export interface TasksJsonManager {
  readOrCreate(): TaskJson[];
  updateTasksJson(): void;
  getTaskIndexById(id: number): number;
  getTaskById(id: number): TaskJson | undefined;
};
