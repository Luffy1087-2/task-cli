import { TasksManager } from '../core/task-manager.js';
import type { ChangeStatusCommandRequest } from '../types/commands/command.requests.types.js';
import type { CommandRunner } from '../types/commands/command-runner.interface.js';
import { TaskStatus, type TaskJson } from '../types/core/task.types.js';
import type { TasksJsonManager } from '../types/core/taskManager.interface.js';

export class ChangeStatusCommandRunner implements CommandRunner {
  private readonly tasksManager: TasksJsonManager;

  constructor() {
    this.tasksManager = new TasksManager();
  }

  run(request: ChangeStatusCommandRequest): void {
    if (isNaN(request.id)) throw new TypeError('Id is not a number');
    if (!TaskStatus[request.statusCode]) throw new TypeError('status is not correct');
    const taskById = this.tasksManager.getTaskById(request.id);
    if (!taskById) throw new TypeError('Task is not found');
    this.updateTask(taskById, request);
    this.tasksManager.updateTasksJson();
    console.log(`Status ${TaskStatus[request.statusCode].toString()} changed for task Id ${request.id}`);
  }

  private updateTask(taskById: TaskJson, request: ChangeStatusCommandRequest) {
    taskById.StatusCode = request.statusCode;
    taskById.UpdatedAt = Date.now();
  }
}