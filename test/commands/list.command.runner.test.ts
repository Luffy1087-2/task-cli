import {describe, it, before, after, beforeEach, afterEach} from 'node:test';
import assert from 'node:assert';
import type { ICommandRunner } from '../../src/types/commands/command-runner.types.js';
import type { ListCommandRequest } from '../../src/types/commands/command.requests.js';
import { AddCommandRunner } from '../../src/commands/add.command-runner.js';
import TaskManagerSuiteUtils from '../task-manager.suite-utils.js';
import { TaskStatus } from '../../src/types/core/task.types.js';
import { ListCommandRunner } from '../../src/commands/list.command-runner.js';
import { ChangeStatusCommandRunner } from '../../src/commands/change-status.command-runner.js';
import customStub from '../custom-stub.js';

describe('list.command.runner', {}, () => {
    let addCommandRunner: ICommandRunner;
    let changeStatusCodeRunner: ICommandRunner;
    let sut: ICommandRunner;
    let output: string[] = [];

    before(() => {
        TaskManagerSuiteUtils.DeleteTaskJsonFile();
        addCommandRunner = new AddCommandRunner();
        changeStatusCodeRunner = new ChangeStatusCommandRunner();
        sut = new ListCommandRunner();
        TaskManagerSuiteUtils.MockTaskManagerBasePath(addCommandRunner as any);
        TaskManagerSuiteUtils.MockTaskManagerBasePath(changeStatusCodeRunner as any);
        TaskManagerSuiteUtils.MockTaskManagerBasePath(sut as any);
    });

    beforeEach(() => {
        TaskManagerSuiteUtils.DeleteTaskJsonFile();
        output = [];
        customStub.stubMethod(console, 'log', (outputString) => output.push(outputString));
    });

    afterEach(() => {
        customStub.restore(console);
    });

    after(() => {
        customStub.restoreAll();
        TaskManagerSuiteUtils.DeleteTaskJsonFile();
    });

    it('should throw excetion when request.statusCode id not valid', () => {
        // Arrange
        const badStatusCode: ListCommandRequest = {statusCode: 10 as TaskStatus};

        // Assert
        assert.throws(() => sut.run(badStatusCode), TypeError);
    });

    it('should show \"Tasks are empty\" when there are no Tasks', () => {
        // Arrange
        const allTasksListRequest: ListCommandRequest = {};

        // Act
        sut.run(allTasksListRequest);

        // Assert
        assert.ok(output.length === 1);
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
        assert.equal(outputButAddingLogs.length, 11);
        assert.equal(outputButAddingLogs[0], 'Id: 1');
        assert.equal(outputButAddingLogs[1], 'Name: First Task');
        assert.equal(outputButAddingLogs[2], 'Status: TODO - 0');
        assert.match(outputButAddingLogs[3] ?? '', /^Created At:\s[\d\/]+,\s[\d:]+$/);
        assert.match(outputButAddingLogs[4] ?? '', /^Updated At:\s[\d\/]+,\s[\d:]+$/);
        assert.equal(outputButAddingLogs[5], '\n- - - - - - - - - - - - - -\n');
        assert.equal(outputButAddingLogs[6], 'Id: 2');
        assert.equal(outputButAddingLogs[7], 'Name: Second Task');
        assert.equal(outputButAddingLogs[8], 'Status: TODO - 0');
        assert.match(outputButAddingLogs[9] ?? '', /^Created At:\s[\d\/]+,\s[\d:]+$/);
        assert.match(outputButAddingLogs[10] ?? '', /^Updated At:\s[\d\/]+,\s[\d:]+$/);
    });

    it('should show filtered Tasks by StatusCode.PROGRESS', () => {
        // Arrange
        addCommandRunner.run({name: 'First Task'});
        addCommandRunner.run({name: 'Second Task - Progress'});
        addCommandRunner.run({name: 'Second Task'});
        changeStatusCodeRunner.run({id: 2, statusCode: TaskStatus.PROGRESS});
        const allTasksListRequest: ListCommandRequest = {statusCode: TaskStatus.PROGRESS};

        // Act
        sut.run(allTasksListRequest);

        // Assert
        const outputButAddingLogs = output.slice(4);
        assert.equal(outputButAddingLogs.length, 5);
        assert.equal(outputButAddingLogs[0], 'Id: 2');
        assert.equal(outputButAddingLogs[1], 'Name: Second Task - Progress');
        assert.equal(outputButAddingLogs[2], 'Status: PROGRESS - 1');
        assert.match(outputButAddingLogs[3] ?? '', /^Created At:\s[\d\/]+,\s[\d:]+$/);
        assert.match(outputButAddingLogs[4] ?? '', /^Updated At:\s[\d\/]+,\s[\d:]+$/);
    });

    it('should show \"No tasks match\" when the search by StatusCode.DONE is not found', () => {
        // Arrange
        addCommandRunner.run({name: 'First Task'});
        addCommandRunner.run({name: 'Second Task - Progress'});
        addCommandRunner.run({name: 'Second Task'});
        const allTasksListRequest: ListCommandRequest = {statusCode: TaskStatus.DONE};

        // Act
        sut.run(allTasksListRequest);

        // Assert
        const outputButAddingLogs = output.slice(3);
        assert.equal(outputButAddingLogs.length, 1);
        assert.equal(outputButAddingLogs[0], 'No tasks match');
    });
});