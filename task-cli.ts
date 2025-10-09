import { CommandsRunner } from "./src/commands-runner.js";

const runner = new CommandsRunner(process.argv);
runner.run();