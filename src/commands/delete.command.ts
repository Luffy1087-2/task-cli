import type { ICommandRunner } from "../types/commands/commands.types.js";
import type { DeleteCommandRequest } from "../types/commands/command.requests.js";

export class DeleteCommandRunner implements ICommandRunner {
    run(request: DeleteCommandRequest): void {
        if (isNaN(request.id)) throw new TypeError('id is not a valud number');
        const jsonTasks = {} // getOrCreateJsonTasks(); 
        console.log('ARRIVED IN DELETE TASK')
    }
}