import type { ICommandRunner } from "../types/commands/commands.types.js";
import type { EditCommandRequest } from "../types/commands/command.requests.js";

export class EditCommandRunner implements ICommandRunner {
    run(request: EditCommandRequest): void {
        if (isNaN(request.id)) throw new TypeError('id is not a valud number');
        if (!request.name.length) throw new TypeError('name is not correct');

        const jsonTasks = {} // getOrCreateJsonTasks(); 
        console.log('ARRIVED IN EDIT TASK')
    }
}