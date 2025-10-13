import {describe, it, before, after} from 'node:test';
import assert from 'node:assert';
import type { CommandRunnerInterface } from '../../src/types/commands/command-runner.interface.js';
import type { AddCommandRequest, DeleteCommandRequest } from '../../src/types/commands/command.requests.types.js';
import { AddCommandRunner } from '../../src/commands/add.command-runner.js';
import { TaskStatus } from '../../src/types/core/task.types.js';
import TaskManagerSuiteUtils from '../task-manager.suite-utils.js';
import { DeleteCommandRunner } from '../../src/commands/delete.command-runner.js';

describe('delete.command.runner', {}, () => {
  let sut: CommandRunnerInterface;

  before(() => {
    TaskManagerSuiteUtils.DeleteTaskJsonFile();
    const addCommandRunner = new AddCommandRunner();
    sut = new DeleteCommandRunner();
    TaskManagerSuiteUtils.MockCommandTaskManagerBasePath(addCommandRunner as any);
    TaskManagerSuiteUtils.MockCommandTaskManagerBasePath(sut as any);
    const addCommandRequest: AddCommandRequest = {name: 'Task Test'};
    addCommandRunner.run(addCommandRequest);
  });

  after(() => {
    TaskManagerSuiteUtils.DeleteTaskJsonFile();
  });

  it('should throw excetion when request.id is not valid', () => {
    // Arrange
    const isNaNRequest: DeleteCommandRequest = {id: NaN};

    // Assert
    assert.throws(() => sut.run(isNaNRequest), TypeError);

    // Arrange
    const notFoundTaskCodeRequest: DeleteCommandRequest = {id: 10};

    // Assert
    assert.throws(() => sut.run(notFoundTaskCodeRequest), RangeError);
  });

  it('should delete task by id', () => {
    // Check
    const oldTasks = TaskManagerSuiteUtils.ReadTestTasksJson(sut as any);
    assert.ok(oldTasks.length === 1);
    assert.ok(oldTasks[0]?.Id === 1);
    assert.ok(oldTasks[0]?.StatusCode === TaskStatus.TODO);
    assert.ok(typeof oldTasks[0].UpdatedAt === 'number');

    // Arrange
    const request: DeleteCommandRequest = {id: 1};

    // Act
    sut.run(request);

    // Assert
    const tasks = TaskManagerSuiteUtils.ReadTestTasksJson(sut as any);
    assert.equal(tasks.length, 0);
  });
});