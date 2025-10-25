"use client";

import Link from "next/link";

export default function NotFound(): JSX.Element {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        padding: "2rem",
        backgroundColor: "#f9f9f9",
        color: "#333",
        textAlign: "center",
      }}
    >
      <h1 style={{ fontSize: "4rem", color: "#A888B5" }}>404</h1>
      <p style={{ fontSize: "1.2rem" }}>
        The page you're looking for doesn't exist.
      </p>
      <Link
        href="/"
        style={{
          marginTop: "1rem",
          padding: "0.5rem 1.2rem",
          backgroundColor: "#EFB6C8",
          color: "#000",
          borderRadius: "6px",
          textDecoration: "none",
          fontWeight: "bold",
        }}
      >
        Back to Home
      </Link>
    </div>
  );
}