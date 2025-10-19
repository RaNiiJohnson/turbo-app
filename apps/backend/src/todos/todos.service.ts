import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTodoInput, Todo } from './todo.schema';

@Injectable()
export class TodosService {
  private todos: Todo[] = [];

  getTodoById(id: string) {
    const todo = this.todos.find((t) => t.id === id);
    if (!todo) {
      throw new NotFoundException('Todo not found');
    }
    return todo;
  }

  getAllTodos() {
    return this.todos;
  }

  createTodo(todoData: CreateTodoInput) {
    const todo: Todo = {
      ...todoData,
      id: Math.random().toString(36).substring(2, 15),
      createdAt: new Date().toISOString(),
    };
    this.todos.push(todo);
    return todo;
  }

  updateTodo(id: string, data: Partial<CreateTodoInput>) {
    const todoIndex = this.todos.findIndex((t) => t.id === id);
    if (todoIndex === -1) {
      throw new NotFoundException('Todo not found');
    }
    this.todos[todoIndex] = {
      ...this.todos[todoIndex],
      ...data,
    };
    return this.todos[todoIndex];
  }

  deleteTodo(id: string) {
    const todoIndex = this.todos.findIndex((t) => t.id === id);
    if (todoIndex === -1) {
      throw new NotFoundException('Todo not found');
    }
    this.todos.splice(todoIndex, 1);
    return true;
  }
}
