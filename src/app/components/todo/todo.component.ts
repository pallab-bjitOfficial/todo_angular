import { Component, OnInit } from '@angular/core';
import { ITodo } from '../../model/todo.model';
import { TodoService } from '../../services/todo.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
  standalone: true,

  imports: [FormsModule, CommonModule],
})
export class TodoComponent implements OnInit {
  todos: ITodo[] = [];
  newTodoTitle = '';
  editingTodo: ITodo | null = null;

  constructor(private readonly todoService: TodoService) {}

  ngOnInit(): void {
    this.loadTodos();
  }

  loadTodos(): void {
    this.todos = this.todoService.getTodos();
  }

  addTodo(): void {
    if (this.newTodoTitle.trim()) {
      const newTodo: ITodo = {
        id: Date.now(),
        title: this.newTodoTitle,
        completed: false,
      };
      confirm('Are you sure you want to add this todo?') &&
        this.todoService.addTodo(newTodo);
      this.newTodoTitle = '';
      this.loadTodos();
    }
  }

  editTodo(todo: ITodo): void {
    this.editingTodo = { ...todo };
  }

  updateTodo(): void {
    if (this.editingTodo) {
      this.todoService.updateTodo(this.editingTodo);
      this.editingTodo = null;
      this.loadTodos();
    }
  }

  deleteTodo(id: number): void {
    confirm('Are you sure you want to delete this todo?') &&
      this.todoService.deleteTodo(id);
    this.loadTodos();
  }

  toggleComplete(todo: ITodo): void {
    todo.completed = !todo.completed;
    this.todoService.updateTodo(todo);
  }
}
