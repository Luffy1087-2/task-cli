import type { CommandRunnerInterface } from "../types/commands/command-runner.interface.js";
import type { EditCommandRequest } from "../types/commands/command.requests.js";
import { TaskManager } from "../core/task-manager.js";
import type { TaskJson } from "../types/core/task.types.js";

export class EditCommandRunner implements CommandRunnerInterface {
  private readonly taskManager: TaskManager;

  constructor() {
    this.taskManager = new TaskManager();
  }
  
  run(request: EditCommandRequest): void {
    if (isNaN(request.id)) throw new TypeError('Id is not a valid number');
    if (!request.name.length) throw new TypeError('Name is not correct');
    const taskById = this.taskManager.getTaskById(request.id);
    if (!taskById) throw new RangeError('Id is not valid or existing');
    this.editTask(taskById, request);
    this.taskManager.updateTasksJson();
    console.log(`Task name for Id ${request.id} is changed`);
  }

  private editTask(task: TaskJson, request: EditCommandRequest) {
    task.Name = request.name.replace(/\^/g, '');
    task.UpdatedAt = Date.now();
  }
}