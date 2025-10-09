import type { CommandRequest } from "./command.requests.js";

export interface ICommandRunner {
    run(request: CommandRequest): void;
};

export interface ICommandsRunner {
    run(): void;
}