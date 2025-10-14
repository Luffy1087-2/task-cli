import type { CommandRequest } from './command.requests.types.js';

export interface CommandRunner {
  run(request: CommandRequest): void;
};