import { AddCommandRunner } from "./commands/add.command.js";
import { DeleteCommandRunner } from "./commands/delete.command.js";
import type { ICommandRunner, ICommandsRunner } from "./types/commands/commands.types.js";
import type { AddCommandRequest, DeleteCommandRequest, CommandRequest } from "./types/commands/command.requests.js";

enum AllowedCommands {
    ADD = 'add',
    EDIT = 'edit',
    DELETE = 'delete',
    LIST = 'list' 
};

export class CommandsRunner implements ICommandsRunner {
    private readonly params: string[];

    constructor(params: string[]) {
        this.params = params.slice(2);
    }
    
    run(): void {
        const params = process.argv.slice(2);
        this.checkParams(params);
        const [ command, ] = params;
        const [ commandTask, request ] = this.createTaskCommand(command ?? '');
        commandTask.run(request);
    }

    private createTaskCommand(command: string): [ICommandRunner, CommandRequest] {
        const params = this.params.slice(1);
        switch (command) {
            case AllowedCommands.ADD.toString():
                return this.createAddTaskCommand(params);
            case AllowedCommands.DELETE.toString():
              return this.createDeleteTaskCommand(params);
        }
        throw new RangeError('generic error');
    }

    private checkParams(params: string[]) {
        if (!params.length) throw Error('no parameter found');
        const [command, ] = params;
        const allowedCommands = Object.keys(AllowedCommands);
        if (allowedCommands.indexOf(command?.toUpperCase() ?? '') === -1) throw new RangeError(`command "${command}" is not recognized`);
    }

    private createAddTaskCommand(params: string[]): [ICommandRunner, CommandRequest] {
        const [ name, description ] = params;
        const request: AddCommandRequest = {name: name ?? '', description}; 
        const taskCommand = new AddCommandRunner();

        return [ taskCommand, request ];
    }

    private createDeleteTaskCommand(params: string[]): [ICommandRunner, CommandRequest] {
        const [ id ] = params;
        const request: DeleteCommandRequest = {id: Number(id)};
        const taskCommand = new DeleteCommandRunner();
        
        return [ taskCommand, request ];
    }
};