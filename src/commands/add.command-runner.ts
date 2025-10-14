import { TasksManager } from "../core/task-manager.js";
import type { CommandRunner as CommandRunner } from "../types/commands/command-runner.interface.js";
import type { AddCommandRequest } from "../types/commands/command.requests.types.js";
import { TaskStatus, type TaskJson } from "../types/core/task.types.js";
import type { TasksJsonManager } from "../types/core/taskManager.interface.js";

export class AddCommandRunner implements CommandRunner {
  private readonly tasksManager: TasksJsonManager;
  
  constructor() {
    this.tasksManager = new TasksManager();
  }

  run(request: AddCommandRequest): void {
    if (!request.name || !request.name.length) throw new TypeError("taskName should be a valid string");
    const tasksJson = this.tasksManager.readOrCreate();
    const newId = this.getNewId(tasksJson);
    const newTask = this.getNewTask(newId, request);
    tasksJson.push(newTask);
    this.tasksManager.updateTasksJson();
    console.log('New task was added');
  }

  private getNewId(tasksJson: TaskJson[]): number {
    const ids = tasksJson.map(t => t.Id);
    const maxId = ids.length ? Math.max(...ids) : 0;

    return maxId + 1;
  }

  private getNewTask(newId: number, request: AddCommandRequest): TaskJson {
    const date = Date.now()
    return {
      Id: newId,
      Name: request.name.replace(/\^/g, ''),
      CreatedAt: date,
      UpdatedAt: date,
      StatusCode: TaskStatus.TODO
    };
  }
}