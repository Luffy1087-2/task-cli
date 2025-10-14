import fs from 'fs';
import path from 'path';

const taskJsonDirPath = path.normalize(`${process.cwd()}/dist/test/task`);
const taskJsonFilePath = path.normalize(`${taskJsonDirPath}/tasks.json`);

function readJsonTest() {
  if (!fs.existsSync(taskJsonFilePath)) {
    return [];
  }
  const taskJsonBuffer = fs.readFileSync(taskJsonFilePath);
  const tasksJson = JSON.parse(taskJsonBuffer.toString());

  return tasksJson;
}

function deleteJsonTest() {
  if (!fs.existsSync(taskJsonFilePath)) return;

  fs.unlinkSync(taskJsonFilePath);
  fs.rmdirSync(taskJsonDirPath);
}

export { readJsonTest, deleteJsonTest };
