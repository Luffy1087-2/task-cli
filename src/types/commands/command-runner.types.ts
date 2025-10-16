import type { CommandRequest, AddCommandRequest, ChangeStatusCommandRequest, DeleteCommandRequest, EditCommandRequest, ListCommandRequest } from './command.requests.types.js';

export namespace CommandRunner {

  export interface CommandRunnerBase {
    run(request: CommandRequest): void;
  };

  export interface AddCommandRunner extends CommandRunnerBase {
    run(request: AddCommandRequest): void;
  };

  export interface ChangeStatusCommandRunner extends CommandRunnerBase {
    run(request: ChangeStatusCommandRequest): void;
  };

  export interface EditCommandRunner extends CommandRunnerBase {
    run(request: EditCommandRequest): void;
  };

  export interface DeleteCommandRunner extends CommandRunnerBase {
    run(request: DeleteCommandRequest): void;
  };

  export interface ListCommandRunner extends CommandRunnerBase {
    run(request: ListCommandRequest): void;
  };

}
