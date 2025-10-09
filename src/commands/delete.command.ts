import type { ICommandRunner } from "../types/commands/commands.types.js";
import type { DeleteCommandRequest } from "../types/commands/command.requests.js";
import { TaskManager } from "../core/task-manager.js";

export class DeleteCommandRunner implements ICommandRunner {
    private readonly taskManager: TaskManager;
    
    constructor() {
        this.taskManager = new TaskManager();
    }

    run(request: DeleteCommandRequest): void {
        if (isNaN(request.id)) throw new TypeError('id is not a valid number');
        const tasksJson = this.taskManager.readOrCreate();
        const indexToDelete = this.taskManager.getTaskIndexId(request.id);
        if (indexToDelete === -1) throw new RangeError('id not found');
        tasksJson.splice(indexToDelete, 1);
        this.taskManager.updateTasksJson();
    }
}