import type { ICommandRunner } from "../types/commands/command-runner.types.js";
import type { EditCommandRequest } from "../types/commands/command.requests.js";
import { TaskManager } from "../core/task-manager.js";
import type { TaskJson } from "../types/core/task.types.js";

export class EditCommandRunner implements ICommandRunner {
    private readonly taskManager: TaskManager;

    constructor() {
        this.taskManager = new TaskManager();
    }
    
    run(request: EditCommandRequest): void {
        if (isNaN(request.id)) throw new TypeError('id is not a valid number');
        if (!request.name.length) throw new TypeError('name is not correct');
        const taskById = this.taskManager.getTaskById(request.id);
        if (!taskById) throw new RangeError('id is not valid or existing');
        this.editTask(taskById, request);
        this.taskManager.updateTasksJson();
        console.log(`Task name for Id ${request.id} is changed`);
    }

    private editTask(task: TaskJson, request: EditCommandRequest) {
        task.Name = request.name.replace(/\^/g, '');
        task.UpdatedAt = Date.now();
    }
}