import type { EditTaskRequest, ICommand } from "../types/commands/commands.types.js";

export class EditTaskCommand implements ICommand {
    execute(request: EditTaskRequest): void {
        if (isNaN(request.id)) throw new TypeError('id is not a valud number');
        if (!request.name.length) throw new TypeError('name is not correct');
        
        const jsonTasks = {} // getOrCreateJsonTasks(); 
        console.log('ARRIVED IN EDIT TASK')
    }
}