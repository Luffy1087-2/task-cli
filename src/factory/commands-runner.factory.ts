// Runners
import { AddCommandRunner } from '../commands/add.command-runner.js';
import { DeleteCommandRunner } from '../commands/delete.command-runner.js';
import { EditCommandRunner } from '../commands/edit.command-runner.js';
import { ChangeStatusCommandRunner } from '../commands/change-status.command-runner.js';
import { ListCommandRunner } from '../commands/list.command-runner.js';

// Types
import type { Factory } from '../types/factory/command-runner.factory.js';
import type { CommandRunner } from '../types/commands/command-runner.types.js';
import type { AddCommandRequest, DeleteCommandRequest, CommandRequest, EditCommandRequest, ListCommandRequest, ChangeStatusCommandRequest } from '../types/commands/command.requests.types.js';

enum AllowedCommands {
  ADD = 'add',
  UPDATE = 'update',
  MARK_IN_PROGRESS = 'mark-in-progress',
  MARK_DONE = 'mark-done',
  DELETE = 'delete',
  LIST = 'list'
};

export class CommandsRunnerFactory implements Factory.CommandsRunnerFactory {
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

  private createCommandRunner(command: string): [CommandRunner.CommandRunnerBase, CommandRequest] {
    const params = this.params.slice(1);
    switch (command) {
      case AllowedCommands.ADD.toString():
          return this.createAddCommandRunner(params);
      case AllowedCommands.UPDATE.toString():
          return this.createEditCommandRunner(params);
      case AllowedCommands.MARK_IN_PROGRESS.toString():
        return this.createChageStatusCommandRunner(params, 1);
      case AllowedCommands.MARK_DONE.toString():
        return this.createChageStatusCommandRunner(params, 2);
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
    if (!allowedCommands.includes(command as AllowedCommands)) throw new RangeError(`Command "${command}" is not recognized`);
  }
  
  private createListCommandRunner(params: string[]): [ CommandRunner.CommandRunnerBase, CommandRequest ] {
    const [ status ] = params;
    const request: ListCommandRequest = { statusCode: status };
    const commandRunner = new ListCommandRunner();

    return [ commandRunner, request ];
  }
  
  private createAddCommandRunner(params: string[]): [ CommandRunner.CommandRunnerBase, AddCommandRequest ] {
    const [ name ] = params;
    const request: AddCommandRequest = {name: name ?? ''}; 
    const commandRunner = new AddCommandRunner();

    return [ commandRunner, request ];
  }

  private createEditCommandRunner(params: string[]): [ CommandRunner.CommandRunnerBase, EditCommandRequest ] {
    const [ id, name ] = params;
    const request: EditCommandRequest = {id: Number(id), name: name ?? ''};
    const commandRunner = new EditCommandRunner();

    return [ commandRunner, request ];
  }

  private createChageStatusCommandRunner(params: string[], statusCode: number): [ CommandRunner.CommandRunnerBase, ChangeStatusCommandRequest ] {
    const [ id ] = params;
    const request: ChangeStatusCommandRequest = {id: Number(id), statusCode: Number(statusCode)};
    const commandRunner = new ChangeStatusCommandRunner();
    
    return [ commandRunner, request ];
  }

  private createDeleteCommandRunner(params: string[]): [ CommandRunner.CommandRunnerBase, DeleteCommandRequest ] {
    const [ id ] = params;
    const request: DeleteCommandRequest = {id: Number(id)};
    const commandRunner = new DeleteCommandRunner();
    
    return [ commandRunner, request ];
  }
};