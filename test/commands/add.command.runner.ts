import {describe, it, beforeEach, before, after} from 'node:test';
import assert from 'node:assert';
import path from 'node:path';
import fs from 'fs';
import type { ICommandRunner } from '../../src/types/commands/command-runner.types.js';
import type { AddCommandRequest } from '../../src/types/commands/command.requests.js';
import { AddCommandRunner } from '../../src/commands/add.command-runner.js';
import { TaskStatus, type TaskJson } from '../../src/types/core/task.types.js';

describe('add.command.runner', {}, () => {
    const newTasksJsonPath = path.normalize(`${process.cwd()}/test/task`);
    const newTasksJsonFilePath = path.normalize(`${newTasksJsonPath}/tasks.json`);
    function readTasks(): TaskJson[] {
        return (sut as any)?.taskManager?.readOrCreate();
    }
    let sut: ICommandRunner;

    before(() => {
        if (fs.existsSync(newTasksJsonFilePath)) fs.unlinkSync(newTasksJsonFilePath);
    });

    after(() => {
        if (fs.existsSync(newTasksJsonFilePath)) fs.unlinkSync(newTasksJsonFilePath);
    });

    beforeEach(() => {
        sut = new AddCommandRunner();
        (sut as any).taskManager.basePath = newTasksJsonPath;
    });

    it('should throw excetion when request.name is not valid', () => {
        // Assert
        const request: AddCommandRequest = {name: ''};

        // Act
        assert.throws(() => sut.run(request), TypeError);
    });

    it('should add a task with the name MyTestTask', () => {
        // Assert
        const request: AddCommandRequest = {name: 'MyTestTask'};

        // Act
        sut.run(request);

        // Assert
        const tasks = readTasks();
        assert.ok(tasks.length === 1, 'length should be one');
        assert.ok(tasks[0]?.Id === 1, 'Id should be one');
        assert.ok(tasks[0]?.Name === "MyTestTask", 'Name should be MyTestTask');
        assert.ok(tasks[0]?.StatusCode === TaskStatus.TODO, 'Default status code should be TODO');
    });

    it('should add task a second tasks with the name "My second task"', () => {
        // Assert
        const request: AddCommandRequest = {name: 'My second task'};

        // Act
        sut.run(request);

        // Assert
        const tasks = readTasks();
        assert.ok(tasks.length === 2, 'length should be two');
        assert.ok(tasks[1]?.Id === 2, 'Id should be two');
        assert.ok(tasks[1]?.Name === "My second task", 'Name should be "My second task"');
        assert.ok(tasks[1]?.StatusCode === TaskStatus.TODO, 'Default status code should be TODO');
    });
});