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

const fetchTodo = async (id: string): Promise<Todo> => {
  const res = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`);
  if (!res.ok) throw new Error("Todo not found");
  return res.json();
};

export default function TodoDetail() {
  const params = useParams();
  const id = params?.id as string;

  const { data: todo, isLoading, isError } = useQuery<Todo>({
    queryKey: ["todo", id],
    queryFn: () => fetchTodo(id),
    enabled: !!id,
  });

  if (isLoading) return <p style={{ textAlign: 'center', padding: '2rem' }}>Loading todo...</p>;
  if (isError || !todo) return <p style={{ textAlign: 'center', padding: '2rem', color: 'red' }}>Todo not found.</p>;

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
      <h2 style={{ marginBottom: "1.5rem", fontSize: "2rem" }}>Todo Detail</h2>
      <p style={{ marginBottom: "1rem" }}>
        <strong>ID:</strong> {todo.id}
      </p>
      <p style={{ marginBottom: "1rem" }}>
        <strong>Title:</strong> {todo.title}
      </p>
      <p style={{ marginBottom: "1rem" }}>
        <strong>Status:</strong>{" "}
        {todo.completed ? "✅ Completed" : "❌ Not Completed"}
      </p>
      <p style={{ marginBottom: "1rem" }}>
        <strong>User ID:</strong> {todo.userId}
      </p>

      <Link
        href="/"
        style={{
          display: "inline-block",
          marginTop: "1rem",
          padding: "0.75rem 1.5rem",
          backgroundColor: "#A888B5",
          color: "#fff",
          borderRadius: "8px",
          textDecoration: "none",
          fontWeight: "bold",
        }}
      >
        ← Back to Home
      </Link>
    </div>
  );
}