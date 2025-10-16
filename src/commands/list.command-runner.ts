// Types
import type { Core } from '../types/core/core.types.js';
import type { ListCommandRequest } from '../types/commands/command.requests.types.js';
import type { CommandRunner } from '../types/commands/command-runner.types.js';

// Concretes
import { TasksManager } from '../core/task-manager.js';
import { CodeToTaskStatus, TaskStatusToCode } from '../core/task-status.enum.mapping.js';

export class ListCommandRunner implements CommandRunner.ListCommandRunner {
  private readonly tasksManager: Core.TasksManager;

  constructor() {
    this.tasksManager = new TasksManager();
  }

  run(request: ListCommandRequest): void {
    if (request.statusCode && !TaskStatusToCode(request.statusCode as Core.TaskStatus)) throw new TypeError('StatusCode is not recognized');
    const tasksJson = this.tasksManager.readOrCreate();
    if (!tasksJson.length) return void console.log('Tasks are empty');
    if (request.statusCode === undefined) return void tasksJson.forEach((t: Core.TaskJson, i: number) => this.printTask(t, i));
    const filteredTasks = tasksJson.filter(t => t.status.toString() === TaskStatusToCode(request.statusCode as Core.TaskStatus));
    if (filteredTasks.length) filteredTasks.forEach((t: Core.TaskJson, i: number) => this.printTask(t, i));
    else console.log('\nNo tasks match');
  }

  private printTask(task: Core.TaskJson, index: number) {
    if (index === 0) console.log('');
    else console.log('\n- - - - - - - - - - - - - -\n');
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