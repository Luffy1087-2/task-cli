import type { CommandRequest } from "./command.requests.js";

export interface ICommandRunner {
    run(request: CommandRequest): void;
};