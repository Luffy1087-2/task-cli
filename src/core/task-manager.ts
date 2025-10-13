import fs from 'fs-extra';
import path from 'path';
import type { ITaskManager, TaskJson } from '../types/core/task.types.js';

export class TaskManager implements ITaskManager {
  private readonly basePath: string;
  private tasksJson: TaskJson[] | undefined;

  constructor() {
    this.basePath = path.normalize(`${process.cwd()}/task`);
  }

  readOrCreate(): TaskJson[] {
    fs.ensureDirSync(this.basePath);
    const taskJsonFilePath = path.normalize(`${this.basePath}/tasks.json`);
    if (!fs.existsSync(taskJsonFilePath)) {
      this.tasksJson = [];
      return this.tasksJson;
    }
    const taskJsonBuffer = fs.readFileSync(taskJsonFilePath);
    const tasksJson = JSON.parse(taskJsonBuffer.toString());
    this.tasksJson = tasksJson;
    return tasksJson;
  }

  updateTasksJson() {
    const tasks = this.getTasksJson();
    const jsonString = JSON.stringify(tasks, null, 2);
    const taskJsonFilePath = path.normalize(`${this.basePath}/tasks.json`);
    fs.ensureDirSync(this.basePath);
    fs.writeFileSync(taskJsonFilePath, jsonString);
  }

  getTaskIndexById(id: number) {
    const tasks = this.getTasksJson();
    const index = tasks.findIndex(t => t.Id === id);
    return index;
  }

  getTaskById(id: number) {
    const tasks = this.getTasksJson();
    const task = tasks.find(t => t.Id === id);
    return task;
  }

  private getTasksJson(): TaskJson[] {
    if (!this.tasksJson) return this.readOrCreate();
    return this.tasksJson;
  }
}