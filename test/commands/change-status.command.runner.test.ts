import {describe, it, before, after, beforeEach, afterEach} from 'node:test';
import assert from 'node:assert';
// Types
import { Core } from '../../src/types/core/core.types.js';
import type { CommandRunner } from '../../src/types/commands/command-runner.types.js';
import type { AddCommandRequest, ChangeStatusCommandRequest } from '../../src/types/commands/command.requests.types.js';

// Concretes
import { AddCommandRunner } from '../../src/commands/add.command-runner.js';
import { ChangeStatusCommandRunner } from '../../src/commands/change-status.command-runner.js';
import { deleteJsonTest, readJsonTest } from '../utils/jsonTest.js';
import { TaskStatusToCode } from '../../src/core/task-status.enum.mapping.js';

describe('change-status.command.runner', {}, () => {
  let sut: CommandRunner.ChangeStatusCommandRunner;

  before(() => {
    deleteJsonTest();
    const addCommandRunner = new AddCommandRunner();
    sut = new ChangeStatusCommandRunner();
    const addCommandRequest: AddCommandRequest = {name: 'Task Test'};
    addCommandRunner.run(addCommandRequest);
  });

  after(() => {
    deleteJsonTest();
  });

  it('should throw excetion when request.id or request.statusCode are not valid', () => {
    // Arrange
    const isNaNRequest: ChangeStatusCommandRequest = {id: NaN, statusCode: 0};

    // Assert
    assert.throws(() => sut.run(isNaNRequest), TypeError);

    // Arrange
    const badStatusCodeRequest: ChangeStatusCommandRequest = {id: 1, statusCode: 10};

    // Assert
    assert.throws(() => sut.run(badStatusCodeRequest), TypeError);

    // Arrange
    const notFoundTaskCodeRequest: ChangeStatusCommandRequest = {id: 10, statusCode: 1};

    // Assert
    assert.throws(() => sut.run(notFoundTaskCodeRequest), TypeError);
  });

  it('should change status code from TODO to PROGRESS', () => {
    //Assert
    const oldTasks = readJsonTest();
    assert.equal(oldTasks.length, 1);
    assert.equal(oldTasks[0]?.id, 1);
    assert.equal(oldTasks[0]?.status, TaskStatusToCode(Core.TaskStatus.TODO));
    assert.equal(typeof oldTasks[0]?.updatedAt, 'number');

    // Arrange
    const updateTime = oldTasks[0]?.updatedAt;
    const request: ChangeStatusCommandRequest = {id: 1, statusCode: 1};

    // Act
    sut.run(request);

    // Assert
    const tasks = readJsonTest();
    assert.equal(tasks.length, 1);
    assert.notEqual(tasks[0]?.updatedAt, updateTime);
    assert.equal(tasks[0]?.status, TaskStatusToCode(Core.TaskStatus.IN_PROGRESS));
  });
});