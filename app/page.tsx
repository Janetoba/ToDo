"use client";

import TodoList from "../components/TodoList";

export default function Page(): JSX.Element {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        minHeight: "100vh",
        backgroundColor: "#eaeaea",
        padding: "2rem",
      }}
    >
      <TodoList />
    </div>
  );
}