import { CommandsRunnerFactory } from "./src/factory/commands-runner-factory.js";

const runner = new CommandsRunnerFactory(process.argv);
runner.run();