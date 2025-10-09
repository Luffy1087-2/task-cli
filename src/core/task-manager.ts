import fs from 'fs-extra';
import path from 'path';
import type { TaskJson } from '../types/core/task.types.js';

export class TaskManager {
    private readonly basePath: string;
    private tasksJson: TaskJson[] = [];

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
        return this.tasksJson;
    }

    updateTasksJson() {
        const jsonString = JSON.stringify(this.tasksJson, null, 2);
        const taskJsonFilePath = path.normalize(`${this.basePath}/tasks.json`);
        fs.ensureDirSync(this.basePath);
        fs.writeFileSync(taskJsonFilePath, jsonString);
    }

    getTaskIndexId(id: number) {
        const index = this.tasksJson.findIndex(t => t.Id === id);
        return index;
    }

    getTaskById(id: number) {
        const task = this.tasksJson.find(t => t.Id === id);
        return task;
    }
}