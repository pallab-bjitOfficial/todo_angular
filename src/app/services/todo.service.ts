import { inject, Injectable } from '@angular/core';
import { ITodo } from '../model/todo.model';
import { LocalStorageService } from './localstorage.service';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private todosKey = 'todos';
  localStorage = inject(LocalStorageService);
  constructor() {
    this.loadTodos();
  }

  private loadTodos(): ITodo[] {
    const todosData = this.localStorage.getItem(this.todosKey);
    return todosData ? JSON.parse(todosData) : [];
  }

  private saveTodos(todos: ITodo[]): void {
    this.localStorage.setItem(this.todosKey, JSON.stringify(todos));
  }

  getTodos(): ITodo[] {
    return this.loadTodos();
  }

  addTodo(todo: ITodo): void {
    const todos = this.loadTodos();
    todos.push(todo);
    this.saveTodos(todos);
  }

  updateTodo(updatedTodo: ITodo): void {
    const todos = this.loadTodos().map((todo) =>
      todo.id === updatedTodo.id ? updatedTodo : todo
    );
    this.saveTodos(todos);
  }

  deleteTodo(id: number): void {
    const todos = this.loadTodos().filter((todo) => todo.id !== id);
    this.saveTodos(todos);
  }
}
