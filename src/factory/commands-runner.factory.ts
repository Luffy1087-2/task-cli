// Runners
import { AddCommandRunner } from '../commands/add.command-runner.js';
import { DeleteCommandRunner } from '../commands/delete.command-runner.js';
import { EditCommandRunner } from '../commands/edit.command-runner.js';
import { ChangeStatusCommandRunner } from '../commands/change-status.command-runner.js';
import { ListCommandRunner } from '../commands/list.command-runner.js';

// Types 
import type { CommandRunner } from '../types/commands/command-runner.interface.js';
import type { CommandsRunnerFactoryInterface as CommandsFactory } from '../types/factory/command-runner.factory.interface.js';
import type { AddCommandRequest, DeleteCommandRequest, CommandRequest, EditCommandRequest, ListCommandRequest, ChangeStatusCommandRequest } from '../types/commands/command.requests.types.js';


enum AllowedCommands {
  ADD = 'add',
  EDIT = 'edit',
  CHANGE_STATUS = 'changeStatus',
  DELETE = 'delete',
  LIST = 'list'
};

export class CommandsRunnerFactory implements CommandsFactory {
  private readonly params: string[];

  constructor(params: string[]) {
    this.params = params.slice(2);
  }
  
  run(): void {
    try {
      const params = process.argv.slice(2);
      this.checkParams(params);
      const [ command, ] = params;
      const [ commandRunner, request ] = this.createCommandRunner(command ?? '');
      commandRunner.run(request);
    } catch(e: any) {
      console.log(e.message);
    }
  }

  private createCommandRunner(command: string): [CommandRunner, CommandRequest] {
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
    throw new RangeError('Generic error');
  }

  private checkParams(params: string[]) {
    if (!params.length) throw TypeError('No parameter found');
    const [ command ] = params;
    const allowedCommands = Object.values(AllowedCommands);
    if (allowedCommands.indexOf(command as AllowedCommands) === -1) throw new RangeError(`Command "${command}" is not recognized`);
  }
  
  private createListCommandRunner(params: string[]): [CommandRunner, CommandRequest] {
    const [ status ] = params;
    const statusCode = status ? Number(status) : undefined;
    const request: ListCommandRequest = { statusCode: statusCode };
    const commandRunner = new ListCommandRunner();

    return [ commandRunner, request ];
  }
  
  private createAddCommandRunner(params: string[]): [CommandRunner, CommandRequest] {
    const [ name ] = params;
    const request: AddCommandRequest = {name: name ?? ''}; 
    const commandRunner = new AddCommandRunner();

    return [ commandRunner, request ];
  }

  private createEditCommandRunner(params: string[]): [CommandRunner, CommandRequest] {
    const [ id, name ] = params;
    const request: EditCommandRequest = {id: Number(id), name: name ?? ''};
    const commandRunner = new EditCommandRunner();

    return [ commandRunner, request ];
  }

  private createChageStatusCommandRunner(params: string[]): [ CommandRunner, CommandRequest ] {
    const [ id, statusCode ] = params;
    const request: ChangeStatusCommandRequest = {id: Number(id), statusCode: Number(statusCode)};
    const commandRunner = new ChangeStatusCommandRunner();
    
    return [ commandRunner, request ];
  }

  private createDeleteCommandRunner(params: string[]): [CommandRunner, CommandRequest] {
    const [ id ] = params;
    const request: DeleteCommandRequest = {id: Number(id)};
    const commandRunner = new DeleteCommandRunner();
    
    return [ commandRunner, request ];
  }
};