import type { DeleteTaskRequest, ICommand } from "../types/commands/commands.types.js";

export class DeleteTaskCommand implements ICommand {
    execute(request: DeleteTaskRequest): void {
        if (isNaN(request.id)) throw new TypeError('id is not a valud number');
        const jsonTasks = {} // getOrCreateJsonTasks(); 
        console.log('ARRIVED IN DELETE TASK')
    }
}