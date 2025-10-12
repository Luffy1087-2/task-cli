import {describe, it, beforeEach, before, after} from 'node:test';
import assert from 'node:assert';
import path from 'node:path';
import fs from 'fs';
import type { ICommandRunner } from '../../src/types/commands/command-runner.types.js';
import type { AddCommandRequest, ChangeStatusCommandRequest } from '../../src/types/commands/command.requests.js';
import { AddCommandRunner } from '../../src/commands/add.command-runner.js';
import { TaskStatus, type TaskJson } from '../../src/types/core/task.types.js';
import { ChangeStatusCommandRunner } from '../../src/commands/change-status.command-runner.js';

describe('change-status.command.runner', {}, () => {
    const newTasksJsonPath = path.normalize(`${process.cwd()}/test/task`);
    const newTasksJsonFilePath = path.normalize(`${newTasksJsonPath}/tasks.json`);
    function readTasks(): TaskJson[] {
        return (sut as any)?.taskManager?.readOrCreate();
    }
    let sut: ICommandRunner;

    before(() => {
        if (fs.existsSync(newTasksJsonFilePath)) fs.unlinkSync(newTasksJsonFilePath);
        const addCommandRunner = new AddCommandRunner();
        (addCommandRunner as any).taskManager.basePath = newTasksJsonPath;
        sut = new ChangeStatusCommandRunner();
        (sut as any).taskManager.basePath = newTasksJsonPath;
        const addCommandRequest: AddCommandRequest = {name: 'Task Test'};
        addCommandRunner.run(addCommandRequest);
    });

    after(() => {
        if (fs.existsSync(newTasksJsonFilePath)) fs.unlinkSync(newTasksJsonFilePath);
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
        const tasks = readTasks();
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