import {describe, it, before, after} from 'node:test';
import assert from 'node:assert';
import type { CommandRunner } from '../../src/types/commands/command-runner.interface.js';
import type { AddCommandRequest, DeleteCommandRequest } from '../../src/types/commands/command.requests.types.js';
import { AddCommandRunner } from '../../src/commands/add.command-runner.js';
import { TaskStatus } from '../../src/types/core/task.types.js';
import { DeleteCommandRunner } from '../../src/commands/delete.command-runner.js';
import { deleteJsonTest, readJsonTest } from '../utils/jsonTest.js';
import { TaskStatusToCode } from '../../src/core/task-status.enum.mapping.js';

describe('delete.command.runner', {}, () => {
  let sut: CommandRunner;

  before(() => {
    deleteJsonTest();
    const addCommandRunner = new AddCommandRunner();
    sut = new DeleteCommandRunner();
    const addCommandRequest: AddCommandRequest = {name: 'Task Test'};
    addCommandRunner.run(addCommandRequest);
  });

  after(() => {
    deleteJsonTest();
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
    const oldTasks = readJsonTest();
    assert.equal(oldTasks.length, 1);
    assert.equal(oldTasks[0]?.id, 1);
    assert.equal(oldTasks[0]?.status, TaskStatusToCode(TaskStatus.TODO));
    assert.equal(typeof oldTasks[0]?.updatedAt, 'number');

    // Arrange
    const request: DeleteCommandRequest = {id: 1};

    // Act
    sut.run(request);

    // Assert
    const tasks = readJsonTest();
    assert.equal(tasks.length, 0);
  });
});