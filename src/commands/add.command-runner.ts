// Types
import type { Core } from '../types/core/core.types.js';
import type { CommandRunner } from '../types/commands/command-runner.types.js';
import type { AddCommandRequest } from '../types/commands/command.requests.types.js';

// Concretes
import { TasksManager } from '../core/task-manager.js';

export class AddCommandRunner implements CommandRunner.AddCommandRunner {
  private readonly tasksManager: Core.TasksManager;
  
  constructor() {
    this.tasksManager = new TasksManager();
  }

  run(request: AddCommandRequest): void {
    if (!request.name || !request.name.length) throw new TypeError('taskName should be a valid string');
    const tasksJson = this.tasksManager.readOrCreate();
    const newId = this.getNewId(tasksJson);
    const newTask = this.getNewTask(newId, request);
    tasksJson.push(newTask);
    this.tasksManager.updateTasksJson();
    console.log('\nNew task was added');
  }

  private getNewId(tasksJson: Core.TaskJson[]): number {
    const ids = tasksJson.map(t => t.id);
    const maxId = ids.length ? Math.max(...ids) : 0;

    return maxId + 1;
  }

  private getNewTask(newId: number, request: AddCommandRequest): Core.TaskJson {
    const date = Date.now()
    return {
      id: newId,
      description: request.name.replace(/\^/g, ''),
      createdAt: date,
      updatedAt: date,
      status: 0
    };
  }
}