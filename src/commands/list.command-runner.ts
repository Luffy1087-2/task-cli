import { TaskManager } from "../core/task-manager.js";
import type { ListCommandRequest } from "../types/commands/command.requests.js";
import type { ICommandRunner } from "../types/commands/command-runner.types.js";
import { TaskStatus, type TaskJson } from "../types/core/task.types.js";

export class ListCommandRunner implements ICommandRunner {
    private readonly taskManager;
    
    constructor() {
        this.taskManager = new TaskManager();
    }

    run(request: ListCommandRequest): void {
        const tasksJson = this.taskManager.readOrCreate();
        if (request.statusCode === undefined) return void tasksJson.forEach((t: TaskJson, i: number) => this.printTask(t, i));
        const filteredTasks = tasksJson.filter(t => t.StatusCode === request.statusCode);
        if (filteredTasks.length) filteredTasks.forEach((t: TaskJson, i: number) => this.printTask(t, i));
        else console.log('No tasks match');
    }

    private printTask(task: TaskJson, index: number) {
        if (index !== 0) console.log('\n- - - - - - - - - - - - - -\n');
        console.log(`Id: ${task.Id}`);
        console.log(`Name: ${task.Name}`);
        console.log(`Status: ${TaskStatus[task.StatusCode]} - ${task.StatusCode}`);
        console.log(`Created At: ${this.getDateToTimestampByLocale(task.CreatedAt)}`);
        console.log(`Updated At: ${this.getDateToTimestampByLocale(task.UpdatedAt)}`);
    }

    private getDateToTimestampByLocale(timestamp: number, culture: Intl.LocalesArgument = 'it-IT') {
        const date = new Date(timestamp);
        const writtenDate = date.toLocaleString(culture, {
            day: "2-digit",
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false
        });

        return writtenDate;
    }
}