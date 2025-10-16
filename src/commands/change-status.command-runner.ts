// Types
import type { Core } from '../types/core/core.types.js';
import type { ChangeStatusCommandRequest } from '../types/commands/command.requests.types.js';
import type { CommandRunner } from '../types/commands/command-runner.types.js';

// Concretes
import { TasksManager } from '../core/task-manager.js';
import { CodeToTaskStatus } from '../core/task-status.enum.mapping.js';

export class ChangeStatusCommandRunner implements CommandRunner.ChangeStatusCommandRunner {
  private readonly tasksManager: Core.TasksManager;

  constructor() {
    this.tasksManager = new TasksManager();
  }

  run(request: ChangeStatusCommandRequest): void {
    if (isNaN(request.id)) throw new TypeError('Id is not a number');
    if (!CodeToTaskStatus(request.statusCode)) throw new TypeError('status is not correct');
    const taskById = this.tasksManager.getTaskById(request.id);
    if (!taskById) throw new TypeError('Task is not found');
    this.updateTask(taskById, request);
    this.tasksManager.updateTasksJson();
    console.log(`\nStatus ${CodeToTaskStatus(request.statusCode)?.toUpperCase()} was set for task Id ${request.id}`);
  }

  private updateTask(taskById: Core.TaskJson, request: ChangeStatusCommandRequest) {
    taskById.status = request.statusCode;
    taskById.updatedAt = Date.now();
  }
}