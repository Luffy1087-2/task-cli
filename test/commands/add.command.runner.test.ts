import {describe, it, beforeEach, before, after} from 'node:test';
import assert from 'node:assert';
import type { CommandRunner } from '../../src/types/commands/command-runner.interface.js';
import type { AddCommandRequest } from '../../src/types/commands/command.requests.types.js';
import { AddCommandRunner } from '../../src/commands/add.command-runner.js';
import { TaskStatus } from '../../src/types/core/task.types.js';
import { deleteJsonTest, readJsonTest } from '../utils/jsonTest.js';

describe('add.command.runner', () => {
  let sut: CommandRunner;

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
    assert.ok(tasks.length === 1, 'length should be one');
    assert.ok(tasks[0]?.Id === 1, 'Id should be one');
    assert.ok(tasks[0]?.Name === "MyTestTask", 'Name should be MyTestTask');
    assert.ok(tasks[0]?.StatusCode === TaskStatus.TODO, 'Default status code should be TODO');
    assert.ok(typeof tasks[0]?.CreatedAt === 'number');
    assert.ok(typeof tasks[0]?.UpdatedAt === 'number');
  });

  it('should add task a second tasks with the name "My second task"', () => {
    // Assert
    const request: AddCommandRequest = {name: 'My second task'};

    // Act
    sut.run(request);

    // Assert
    const tasks = readJsonTest();
    assert.ok(tasks.length === 2, 'length should be two');
    assert.ok(tasks[1]?.Id === 2, 'Id should be two');
    assert.ok(tasks[1]?.Name === "My second task", 'Name should be "My second task"');
    assert.ok(tasks[1]?.StatusCode === TaskStatus.TODO, 'Default status code should be TODO');
    assert.ok(typeof tasks[1]?.CreatedAt === 'number');
    assert.ok(typeof tasks[1]?.UpdatedAt === 'number');
  });
});