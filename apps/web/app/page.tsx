"use client";

import { trpc } from "../trpc/client";

export default function page() {
  const { data } = trpc.todo.getAllTodos.useQuery();
  return (
    <div>
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
      <ul>
        {data?.map((todo) => (
          <li key={todo.id}>{todo.name}</li>
        ))}
      </ul>
    </div>
  );
}
