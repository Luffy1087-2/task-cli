import { TaskManager } from "../core/task-manager.js";
import type { ChangeStatusCommandRequest } from "../types/commands/command.requests.js";
import type { ICommandRunner } from "../types/commands/command-runner.types.js";
import { TaskStatus, type TaskJson } from "../types/core/task.types.js";

export class ChangeStatusCommandRunner implements ICommandRunner {
    private readonly taskManager: TaskManager;

    constructor() {
        this.taskManager = new TaskManager();
    }
    
    run(request: ChangeStatusCommandRequest): void {
        if (isNaN(request.id)) throw new TypeError('id is not a number');
        if (!TaskStatus[request.statusCode]) throw new TypeError('status is not correct');
        const taskById = this.taskManager.getTaskById(request.id);
        if (!taskById) throw new TypeError('task is not found');
        this.updateTask(taskById, request);
        this.taskManager.updateTasksJson();
    }

    private updateTask(taskById: TaskJson, request: ChangeStatusCommandRequest) {
        taskById.StatusCode = request.statusCode;
        taskById.UpdatedAt = Date.now();
    }
}