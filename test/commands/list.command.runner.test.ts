import {describe, it, before, after, beforeEach, afterEach} from 'node:test';
import assert from 'node:assert';
// Types
import { Core } from '../../src/types/core/core.types.js';
import type { CommandRunner } from '../../src/types/commands/command-runner.types.js';
import type { ListCommandRequest } from '../../src/types/commands/command.requests.types.js';

// Concretes
import { AddCommandRunner } from '../../src/commands/add.command-runner.js';
import { ListCommandRunner } from '../../src/commands/list.command-runner.js';
import { ChangeStatusCommandRunner } from '../../src/commands/change-status.command-runner.js';
import { deleteJsonTest } from '../utils/jsonTest.js';
import { TaskStatusToCode } from '../../src/core/task-status.enum.mapping.js';
import customStub from '../utils/custom-stub.js';

describe('list.command.runner', {}, () => {
  let addCommandRunner: CommandRunner.AddCommandRunner;
  let changeStatusCodeRunner: CommandRunner.ChangeStatusCommandRunner;
  let sut: CommandRunner.ListCommandRunner;
  let output: string[] = [];

  before(() => {
    deleteJsonTest();
    addCommandRunner = new AddCommandRunner();
    changeStatusCodeRunner = new ChangeStatusCommandRunner();
    sut = new ListCommandRunner();
  });

  beforeEach(() => {
    deleteJsonTest();
    output = [];
    customStub.stubMethod(console, 'log', (outputString) => output.push(outputString));
  });

  afterEach(() => {
    customStub.restore(console);
  });

  after(() => {
    customStub.restoreAll();
    deleteJsonTest();
  });

  it('should throw excetion when request.statusCode id not valid', () => {
    // Arrange
    const badStatusCode: ListCommandRequest = {statusCode: 'not found'};

    // Assert
    assert.throws(() => sut.run(badStatusCode), TypeError);
  });

  it('should show \"Tasks are empty\" when there are no Tasks', () => {
    // Arrange
    const allTasksListRequest: ListCommandRequest = {};

    // Act
    sut.run(allTasksListRequest);

    // Assert
    assert.equal(output.length, 1);
    assert.equal(output[0], 'Tasks are empty');
  });

  it('should show all tasks', () => {
    // Arrange
    addCommandRunner.run({name: 'First Task'});
    addCommandRunner.run({name: 'Second Task'});
    const allTasksListRequest: ListCommandRequest = {};

    // Act
    sut.run(allTasksListRequest);

    // Assert
    const outputButAddingLogs = output.slice(2);
    assert.equal(outputButAddingLogs.length, 12);
    assert.equal(outputButAddingLogs[0], '\n');
    assert.equal(outputButAddingLogs[1], 'Id: 1');
    assert.equal(outputButAddingLogs[2], 'Name: First Task');
    assert.equal(outputButAddingLogs[3], 'Status: TODO - 0');
    assert.match(outputButAddingLogs[4] ?? '', /^Created At:\s[\d\/]+,\s[\d:]+$/);
    assert.match(outputButAddingLogs[5] ?? '', /^Updated At:\s[\d\/]+,\s[\d:]+$/);
    assert.equal(outputButAddingLogs[6], '\n- - - - - - - - - - - - - -\n');
    assert.equal(outputButAddingLogs[7], 'Id: 2');
    assert.equal(outputButAddingLogs[8], 'Name: Second Task');
    assert.equal(outputButAddingLogs[9], 'Status: TODO - 0');
    assert.match(outputButAddingLogs[10] ?? '', /^Created At:\s[\d\/]+,\s[\d:]+$/);
    assert.match(outputButAddingLogs[11] ?? '', /^Updated At:\s[\d\/]+,\s[\d:]+$/);
  });

  it('should show filtered Tasks by StatusCode.PROGRESS', () => {
    // Arrange
    addCommandRunner.run({name: 'First Task'});
    addCommandRunner.run({name: 'Second Task - Progress'});
    addCommandRunner.run({name: 'Second Task'});
    changeStatusCodeRunner.run({id: 2, statusCode: Number(TaskStatusToCode(Core.TaskStatus.IN_PROGRESS) ?? '777')});
    const inProgressTasksListRequest: ListCommandRequest = {statusCode: Core.TaskStatus.IN_PROGRESS};

    // Act
    sut.run(inProgressTasksListRequest);

    // Assert
    const outputButAddingLogs = output.slice(4);
    assert.equal(outputButAddingLogs.length, 6);
    assert.equal(outputButAddingLogs[0], '\n');
    assert.equal(outputButAddingLogs[1], 'Id: 2');
    assert.equal(outputButAddingLogs[2], 'Name: Second Task - Progress');
    assert.equal(outputButAddingLogs[3], 'Status: IN-PROGRESS - 1');
    assert.match(outputButAddingLogs[4] ?? '', /^Created At:\s[\d\/]+,\s[\d:]+$/);
    assert.match(outputButAddingLogs[5] ?? '', /^Updated At:\s[\d\/]+,\s[\d:]+$/);
  });

  it('should show \"No tasks match\" when the search by StatusCode.DONE is not found', () => {
    // Arrange
    addCommandRunner.run({name: 'First Task'});
    addCommandRunner.run({name: 'Second Task - Progress'});
    addCommandRunner.run({name: 'Second Task'});
    const allTasksListRequest: ListCommandRequest = {statusCode: Core.TaskStatus.IN_PROGRESS};

    // Act
    sut.run(allTasksListRequest);

    // Assert
    const outputButAddingLogs = output.slice(3);
    assert.equal(outputButAddingLogs.length, 1);
    assert.match((outputButAddingLogs[0]+''), /No tasks match/i);
  });
});