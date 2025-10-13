import {describe, it, before, after} from 'node:test';
import assert from 'node:assert';
import type { CommandRunnerInterface } from '../../src/types/commands/command-runner.interface.js';
import type { AddCommandRequest, ChangeStatusCommandRequest } from '../../src/types/commands/command.requests.types.js';
import { AddCommandRunner } from '../../src/commands/add.command-runner.js';
import { TaskStatus } from '../../src/types/core/task.types.js';
import { ChangeStatusCommandRunner } from '../../src/commands/change-status.command-runner.js';
import TaskManagerSuiteUtils from '../task-manager.suite-utils.js';

describe('change-status.command.runner', {}, () => {
  let sut: CommandRunnerInterface;

  before(() => {
    TaskManagerSuiteUtils.DeleteTaskJsonFile();
    const addCommandRunner = new AddCommandRunner();
    sut = new ChangeStatusCommandRunner();
    TaskManagerSuiteUtils.MockCommandTaskManagerBasePath(addCommandRunner as any);
    TaskManagerSuiteUtils.MockCommandTaskManagerBasePath(sut as any);
    const addCommandRequest: AddCommandRequest = {name: 'Task Test'};
    addCommandRunner.run(addCommandRequest);
  });

  after(() => {
    TaskManagerSuiteUtils.DeleteTaskJsonFile();
  });

  it('should throw excetion when request.id or request.statusCode are not valid', () => {
    // Arrange
    const isNaNRequest: ChangeStatusCommandRequest = {id: NaN, statusCode: 0};

    // Assert
    assert.throws(() => sut.run(isNaNRequest), TypeError);

    // Arrange
    const badStatusCodeRequest: ChangeStatusCommandRequest = {id: 1, statusCode: 10 as TaskStatus};

    // Assert
    assert.throws(() => sut.run(badStatusCodeRequest), TypeError);

    // Arrange
    const notFoundTaskCodeRequest: ChangeStatusCommandRequest = {id: 10, statusCode: TaskStatus.PROGRESS};

    // Assert
    assert.throws(() => sut.run(notFoundTaskCodeRequest), TypeError);
  });

  it('should change status code from TODO to PROGRESS', () => {
    //Assert
    const tasks = TaskManagerSuiteUtils.ReadTestTasksJson(sut as any);
    assert.ok(tasks.length === 1);
    assert.ok(tasks[0]?.Id === 1);
    assert.ok(tasks[0]?.StatusCode === TaskStatus.TODO);
    assert.ok(typeof tasks[0].UpdatedAt === 'number');

    // Arrange
    const updateTime = tasks[0].UpdatedAt;
    const request: ChangeStatusCommandRequest = {id: 1, statusCode: TaskStatus.PROGRESS};

    // Assert
    sut.run(request);
    assert.ok(tasks.length === 1);
    assert.notEqual(tasks[0].UpdatedAt, updateTime);
    assert.equal(tasks[0].StatusCode, TaskStatus.PROGRESS);
  });
});