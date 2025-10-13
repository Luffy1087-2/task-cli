import fs from 'fs';
import path from "path";
import type { TaskJson } from '../src/types/core/task.types.js';
export default class TaskManagerSuiteUtils {
  private static TestTaskJsonBasePath: string = path.normalize(`${process.cwd()}/test/task`);
  private static TestTaskJsonFilePath: string = path.normalize(`${TaskManagerSuiteUtils.TestTaskJsonBasePath}/tasks.json`);

  public static MockCommandTaskManagerBasePath(sut: { tasksManager: { basePath: string }}) {
    if (!sut) throw new TypeError('sut is not a valid command object');
    
    TaskManagerSuiteUtils.MockTaskManagerBasePath(sut.tasksManager);
  }

  public static MockTaskManagerBasePath(tasksManager: { basePath: string}) {
    if (!tasksManager) throw new TypeError('tasksManager is not existing');
    if (!tasksManager.basePath) throw new TypeError('basePath is not existing');

    tasksManager.basePath = TaskManagerSuiteUtils.TestTaskJsonBasePath;
  }

  public static DeleteTaskJsonFile() {
    if (!fs.existsSync(TaskManagerSuiteUtils.TestTaskJsonFilePath)) return;

    fs.unlinkSync(TaskManagerSuiteUtils.TestTaskJsonFilePath);
    fs.rmdirSync(TaskManagerSuiteUtils.TestTaskJsonBasePath);
  }
  
  public static ReadTestTasksJson(sut: {tasksManager: { readOrCreate: () => TaskJson[]}}): TaskJson[] {
    if (!sut) throw TypeError('sut is not a valid command object');
    if (!sut.tasksManager) throw new TypeError('tasksManager is not existing');
    if (!sut.tasksManager.readOrCreate) throw new TypeError('readOrCreate is not existing');
    if (typeof sut.tasksManager.readOrCreate !== 'function') throw new TypeError('readOrCreate is not a function');
    
    return sut.tasksManager.readOrCreate();
  }
}