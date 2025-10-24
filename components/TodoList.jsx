"use client";

import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/navigation";

const fetchTodos = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/todos");
  if (!res.ok) throw new Error("Failed to fetch todos");
  return res.json();
};

export default function TodoList() {
  const [showModal, setShowModal] = useState(false);
  const [modalInput, setModalInput] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [darkMode, setDarkMode] = useState(false);
  const [localTodos, setLocalTodos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();
  const todosPerPage = 10;

  const { data: todos = [], isLoading, isError } = useQuery({
    queryKey: ["todos"],
    queryFn: fetchTodos,
  });

  const allTodos = [...localTodos, ...todos];

  const filteredTodos = allTodos.filter((todo) => {
    const matchesSearch = todo.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "completed" && todo.completed) ||
      (statusFilter === "not-completed" && !todo.completed);

    return matchesSearch && matchesStatus;
  });

  useEffect(() => {
    if (!isLoading && searchTerm.trim() !== "" && filteredTodos.length === 0) {
      router.push("/not-found");
    }
  }, [isLoading, searchTerm, filteredTodos.length, router]);

  const indexOfLastTodo = currentPage * todosPerPage;
  const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
  const currentTodos = filteredTodos.slice(indexOfFirstTodo, indexOfLastTodo);
  const totalPages = Math.ceil(filteredTodos.length / todosPerPage);

  const handleAddTodo = () => {
    if (!modalInput.trim()) return;
    const newTodo = {
      id: Math.random(),
      title: modalInput,
      completed: false,
    };
    setLocalTodos((prev) => [newTodo, ...prev]);
    setModalInput("");
    setShowModal(false);
  };

  const handleToggleCompleted = (id) => {
    setLocalTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const handleDelete = (id) => {
    setLocalTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const handleEdit = (id) => {
    const title = prompt("Edit todo title:");
    if (title && title.trim()) {
      setLocalTodos((prev) =>
        prev.map((todo) =>
          todo.id === id ? { ...todo, title: title.trim() } : todo
        )
      );
    }
  };

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Something went wrong while loading todos.</p>;

  return (
    <div
      style={{
        width: "100%",
        maxWidth: "1200px",
        minHeight: "100vh",
        backgroundColor: darkMode ? "#1e1e1e" : "#fff",
        color: darkMode ? "#fff" : "#000",
        padding: "2rem",
        borderRadius: "12px",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
      }}
    >
      <h2
        style={{
          fontSize: "2rem",
          fontWeight: "bold",
          marginBottom: "1.5rem",
          textAlign: "center",
        }}
      >
        CheckMate
      </h2>

      <button
        onClick={() => setDarkMode((prev) => !prev)}
        style={{
          marginBottom: "1rem",
          padding: "0.5rem 1rem",
          borderRadius: "8px",
          border: "none",
          backgroundColor: darkMode ? "#444" : "#ddd",
          color: darkMode ? "#fff" : "#000",
          cursor: "pointer",
        }}
      >
        {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
      </button>

      <select
        value={statusFilter}
        onChange={(e) => {
          setStatusFilter(e.target.value);
          setCurrentPage(1);
        }}
        style={{
          padding: "0.5rem",
          fontSize: "1rem",
          marginBottom: "1rem",
          width: "100%",
          borderRadius: "8px",
          border: "1px solid #ccc",
        }}
      >
        <option value="all">All</option>
        <option value="completed">Completed</option>
        <option value="not-completed">Not Completed</option>
      </select>

      <input
        type="text"
        placeholder="Search todos..."
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          setCurrentPage(1);
        }}
        style={{
          padding: "0.5rem",
          fontSize: "1rem",
          marginBottom: "1rem",
          width: "100%",
          borderRadius: "8px",
          border: "1px solid #ccc",
        }}
      />

      <button
        onClick={() => setShowModal(true)}
        style={{
          padding: "0.4rem 0.8rem",
          fontSize: "0.9rem",
          backgroundColor: "#A888B5",
          color: "#fff",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
          marginBottom: "1rem",
        }}
      >
        ➕ Add Todo
      </button>

      {/* Modal */}
      {showModal && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 999,
          }}
        >
          <div
            style={{
              backgroundColor: "#fff",
              padding: "2rem",
              borderRadius: "10px",
              width: "90%",
              maxWidth: "400px",
              boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
            }}
          >
            <h3 style={{ marginBottom: "1rem" }}>Add a New Todo</h3>
            <input
              type="text"
              value={modalInput}
              onChange={(e) => setModalInput(e.target.value)}
              placeholder="Enter todo title"
              style={{
                width: "100%",
                padding: "0.5rem",
                marginBottom: "1rem",
                borderRadius: "6px",
                border: "1px solid #ccc",
              }}
            />
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                gap: "0.5rem",
              }}
            >
              <button
                onClick={() => setShowModal(false)}
                style={{
                  padding: "0.4rem 0.8rem",
                  backgroundColor: "#ccc",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer",
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleAddTodo}
                style={{
                  padding: "0.4rem 0.8rem",
                  backgroundColor: "#A888B5",
                  color: "#fff",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer",
                }}
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Todo List */}
      <ul
        style={{
          listStyle: "none",
          padding: 0,
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
          gap: "1rem",
        }}
      >
        {currentTodos.map((todo) => (
          <li
            key={todo.id}
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              height: "240px",
              padding: "1.5rem",
              borderRadius: "12px",
              backgroundColor: "#8174A0",
              boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
              color: "#000",
            }}
          >
            <div>
              <label
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  fontWeight: "bold",
                  fontSize: "1.1rem",
                  marginBottom: "1rem",
                }}
              >
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => handleToggleCompleted(todo.id)}
                />
                {todo.title}
              </label>
            </div>

            <div style={{ marginTop: "auto" }}>
              <div
                style={{
                  display: "flex",
                  gap: "0.5rem",
                  marginBottom: "0.5rem",
                }}
              >
                <button
                  onClick={() => handleEdit(todo.id)}
                  style={{
                    padding: "0.3rem 0.6rem",
                    fontSize: "0.9rem",
                    backgroundColor: "#EFB6C8",
                    color: "#000",
                    border: "none",
                    borderRadius: "6px",
                    cursor: "pointer",
                  }}
                >
                  ✏️
                </button>

                <button
                  onClick={() => handleDelete(todo.id)}
                  style={{
                    padding: "0.3rem 0.6rem",
                    fontSize: "0.9rem",
                    backgroundColor: "#EFB6C8",
                    color: "#fff",
                    border: "none",
                    borderRadius: "6px",
                    cursor: "pointer",
                  }}
                >
                  🗑️
                </button>
              </div>

              <Link href={`/todo/${todo.id}`}>
                <button
                  style={{
                    width: "100%",
                    padding: "0.6rem",
                    fontSize: "0.9rem",
                    backgroundColor: "#A888B5",
                    color: "#fff",
                    border: "none",
                    borderRadius: "6px",
                    cursor: "pointer",
                  }}
                >
                  View Todo
                </button>
              </Link>
            </div>
          </li>
        ))}
      </ul>

      {/* Pagination */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "0.5rem",
          marginTop: "2rem",
          flexWrap: "wrap",
        }}
      >
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          style={{
            padding: "0.5rem 0.8rem",
            borderRadius: "6px",
            backgroundColor: "#EFB6C8",
            border: "none",
            cursor: "pointer",
          }}
        >
          Previous
        </button>

        {Array.from({ length: totalPages }, (_, i) => i + 1)
          .filter((page) => Math.abs(page - currentPage) <= 2)
          .map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              style={{
                padding: "0.5rem 0.8rem",
                borderRadius: "6px",
                backgroundColor:
                  page === currentPage ? "#007bff" : "#f0f0f0",
                color: page === currentPage ? "#fff" : "#000",
                border: "none",
                cursor: "pointer",
              }}
            >
              {page}
            </button>
          ))}

        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
          style={{
            padding: "0.5rem 0.8rem",
            borderRadius: "6px",
            backgroundColor: "#EFB6C8",
            border: "none",
            cursor: "pointer",
            marginLeft: "10px",
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
}
