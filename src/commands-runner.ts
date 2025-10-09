// Runners
import { AddCommandRunner } from "./commands/add.command.js";
import { DeleteCommandRunner } from "./commands/delete.command.js";
import { EditCommandRunner } from "./commands/edit.command.js";

// Types 
import type { ICommandRunner, ICommandsRunner } from "./types/commands/commands.types.js";
import type { AddCommandRequest, DeleteCommandRequest, CommandRequest, EditCommandRequest, ListCommandRequest, ChangeStatusCommandRequest } from "./types/commands/command.requests.js";
import { TaskStatus } from "./types/core/task.types.js";
import { ListCommandRunner } from "./commands/list.command.js";
import { ChangeStatusCommandRunner } from "./commands/change-status.command.js";

enum AllowedCommands {
    ADD = 'add',
    EDIT = 'edit',
    CHANGE_STATUS = 'changeStatus',
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
        const [ commandRunner, request ] = this.createCommandRunner(command ?? '');
        commandRunner.run(request);
    }

    private createCommandRunner(command: string): [ICommandRunner, CommandRequest] {
        const params = this.params.slice(1);
        switch (command) {
            case AllowedCommands.ADD.toString():
                return this.createAddCommandRunner(params);
            case AllowedCommands.EDIT.toString():
                return this.createEditCommandRunner(params);
            case AllowedCommands.CHANGE_STATUS.toString():
                return this.createChageStatusCommandRunner(params);
            case AllowedCommands.DELETE.toString():
              return this.createDeleteCommandRunner(params);
            case AllowedCommands.LIST.toString():
                return this.createListCommandRunner(params);
        }
        throw new RangeError('generic error');
    }

    private checkParams(params: string[]) {
        if (!params.length) throw Error('no parameter found');
        const [command, ] = params;
        const allowedCommands = Object.values(AllowedCommands);
        if (allowedCommands.indexOf(command as AllowedCommands) === -1) throw new RangeError(`command "${command}" is not recognized`);
    }
    
    createListCommandRunner(params: string[]): [ICommandRunner, CommandRequest] {
        const [ status ] = params;
        const statusCode = status ? Number(status) : undefined;
        const request: ListCommandRequest = { statusCode: statusCode };
        const commandRunner = new ListCommandRunner();

        return [ commandRunner, request ];
    }
    
    private createAddCommandRunner(params: string[]): [ICommandRunner, CommandRequest] {
        const [ name, description ] = params;
        const request: AddCommandRequest = {name: name ?? '', description}; 
        const commandRunner = new AddCommandRunner();

        return [ commandRunner, request ];
    }

    private createEditCommandRunner(params: string[]): [ICommandRunner, CommandRequest] {
        const [ id, name ] = params;
        const request: EditCommandRequest = {id: Number(id), name: name ?? ''};
        const commandRunner = new EditCommandRunner();

        return [ commandRunner, request ];
    }

    private createChageStatusCommandRunner(params: string[]): [ ICommandRunner, CommandRequest ] {
        const [ id, statusCode ] = params;
        const request: ChangeStatusCommandRequest = {id: Number(id), statusCode: Number(statusCode)};
        const commandRunner = new ChangeStatusCommandRunner();
        
        return [ commandRunner, request ];
    }

    private createDeleteCommandRunner(params: string[]): [ICommandRunner, CommandRequest] {
        const [ id ] = params;
        const request: DeleteCommandRequest = {id: Number(id)};
        const commandRunner = new DeleteCommandRunner();
        
        return [ commandRunner, request ];
    }
};