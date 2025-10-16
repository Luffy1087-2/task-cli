import {describe, it, beforeEach, before, after} from 'node:test';
import assert from 'node:assert';
// Types
import { Core } from '../../src/types/core/core.types.js';
import type { CommandRunner } from '../../src/types/commands/command-runner.types.js';
import type { AddCommandRequest } from '../../src/types/commands/command.requests.types.js';

// Concretes
import { AddCommandRunner } from '../../src/commands/add.command-runner.js';
import { deleteJsonTest, readJsonTest } from '../utils/jsonTest.js';
import { TaskStatusToCode } from '../../src/core/task-status.enum.mapping.js';

describe('add.command.runner', () => {
  let sut: CommandRunner.AddCommandRunner;

  before(() => {
    deleteJsonTest();
  });

  after(() => {
    deleteJsonTest();
  });

  beforeEach(() => {
    sut = new AddCommandRunner();
  });

  it('should throw excetion when request.name is not valid', () => {
    // Arrange
    const request: AddCommandRequest = {name: ''};

    // Assert
    assert.throws(() => sut.run(request), TypeError);
  });

  it('should add a task with the name MyTestTask', () => {
    // Assert
    const request: AddCommandRequest = {name: 'MyTestTask'};

    // Act
    sut.run(request);

    // Assert
    const tasks = readJsonTest();
    assert.equal(tasks.length, 1, 'length should be one');
    assert.equal(tasks[0]?.id, 1, 'Id should be one');
    assert.equal(tasks[0]?.description, 'MyTestTask', 'Name should be MyTestTask');
    assert.equal(tasks[0]?.status, TaskStatusToCode(Core.TaskStatus.TODO), 'Default status code should be TODO');
    assert.equal(typeof tasks[0]?.createdAt, 'number');
    assert.equal(typeof tasks[0]?.updatedAt, 'number');
  });

  it('should add task a second tasks with the name \'My second task\'', () => {
    // Assert
    const request: AddCommandRequest = {name: 'My second task'};

    // Act
    sut.run(request);

    // Assert
    const tasks = readJsonTest();
    assert.equal(tasks.length, 2, 'length should be two');
    assert.equal(tasks[1]?.id, 2, 'Id should be two');
    assert.equal(tasks[1]?.description, 'My second task', 'Name should be \'My second task\'');
    assert.equal(tasks[1]?.status, TaskStatusToCode(Core.TaskStatus.TODO), 'Default status code should be TODO');
    assert.equal(typeof tasks[1]?.createdAt, 'number');
    assert.equal(typeof tasks[1]?.updatedAt, 'number');
  });
});
