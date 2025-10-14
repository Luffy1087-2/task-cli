import { after, afterEach, beforeEach, describe, it } from 'node:test';
import assert from 'node:assert';
import { AddCommandRunner } from '../../src/commands/add.command-runner.js';
import { EditCommandRunner } from '../../src/commands/edit.command-runner.js';
import { DeleteCommandRunner } from '../../src/commands/delete.command-runner.js';
import { ChangeStatusCommandRunner } from '../../src/commands/change-status.command-runner.js';
import { ListCommandRunner } from '../../src/commands/list.command-runner.js';
import { CommandsRunnerFactory } from '../../src/factory/commands-runner.factory.js';
import customStub from '../utils/custom-stub.js';


describe('commands.runner.factory', () => {
  let output: string[] = [];
  
  beforeEach(() => {
    output = [];
    customStub.stubMethod(console, 'log', (s: string) => output.push(s));
  });

  afterEach(() => {
    customStub.restore(console);
  });

  after(() => {
    customStub.restoreAll();
  });

  it('should log error when there are no parameters', () => {
    // Arrange
    process.argv = ['Name', 'Path'];
    const factory = new CommandsRunnerFactory(process.argv);

    // Act
    factory.run();

    // Assert
    assert.equal(output.length, 1);
    assert.equal(output[0], 'No parameter found');
  });

  it('should log error when command is not recognized', () => {
    // Arrange
    const notFoundCommand = 'OtherCommand';
    process.argv = ['Name', 'Path', notFoundCommand];
    const factory = new CommandsRunnerFactory(process.argv);

    // Act
    factory.run();

    // Assert
    assert.equal(output.length, 1);
    assert.equal(output[0], `Command "${notFoundCommand}" is not recognized`);
  });

  it('should run add command', () => {
    // Arrange
    let called = false;
    process.argv = ['Name', 'Path', 'add'];
    const factory = new CommandsRunnerFactory(process.argv);
    customStub.stubMethod(AddCommandRunner.prototype, 'run', () => called = true);

    // Act
    factory.run();

    // Assert
    assert.ok(called, 'run method is not called');
  });

  it('should run edit command', () => {
    // Arrange
    let called = false;
    process.argv = ['Name', 'Path', 'update'];
    const factory = new CommandsRunnerFactory(process.argv);
    customStub.stubMethod(EditCommandRunner.prototype, 'run', () => called = true);

    // Act
    factory.run();

    // Assert
    assert.ok(called, 'run method is not called');
  });

  it('should run delete command', () => {
    // Arrange
    let called = false;
    process.argv = ['Name', 'Path', 'delete'];
    const factory = new CommandsRunnerFactory(process.argv);
    customStub.stubMethod(DeleteCommandRunner.prototype, 'run', () => called = true);

    // Act
    factory.run();

    // Assert
    assert.ok(called, 'run method is not called');
  });

  it('should run mark-in-progress command', () => {
    // Arrange
    let called = false;
    process.argv = ['Name', 'Path', 'mark-in-progress'];
    const factory = new CommandsRunnerFactory(process.argv);
    customStub.stubMethod(ChangeStatusCommandRunner.prototype, 'run', () => called = true);

    // Act
    factory.run();

    // Assert
    assert.ok(called, 'run method is not called');
  });

  it('should run mark-done command', () => {
    // Arrange
    let called = false;
    process.argv = ['Name', 'Path', 'mark-done'];
    const factory = new CommandsRunnerFactory(process.argv);
    customStub.stubMethod(ChangeStatusCommandRunner.prototype, 'run', () => called = true);

    // Act
    factory.run();

    // Assert
    assert.ok(called, 'run method is not called');
  });

  it('should run list command', () => {
    // Arrange
    let called = false;
    process.argv = ['Name', 'Path', 'list'];
    const factory = new CommandsRunnerFactory(process.argv);
    customStub.stubMethod(ListCommandRunner.prototype, 'run', () => called = true);

    // Act
    factory.run();

    // Assert
    assert.ok(called, 'run method is not called');
  });
});