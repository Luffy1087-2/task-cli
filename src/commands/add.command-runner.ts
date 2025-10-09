import { TaskManager } from "../core/task-manager.js";
import type { ICommandRunner } from "../types/commands/command-runner.types.js";
import type { AddCommandRequest } from "../types/commands/command.requests.js";
import { TaskStatus, type TaskJson } from "../types/core/task.types.js";

export class AddCommandRunner implements ICommandRunner {
    private readonly taskManager: TaskManager; 
    
    constructor() {
        this.taskManager = new TaskManager();
    }

    run(request: AddCommandRequest): void {
        if (!request.name || !request.name.length) throw new TypeError("taskName should be a valid string");
        const tasksJson = this.taskManager.readOrCreate();
        const newId = this.getNewId(tasksJson);
        const newTask = this.getNewTask(newId, request);
        tasksJson.push(newTask);
        this.taskManager.updateTasksJson();
        console.log('ARRIVED HERE IN ADD TASK')
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
            Description: '',
            StatusCode: TaskStatus.TODO
        };
    }
}