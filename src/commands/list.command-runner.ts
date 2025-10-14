import { TasksManager } from '../core/task-manager.js';
import type { ListCommandRequest } from '../types/commands/command.requests.types.js';
import type { CommandRunner } from '../types/commands/command-runner.interface.js';
import { TaskStatus, type TaskJson } from '../types/core/task.types.js';
import type { TasksJsonManager } from '../types/core/taskManager.interface.js';
import { CodeToTaskStatus } from '../core/task-status.enum.mapping.js';

export class ListCommandRunner implements CommandRunner {
  private readonly tasksManager: TasksJsonManager;

  constructor() {
    this.tasksManager = new TasksManager();
  }

  run(request: ListCommandRequest): void {
    if (request.statusCode && !CodeToTaskStatus(request.statusCode)) throw new TypeError('StatusCode is not recognized');
    const tasksJson = this.tasksManager.readOrCreate();
    if (!tasksJson.length) return void console.log('Tasks are empty');
    if (request.statusCode === undefined) return void tasksJson.forEach((t: TaskJson, i: number) => this.printTask(t, i));
    const filteredTasks = tasksJson.filter(t => t.status === request.statusCode);
    if (filteredTasks.length) filteredTasks.forEach((t: TaskJson, i: number) => this.printTask(t, i));
    else console.log('No tasks match');
  }

  private printTask(task: TaskJson, index: number) {
    if (index !== 0) console.log('\n- - - - - - - - - - - - - -\n');
    console.log(`Id: ${task.id}`);
    console.log(`Name: ${task.description}`);
    console.log(`Status: ${CodeToTaskStatus(task.status)?.toUpperCase()} - ${task.status}`);
    console.log(`Created At: ${this.getDateToTimestampByLocale(task.createdAt)}`);
    console.log(`Updated At: ${this.getDateToTimestampByLocale(task.updatedAt)}`);
  }

  private getDateToTimestampByLocale(timestamp: number, culture: Intl.LocalesArgument = 'it-IT') {
    const date = new Date(timestamp);
    const writtenDate = date.toLocaleString(culture, {
      day: '2-digit',
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