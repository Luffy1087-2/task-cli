import fs from 'fs-extra';
import path from 'path';
import type { TaskJson } from '../types/core/task.types.js';

export class TaskManager {
    private readonly basePath: string;

    constructor() {
        this.basePath = path.normalize(`${process.cwd()}/task`);
    }

    readOrCreate(): TaskJson[] {
        fs.ensureDirSync(this.basePath);
        const taskJsonFilePath = path.normalize(`${this.basePath}/tasks.json`);
        if (!fs.existsSync(taskJsonFilePath)) {
            return [] as TaskJson[];
        }
        const taskJson = fs.readFileSync(taskJsonFilePath);
        return JSON.parse(taskJson.toString()) as TaskJson[];
    }

    writeTasksJson(tasksJson: TaskJson[]) {
        const jsonString = JSON.stringify(tasksJson, null, 2);
        const taskJsonFilePath = path.normalize(`${this.basePath}/tasks.json`);
        fs.ensureDirSync(this.basePath);
        fs.writeFileSync(taskJsonFilePath, jsonString);
    }
}