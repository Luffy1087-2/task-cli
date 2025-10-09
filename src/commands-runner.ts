import { AddCommandRunner } from "./commands/add.command.js";
import { DeleteCommandRunner } from "./commands/delete.command.js";
import type { ICommandRunner, ICommandsRunner } from "./types/commands/commands.types.js";
import type { AddCommandRequest, DeleteCommandRequest, CommandRequest, EditCommandRequest } from "./types/commands/command.requests.js";
import { EditCommandRunner } from "./commands/edit.command.js";

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
        const [ commandRunner, request ] = this.createcommandRunner(command ?? '');
        commandRunner.run(request);
    }

    private createcommandRunner(command: string): [ICommandRunner, CommandRequest] {
        const params = this.params.slice(1);
        switch (command) {
            case AllowedCommands.ADD.toString():
                return this.createAddCommand(params);
            case AllowedCommands.EDIT.toString():
                return this.createEditCommand(params);
            case AllowedCommands.DELETE.toString():
              return this.createDeleteCommand(params);
        }
        throw new RangeError('generic error');
    }

    private checkParams(params: string[]) {
        if (!params.length) throw Error('no parameter found');
        const [command, ] = params;
        const allowedCommands = Object.keys(AllowedCommands);
        if (allowedCommands.indexOf(command?.toUpperCase() ?? '') === -1) throw new RangeError(`command "${command}" is not recognized`);
    }
    
    private createAddCommand(params: string[]): [ICommandRunner, CommandRequest] {
        const [ name, description ] = params;
        const request: AddCommandRequest = {name: name ?? '', description}; 
        const commandRunner = new AddCommandRunner();

        return [ commandRunner, request ];
    }

    private createEditCommand(params: string[]): [ICommandRunner, CommandRequest] {
        const [ id, name ] = params;
        const request: EditCommandRequest = {id: Number(id), name: name ?? ''};
        const commandRunner = new EditCommandRunner();

        return [ commandRunner, request ];
    }

    private createDeleteCommand(params: string[]): [ICommandRunner, CommandRequest] {
        const [ id ] = params;
        const request: DeleteCommandRequest = {id: Number(id)};
        const commandRunner = new DeleteCommandRunner();
        
        return [ commandRunner, request ];
    }
};