import { after, afterEach, before, beforeEach, describe, it } from 'node:test';
import { TaskStatus, type TaskJson } from '../../src/types/core/task.types.js';
import { type TasksJsonManager } from '../../src/types/core/taskManager.interface.js';
import { TasksManager } from '../../src/core/task-manager.js';
import assert from 'node:assert';
import { deleteJsonTest } from '../utils/jsonTest.js';

describe('task-manager', () => {
  let sut: TasksJsonManager;

  function getTask(id: number, description: string): TaskJson {
    return {
      id,
      description,
      status: 0,
      createdAt: 0,
      updatedAt: 1
    };
  }

  before(() => {
    deleteJsonTest();
    sut = new TasksManager();
  });

  beforeEach(() => {
    deleteJsonTest();
  })

  afterEach(() => {
    deleteJsonTest();
  });

  after(() => {
    deleteJsonTest();
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
    assert.equal(newTasks[0]?.description, 'name 1');
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
    assert.equal(tasks[indexById]?.description, 'name 2');
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
    assert.ok(!!task, 'task by Id is not found');
    assert.equal(task.description, 'name 2');
  });
})