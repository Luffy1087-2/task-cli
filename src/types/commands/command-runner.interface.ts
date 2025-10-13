import type { CommandRequest } from "./command.requests.types.js";

export interface CommandRunnerInterface {
  run(request: CommandRequest): void;
};