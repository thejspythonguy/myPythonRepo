import { Injectable, inject, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Todo, TodoCreate } from '../models/todo.model';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8000/api/todos';

  // State Management via Signals
  #todosState = signal<Todo[]>([]);
  
  // Publicly exposed read-only signals
  todos = this.#todosState.asReadonly();
  completedCount = computed(() => this.#todosState().filter(t => t.completed).length);
  uncompletedCount = computed(() => this.#todosState().filter(t => !t.completed).length);

  constructor() {
    this.loadTodos();
  }

  async loadTodos() {
    try {
      const data = await firstValueFrom(this.http.get<Todo[]>(this.apiUrl));
      this.#todosState.set(data);
    } catch (error) {
      console.error('Failed to load todos', error);
    }
  }

  async addTodo(title: string) {
    const payload: TodoCreate = { title, completed: false };
    try {
      const newTodo = await firstValueFrom(this.http.post<Todo>(this.apiUrl, payload));
      this.#todosState.update(todos => [...todos, newTodo]);
    } catch (error) {
      console.error('Failed to add todo', error);
    }
  }

  async toggleTodo(todo: Todo) {
    const payload: TodoCreate = { title: todo.title, completed: !todo.completed };
    try {
      const updated = await firstValueFrom(this.http.put<Todo>(`${this.apiUrl}/${todo.id}`, payload));
      this.#todosState.update(todos => todos.map(t => t.id === todo.id ? updated : t));
    } catch (error) {
      console.error('Failed to update todo', error);
    }
  }

  async deleteTodo(id: string) {
    try {
      await firstValueFrom(this.http.delete(`${this.apiUrl}/${id}`));
      this.#todosState.update(todos => todos.filter(t => t.id !== id));
    } catch (error) {
      console.error('Failed to delete todo', error);
    }
  }
}