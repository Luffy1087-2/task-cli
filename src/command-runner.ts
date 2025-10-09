import { AddTaskCommand } from "./commands/add.command.js";
import { DeleteTaskCommand } from "./commands/delete.commands.js";
import type { AddTaskRequest, DeleteTaskRequest, ICommand, ICommandRunner, TaskRequest } from "./types/commands/commands.types.js";

enum AllowedCommands {
    add = 'add',
    edit = 'edit',
    delete = 'delete',
    list = 'list' 
};

export class CommandRunner implements ICommandRunner {
    private readonly params: string[];

    constructor(params: string[]) {
        this.params = params.slice(2);
    }
    
    run(): void {
        const params = process.argv.slice(2);
        this.checkParams(params);
        const [ command, ] = params;
        const [ commandTask, request ] = this.createTaskCommand(command ?? '');
        commandTask.execute(request);
    }

    private createTaskCommand(command: string): [ICommand, TaskRequest] {
        const params = this.params.slice(1);
        switch (command) {
            case AllowedCommands.add:
                return this.createAddTaskCommand(params);
            case AllowedCommands.delete:
              return this.createDeleteTaskCommand(params);
        }
        throw new RangeError('generic error');
    }

    private checkParams(params: string[]) {
        if (!params.length) throw Error('no parameter found');
        const [command, ] = params;
        const allowedCommands = Object.keys(AllowedCommands);
        if (allowedCommands.indexOf(command ?? '') === -1) throw new RangeError(`command "${command}" is not recognized`);
    }

    private createAddTaskCommand(params: string[]): [ICommand, TaskRequest] {
        const [ name, description ] = params;
        const request: AddTaskRequest = {name: name ?? '', description}; 
        const taskCommand = new AddTaskCommand();

        return [ taskCommand, request ];
    }

    private createDeleteTaskCommand(params: string[]): [ICommand, TaskRequest] {
        const [ id ] = params;
        const request: DeleteTaskRequest = {id: Number(id)};
        const taskCommand = new DeleteTaskCommand();
        
        return [ taskCommand, request ];
    }
};