import {describe, it, before, after} from 'node:test';
import assert from 'node:assert';
import type { ICommandRunner } from '../../src/types/commands/command-runner.types.js';
import type { AddCommandRequest, ChangeStatusCommandRequest, EditCommandRequest } from '../../src/types/commands/command.requests.js';
import { AddCommandRunner } from '../../src/commands/add.command-runner.js';
import TaskManagerSuiteUtils from '../task-manager.suite-utils.js';
import { EditCommandRunner } from '../../src/commands/edit.command-runner.js';

describe('edit.command.runner', {}, () => {
    const defaultTaskName = 'Task Test';
    const newTaskName = 'New Task Name';
    let sut: ICommandRunner;

    before(() => {
        TaskManagerSuiteUtils.DeleteTaskJsonFile();
        const addCommandRunner = new AddCommandRunner();
        sut = new EditCommandRunner();
        TaskManagerSuiteUtils.MockCommandTaskManagerBasePath(addCommandRunner as any);
        TaskManagerSuiteUtils.MockCommandTaskManagerBasePath(sut as any);
        const addCommandRequest: AddCommandRequest = {name: defaultTaskName};
        addCommandRunner.run(addCommandRequest);
    });

    after(() => {
        TaskManagerSuiteUtils.DeleteTaskJsonFile();
    });

    it('should throw excetion when request.id or request.statusCode are not valid', () => {
        // Arrange
        const isNaNRequest: EditCommandRequest = {id: NaN, name: 'Task New Name'};

        // Assert
        assert.throws(() => sut.run(isNaNRequest), TypeError);

        // Arrange
        const badNameRequest: EditCommandRequest = {id: 1, name: ''};

        // Assert
        assert.throws(() => sut.run(badNameRequest), TypeError);

        // Arrange
        const notFoundIdTaskRequest: EditCommandRequest = {id: 10, name: 'New Task Name'};

        // Assert
        assert.throws(() => sut.run(notFoundIdTaskRequest), RangeError);
    });

    it('should change the Task Name', () => {
        // Assert
        const tasks = TaskManagerSuiteUtils.ReadTestTasksJson(sut as any);
        assert.ok(tasks.length === 1);
        assert.ok(tasks[0]?.Id === 1);
        assert.equal(tasks[0]?.Name, defaultTaskName);

        // Arrange
        const oldUpdateTime = tasks[0].UpdatedAt;
        const request: EditCommandRequest = {id: 1, name: newTaskName};

        // Act
        sut.run(request);
        
        // Assert
        assert.ok(tasks.length === 1);
        assert.equal(tasks[0].Name, newTaskName);
        assert.equal(typeof tasks[0].UpdatedAt, 'number');
        assert.notEqual(tasks[0].UpdatedAt, oldUpdateTime);
    });
});