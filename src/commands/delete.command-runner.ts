// Types
import type { Core } from '../types/core/core.types.js';
import type { DeleteCommandRequest } from '../types/commands/command.requests.types.js';
import type { CommandRunner } from '../types/commands/command-runner.types.js';

// Concretes
import { TasksManager } from '../core/task-manager.js';

export class DeleteCommandRunner implements CommandRunner.DeleteCommandRunner {
  private readonly tasksManager: Core.TasksManager;
  
  constructor() {
    this.tasksManager = new TasksManager();
  }

  run(request: DeleteCommandRequest): void {
    if (isNaN(request.id)) throw new TypeError('Id is not a valid number');
    const tasksJson = this.tasksManager.readOrCreate();
    const indexToDelete = this.tasksManager.getTaskIndexById(request.id);
    if (indexToDelete === -1) throw new RangeError('Task Id not found');
    tasksJson.splice(indexToDelete, 1);
    this.tasksManager.updateTasksJson();
    console.log(`\nTask Id ${request.id} is deleted`);
  }
}