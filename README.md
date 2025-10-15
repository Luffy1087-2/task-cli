# task-tracker-cli

Utility for creating and managing tasks from the cli

## REQUIREMENTS
nodejs (version >= 22.0.0)

## INSTALLATION
- git clone [git@github.com:Luffy1087-2/task-cli.git](git@github.com:Luffy1087-2/task-cli.git)
- go to task-cli directory (cd task-cli)
- npm i
- npm run compile:rebuild
- npm link

## ALLOWED COMMANDS
- add
- update
- mark-in-progress
- mark-done
- delete
- list

## HOW TO EXECUTE A COMMAND

**Note: The commands should run from the root directory**

### Adding a task

The **add** command accepts the name of the task as parameter

`task-cli add \"My task\"`

**Note**: If you want to include spaces in the task name, you should enclose the name in double quotes escaped with \\"

### Update a task name

The **update** command accepts id of the task and the updated name as parameters

`task-cli update 1 \"My task number one\"`

### Change the status of a task

A task status can be as follows:
- 0 = todo (default one)
- 1 = in-progress
- 2 = done

### Mark a task in-progress

Example changing the code to **1** (**IN-PROGRESS**) for the task with the id **1**

`task-cli mark-in-progress 1`

### Mark a task done

Example changing the code to **2** (**DONE**) for the task with the id **1**

`task-cli mark-done 1`

### Deleting a task

The **delete** command accepts id of the task as parameter

`task-cli delete 1`

### List tasks

#### List all tasks

`task-cli list`

#### List tasks filtered by status code

In this example, in progess tasks are listed:

`task-cli list 1`

## HOW TO RUN TESTS

`npm run test`
