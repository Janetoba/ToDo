"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import Link from "next/link";

interface Todo {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
}

interface RouteParams {
  id: string;
}

const fetchTodo = async (id: string): Promise<Todo> => {
  const res = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`);
  if (!res.ok) throw new Error("Todo not found");
  return res.json();
};

export default function TodoDetail(): JSX.Element {
  const { id } = useParams<RouteParams>();

  const { data: todo, isLoading, isError } = useQuery<Todo>({
    queryKey: ["todo", id],
    queryFn: () => fetchTodo(id),
  });

  if (isLoading) return <p>Loading todo...</p>;
  if (isError) return <p>Todo not found.</p>;

  return (
    <div
      style={{
        padding: "2rem",
        maxWidth: "600px",
        margin: "0 auto",
        background: "#fff",
        borderRadius: "10px",
        boxShadow: "0 0 10px rgba(0,0,0,0.1)",
      }}
    >
      <h2>Todo Detail</h2>
      <p>
        <strong>ID:</strong> {todo?.id}
      </p>
      <p>
        <strong>Title:</strong> {todo?.title}
      </p>
      <p>
        <strong>Status:</strong>{" "}
        {todo?.completed ? "✅ Completed" : "❌ Not Completed"}
      </p>

      <Link
        href="/"
        style={{
          display: "inline-block",
          marginTop: "1rem",
          color: "#007bff",
        }}
      >
        ← Back to Home
      </Link>
    </div>
  );
}