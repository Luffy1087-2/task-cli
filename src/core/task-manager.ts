import fs from 'fs-extra';
import path from 'path';
import type { Core } from '../types/core/core.types.js';

export class TasksManager implements Core.TasksManager {
  private tasksJson: Core.TaskJson[] | undefined;

  readOrCreate(): Core.TaskJson[] {
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
    const index = tasks.findIndex(t => t.id === id);
    return index;
  }

  getTaskById(id: number) {
    const tasks = this.getTasksJson();
    const task = tasks.find(t => t.id === id);
    return task;
  }
  
  private get basePath(): string {
    if (process.env.TASK_TRACKER_CLI_JSON_DIR) return path.normalize(`${process.cwd()}/${process.env.TASK_TRACKER_CLI_JSON_DIR}`);
    
    return path.normalize(`${process.cwd()}/task`);
  }

  private getTasksJson(): Core.TaskJson[] {
    if (!this.tasksJson) return this.readOrCreate();
    return this.tasksJson;
  }
}