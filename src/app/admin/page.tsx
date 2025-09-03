import Link from "next/link";

export default function AdminPage() {
  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h1>Admin Panel</h1>
      <p>Welcome to the admin dashboard. Here you can manage blogs.</p>
      <Link
        href="/create-blog"
        style={{
          display: "inline-block",
          padding: "0.75rem 1.5rem",
          backgroundColor: "#007bff",
          color: "white",
          textDecoration: "none",
          borderRadius: "0.25rem",
          fontSize: "1rem",
          fontWeight: "bold",
          marginTop: "1rem",
        }}
      >
        Create Blog
      </Link>
    </div>
  );
}
