export interface Todo {
  id: string;
  title: string;
  completed: boolean;
}

export type TodoCreate = Omit<Todo, 'id'>;