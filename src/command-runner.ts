import { AddTaskCommand } from "./commands/add.command.js";
import { DeleteTaskCommand } from "./commands/delete.commands.js";
import type { ICommandRunner } from "./types/commands/commands.types.js";

enum AllowedCommands {
    'add' = 'add',
    'edit' = 'edit',
    'delete' = 'delete',
    'list' = 'list' 
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
        this.runCommand(command ?? '');
    }

    private runCommand(command: string) {
        const params = this.params.slice(1); // Remove command
        switch (command) {
            case AllowedCommands.add:
                new AddTaskCommand().execute({name: params[0] ?? ''});
                break;
            case AllowedCommands.delete:
                new DeleteTaskCommand().execute({id: Number(params[0])});
                break;
            default:
                new DeleteTaskCommand().execute({id: Number(params[0])});
        }
    }

    private checkParams(params: string[]) {
        if (!params.length) throw Error('no parameter found');
        const [command, ] = params;
        const allowedCommands = Object.keys(AllowedCommands);
        if (allowedCommands.indexOf(command ?? '') === -1) throw new RangeError(`command "${command}" is not recognized`);
    }
};