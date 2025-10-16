import { Core } from "../types/core/core.types.js";

export const CodeToTaskStatus = (code: number) => {
  const values = Object.values(Core.TaskStatus);
  const selectedValue = values[code];

  return selectedValue;
}

export const TaskStatusToCode = (taskStatus: Core.TaskStatus) => {
  const values = Object.values(Core.TaskStatus);
  const index = values.indexOf(taskStatus);

  return index === -1 ? undefined : index.toString();
}