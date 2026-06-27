import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TodoService } from './services/todo.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class AppComponent {
  todoService = inject(TodoService);
  newTodoTitle = signal('');

  async onCreateTodo() {
    const title = this.newTodoTitle().trim();
    if (!title) return;
    
    await this.todoService.addTodo(title);
    this.newTodoTitle.set(''); // Reset input
  }
}