import type { CommandRunner } from "../types/commands/command-runner.interface.js";
import type { EditCommandRequest } from "../types/commands/command.requests.types.js";
import { TasksManager } from "../core/task-manager.js";
import type { TaskJson } from "../types/core/task.types.js";
import type { TasksJsonManager } from "../types/core/taskManager.interface.js";

export class EditCommandRunner implements CommandRunner {
  private readonly tasksManager: TasksJsonManager;

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

  private editTask(task: TaskJson, request: EditCommandRequest) {
    task.Name = request.name.replace(/\^/g, '');
    task.UpdatedAt = Date.now();
  }
}