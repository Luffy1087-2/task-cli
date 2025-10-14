import type { CommandRunner } from '../types/commands/command-runner.interface.js';
import type { DeleteCommandRequest } from '../types/commands/command.requests.types.js';
import { TasksManager } from '../core/task-manager.js';
import type { TasksJsonManager } from '../types/core/taskManager.interface.js';

export class DeleteCommandRunner implements CommandRunner {
  private readonly tasksManager: TasksJsonManager;
  
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
    console.log(`Task Id ${request.id} is deleted`);
  }
}