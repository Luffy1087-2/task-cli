import fs from 'fs';
import path from "path";
import type { TaskJson } from '../src/types/core/task.types.js';
export default class TaskManagerSuiteUtils {
    private static TestTaskJsonBasePath: string = path.normalize(`${process.cwd()}/test/task`);
    private static TestTaskJsonFilePath: string = path.normalize(`${TaskManagerSuiteUtils.TestTaskJsonBasePath}/tasks.json`);

    public static MockCommandTaskManagerBasePath(sut: { taskManager: { basePath: string }}) {
        if (!sut) throw new TypeError('sut is not a valid command object');
        
        TaskManagerSuiteUtils.MockTaskManagerBasePath(sut.taskManager);
    }

    public static MockTaskManagerBasePath(taskManager: { basePath: string}) {
        if (!taskManager) throw new TypeError('taskManager is not existing');
        if (!taskManager.basePath) throw new TypeError('basePath is not existing');

        taskManager.basePath = TaskManagerSuiteUtils.TestTaskJsonBasePath;
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