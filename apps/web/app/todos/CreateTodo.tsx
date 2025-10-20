"use client";

import { useState } from "react";
import { trpc } from "../../trpc/client";

export default function CreateTodo() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState<"low" | "medium" | "high">("medium");
  const utils = trpc.useUtils();

  const mutation = trpc.todo.createTodo.useMutation({
    onSuccess: () => {
      // Clear form fields or show success message
      setName("");
      setDescription("");
      setDueDate("");
      setPriority("medium");
      utils.todo.getAllTodos.invalidate();
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !description.trim()) return;
    mutation.mutate({
      name,
      description,
      completed: false,
      dueDate,
      priority: priority || undefined,
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 max-w-md mx-auto p-6 bg-white rounded-lg shadow-md"
    >
      <div className="text-2xl font-semibold">Create a Todo</div>
      <div>
        <label className="block mb-1">Name</label>
        <input
          type="text"
          value={name}
          placeholder="Todo name"
          onChange={(e) => setName(e.target.value)}
          className="border p-2 w-full"
          required
        />
      </div>
      <div>
        <label className="block mb-1">Description</label>
        <textarea
          value={description}
          placeholder="Todo description"
          onChange={(e) => setDescription(e.target.value)}
          className="border p-2 w-full"
          required
        />
      </div>
      <div>
        <label className="block mb-1">Due Date</label>
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="border p-2 w-full"
          required
        />
      </div>
      <div>
        <label className="block mb-1">Priority</label>
        <select
          value={priority}
          onChange={(e) =>
            setPriority(e.target.value as "low" | "medium" | "high")
          }
          className="border p-2 w-full"
          required
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>
      <button
        type="submit"
        className="bg-blue-500 w-full cursor-pointer text-white px-4 py-2 rounded"
        disabled={mutation.isPending}
      >
        {mutation.isPending ? "Creating..." : "Create Todo"}
      </button>
      {mutation.isError && (
        <p className="text-red-500">Error: {mutation.error.message}</p>
      )}
      {mutation.isSuccess && (
        <p className="text-green-500">Todo created successfully!</p>
      )}
    </form>
  );
}
