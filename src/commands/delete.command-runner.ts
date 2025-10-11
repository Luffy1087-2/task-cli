import type { ICommandRunner } from "../types/commands/command-runner.types.js";
import type { DeleteCommandRequest } from "../types/commands/command.requests.js";
import { TaskManager } from "../core/task-manager.js";

export class DeleteCommandRunner implements ICommandRunner {
    private readonly taskManager: TaskManager;
    
    constructor() {
        this.taskManager = new TaskManager();
    }

    run(request: DeleteCommandRequest): void {
        if (isNaN(request.id)) throw new TypeError('Id is not a valid number');
        const tasksJson = this.taskManager.readOrCreate();
        const indexToDelete = this.taskManager.getTaskIndexById(request.id);
        if (indexToDelete === -1) throw new RangeError('Task Id not found');
        tasksJson.splice(indexToDelete, 1);
        this.taskManager.updateTasksJson();
        console.log(`Task Id ${request.id} is deleted`);
    }
}