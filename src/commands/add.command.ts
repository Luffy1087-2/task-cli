import { TaskManager } from "../core/task-manager.js";
import type { AddTaskRequest, ICommand } from "../types/commands/commands.types.js";
import { TaskStatus, type TaskJson } from "../types/core/task.types.js";

export class AddTaskCommand implements ICommand {
    private readonly taskManager: TaskManager; 
    
    constructor() {
        this.taskManager = new TaskManager();
    }

    execute(request: AddTaskRequest): void {
        if (!request.name || !request.name.length) throw new TypeError("taskName should be a valid string");
        const tasksJson = this.taskManager.readOrCreate();
        const newId = this.getNewId(tasksJson);
        const newTask = this.getNewTask(newId, request);
        tasksJson.push(newTask);
        this.taskManager.writeTasksJson(tasksJson);
        console.log('ARRIVED HERE IN ADD TASK')
    }

    private getNewId(tasksJson: TaskJson[]): number {
        const ids = tasksJson.map(t => t.Id);
        const maxId = ids.length ? Math.max(...ids) : 1;

        return maxId;
    }

    private getNewTask(newId: number, request: AddTaskRequest): TaskJson {
        const date = Date.now()
        return {
            Id: newId,
            Name: request.name,
            CreatedAt: date,
            UpdatedAt: date,
            Description: '',
            Status: TaskStatus.TODO
        };
    }
}