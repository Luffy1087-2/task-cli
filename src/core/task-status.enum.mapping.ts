import { TaskStatus } from "../types/core/task.types.js";

export const CodeToTaskStatus = (code: number) => {
  const values = Object.values(TaskStatus);
  const selectedValue = values[code];

  return selectedValue;
}

export const TaskStatusToCode = (taskStatus: TaskStatus) => {
  const values = Object.values(TaskStatus);
  const index = values.indexOf(taskStatus);

  return index === -1 ? undefined : index;
}