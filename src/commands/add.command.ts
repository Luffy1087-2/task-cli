import type { AddTaskRequest, ICommand } from "../types/commands/commands.types.js";

export class AddTaskCommand implements ICommand {
    execute(request: AddTaskRequest): void {
        if (!request.name || !request.name.length) throw new TypeError("taskName should be a valid string");
        const jsonTasks = {} // getOrCreateJsonTasks(); 
        console.log('ARRIVED HERE IN ADD TASK')
    }
}