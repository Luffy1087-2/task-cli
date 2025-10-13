import { after, afterEach, before, beforeEach, describe, it } from "node:test";
import { TaskStatus, type TaskJson } from "../../src/types/core/task.types.js";
import { type TasksJsonManager } from "../../src/types/core/taskManager.interface.js";
import { TasksManager } from "../../src/core/task-manager.js";
import TaskManagerSuiteUtils from "../task-manager.suite-utils.js";
import assert from "node:assert";

describe('task-manager', () => {
  let sut: TasksJsonManager;

  function getTask(id: number, name: string): TaskJson {
    return {
      Id: id,
      Name: name,
      StatusCode: TaskStatus.TODO,
      CreatedAt: 0,
      UpdatedAt: 1
    };
  }

  before(() => {
    TaskManagerSuiteUtils.DeleteTaskJsonFile();
    sut = new TasksManager();
    TaskManagerSuiteUtils.MockTaskManagerBasePath(sut as any);
  });

  beforeEach(() => {
    TaskManagerSuiteUtils.DeleteTaskJsonFile();
  })

  afterEach(() => {
    TaskManagerSuiteUtils.DeleteTaskJsonFile();
  });

  after(() => {
    TaskManagerSuiteUtils.DeleteTaskJsonFile();
  });

  it('readOrCreate should return empty array when there are no tasks', () => {
    // Act
    const tasks = sut.readOrCreate();

    // Assert
    assert.equal(tasks.length, 0);
  });

  it('updateTasksJson should update tasks', () => {
    // Arrange
    const oldTasks = sut.readOrCreate();
    oldTasks.push(getTask(1, 'name 1'));

    // Act
    sut.updateTasksJson();

    // Assert
    const newTasks = sut.readOrCreate();
    assert.equal(newTasks.length, 1);
    assert.equal(newTasks[0]?.Name, 'name 1');
  });

  it('getTaskIndexById should return the expected index', () => {
    // Arrange
    const tasks = sut.readOrCreate();
    tasks.push(getTask(1, 'name 1'));
    tasks.push(getTask(2, 'name 2'));
    tasks.push(getTask(3, 'name 3'));

    // Act
    const indexById = sut.getTaskIndexById(2);

    // Assert
    assert.equal(indexById, 1);
    assert.equal(tasks[indexById]?.Name, 'name 2');
  });

  it('getTaskById should return the expected task', () => {
    // Arrange
    const tasks = sut.readOrCreate();
    tasks.push(getTask(1, 'name 1'));
    tasks.push(getTask(2, 'name 2'));
    tasks.push(getTask(3, 'name 3'));

    // Act
    const task = sut.getTaskById(2);

    // Assert
    assert.ok(!!task);
    assert.equal(task.Name, 'name 2');
  });
})