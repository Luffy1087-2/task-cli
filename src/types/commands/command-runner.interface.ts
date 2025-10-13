import type { CommandRequest } from "./command.requests.js";

export interface CommandRunnerInterface {
  run(request: CommandRequest): void;
};