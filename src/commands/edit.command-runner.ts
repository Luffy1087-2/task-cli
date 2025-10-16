// Types
import type { Core } from '../types/core/core.types.js';
import type { EditCommandRequest } from '../types/commands/command.requests.types.js';
import type { CommandRunner } from '../types/commands/command-runner.types.js';

// Concretes
import { TasksManager } from '../core/task-manager.js';


export class EditCommandRunner implements CommandRunner.EditCommandRunner {
  private readonly tasksManager: Core.TasksManager;

  constructor() {
    this.tasksManager = new TasksManager();
  }
  
  run(request: EditCommandRequest): void {
    if (isNaN(request.id)) throw new TypeError('Id is not a valid number');
    if (!request.name.length) throw new TypeError('Name is not correct');
    const taskById = this.tasksManager.getTaskById(request.id);
    if (!taskById) throw new RangeError('Id is not valid or existing');
    this.editTask(taskById, request);
    this.tasksManager.updateTasksJson();
    console.log(`Task name for Id ${request.id} is changed`);
  }

  private editTask(task: Core.TaskJson, request: EditCommandRequest) {
    task.description = request.name.replace(/\^/g, '');
    task.updatedAt = Date.now();
  }
}