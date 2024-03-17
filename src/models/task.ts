export interface Task {
  id: string;
  listId: string;
  name: string;
  order: number;
}

export interface TaskDto {
  id: string;
  name: string;
  order: number;
}
