"use client";

import { trpc } from "../../trpc/client";
import CreateTodo from "./CreateTodo";

export default function page() {
  const { data: todos } = trpc.todo.getAllTodos.useQuery();
  const utils = trpc.useUtils();
  const updateMutation = trpc.todo.updateTodo.useMutation({
    onSuccess: () => {
      utils.todo.getAllTodos.invalidate();
    },
  });
  const deleteMutation = trpc.todo.deleteTodo.useMutation({
    onSuccess: () => {
      utils.todo.getAllTodos.invalidate();
    },
  });

  const handleToggle = (todoId: string, completed: boolean) => {
    updateMutation.mutate({
      id: todoId,
      data: {
        completed,
      },
    });
  };

  const handleDelete = (todoId: string) => {
    if (confirm("Are you sure you want to delete this todo?")) {
      deleteMutation.mutate({ id: todoId });
    }
  };

  return (
    <div className="space-y-6 p-6 max-w-2xl mx-auto">
      <CreateTodo />;
      {todos?.map((todo) => (
        <div
          key={todo.id}
          className="flex items-center justify-between p-4 border rounded-lg"
        >
          <div>
            <div className="font-semibold">{todo.name}</div>
            <div className="text-sm text-gray-600">{todo.description}</div>
            {todo.dueDate && (
              <div className="text-sm text-gray-500">
                Due: {new Date(todo.dueDate).toLocaleDateString()}
              </div>
            )}
            <div className="text-sm text-gray-500">
              Priority: {todo.priority}
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={(e) => handleToggle(todo.id, e.target.checked)}
            />
            <button
              onClick={() => handleDelete(todo.id)}
              className="text-red-500 hover:underline"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
