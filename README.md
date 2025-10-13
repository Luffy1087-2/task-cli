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
- edit
- changeStatus
- delete
- list

## HOW TO EXECUTE A COMMAND

**Note: The commands should run from the root directory**

### Adding a task
The **add** command accepts the name of the task as parameter

`task-cli add \"My task\"`

**Note**: If you want to include spaces in the task name, you should enclose the name in double quotes escaped with \\"

### Editing a task name
The **edit** command accepts Id of the task and the new name of the task as parameters

`task-cli edit 1 \"My task number one\"`

### Change the status of a task

A task status can be one of the following codes:
- 1 = TODO (default one)
- 2 = PROGRESS
- 3 = DONE

The **changeStatus** command accepts the Id of the task and the new status code as parameters

Example chaging the task code to **3** (**DONE**) for the task with the Id **1**
`task-cli changeStatus 1 3`

### Deleting a task
The **delete** command accepts Id of the task as parameter

`task-cli delete 1`

### List tasks

#### List all tasks
`task-cli list`

#### List tasks filtered by status code

In this example, in progess tasks are listed:

`task-cli list 1`

## HOWW TO RUN TESTS

`npm run test`
