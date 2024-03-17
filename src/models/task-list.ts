import { TaskDto } from './task';

export interface TaskList {
  id: string;
  boardId: string;
  name: string;
  order: number;
}

export interface TaskListDto {
  id: string;
  name: string;
  order: number;
  tasks: TaskDto[];
}
