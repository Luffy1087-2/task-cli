import {describe, it, before, after, beforeEach, afterEach} from 'node:test';
import assert from 'node:assert';
import type { CommandRunner } from '../../src/types/commands/command-runner.interface.js';
import type { AddCommandRequest, ChangeStatusCommandRequest } from '../../src/types/commands/command.requests.types.js';
import { AddCommandRunner } from '../../src/commands/add.command-runner.js';
import { TaskStatus } from '../../src/types/core/task.types.js';
import { ChangeStatusCommandRunner } from '../../src/commands/change-status.command-runner.js';
import { deleteJsonTest, readJsonTest } from '../utils/jsonTest.js';

describe('change-status.command.runner', {}, () => {
  let sut: CommandRunner;

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
    const oldTasks = readJsonTest();
    assert.equal(oldTasks.length, 1);
    assert.equal(oldTasks[0]?.Id, 1);
    assert.equal(oldTasks[0]?.StatusCode, TaskStatus.TODO);
    assert.equal(typeof oldTasks[0].UpdatedAt, 'number');

    // Arrange
    const updateTime = oldTasks[0].UpdatedAt;
    const request: ChangeStatusCommandRequest = {id: 1, statusCode: TaskStatus.PROGRESS};

    // Act
    sut.run(request);

    // Assert
    const tasks = readJsonTest();
    assert.equal(tasks.length, 1);
    assert.notEqual(tasks[0].UpdatedAt, updateTime);
    assert.equal(tasks[0].StatusCode, TaskStatus.PROGRESS);
  });
});