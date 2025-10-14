import fs from 'fs';
import path from 'path';
import type { TaskJson } from '../../src/types/core/task.types.js';

const taskJsonDirPath = path.normalize(`${process.cwd()}/dist/test/task`);
const taskJsonFilePath = path.normalize(`${taskJsonDirPath}/tasks.json`);

function readJsonTest(): TaskJson[] {
  if (!fs.existsSync(taskJsonFilePath)) {
    return [];
  }
  const taskJsonBuffer = fs.readFileSync(taskJsonFilePath);
  const tasksJson = JSON.parse(taskJsonBuffer.toString());

  return tasksJson;
}

function deleteJsonTest(): void {
  if (!fs.existsSync(taskJsonFilePath)) return;

  fs.unlinkSync(taskJsonFilePath);
  fs.rmdirSync(taskJsonDirPath);
}

export { readJsonTest, deleteJsonTest };
