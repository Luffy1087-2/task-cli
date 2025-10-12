import fs from 'fs';
import path from "path";
import type { TaskJson } from '../src/types/core/task.types.js';

export default class TaskManagerSuiteUtils {
    private static TestTaskJsonBasePath: string = path.normalize(`${process.cwd()}/test/task`);
    private static TestTaskJsonFilePath: string = path.normalize(`${TaskManagerSuiteUtils.TestTaskJsonBasePath}/tasks.json`);

    public static MockTaskManagerBasePath(sut: { taskManager: { basePath: string }}) {
        if (!sut.taskManager) throw new TypeError('taskManager is not existing');
        if (!sut.taskManager.basePath) throw new TypeError('basePath is not existing');

        sut.taskManager.basePath = TaskManagerSuiteUtils.TestTaskJsonBasePath;
    }

    public static DeleteTaskJsonFile() {
        if (!fs.existsSync(TaskManagerSuiteUtils.TestTaskJsonFilePath)) return;

        fs.unlinkSync(TaskManagerSuiteUtils.TestTaskJsonFilePath);
        fs.rmdirSync(TaskManagerSuiteUtils.TestTaskJsonBasePath);
    }
    
    public static ReadTestTasksJson(sut: {taskManager: { readOrCreate: () => TaskJson[]}}): TaskJson[] {
        if (!sut.taskManager) throw new TypeError('taskManager is not existing');
        if (!sut.taskManager.readOrCreate) throw new TypeError('readOrCreate is not existing');
        if (typeof sut.taskManager.readOrCreate !== 'function') throw new TypeError('readOrCreate is not a function');
        
        return sut.taskManager.readOrCreate();
    }
}