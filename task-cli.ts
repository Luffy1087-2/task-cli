import { CommandRunner } from "./src/command-runner.js";

const runner = new CommandRunner(process.argv);
runner.run();