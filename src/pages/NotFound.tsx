import { Link } from "react-router";

const NotFound = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "60vh",
        textAlign: "center",
        padding: "2rem",
      }}
    >
      <h1
        style={{
          fontSize: "6rem",
          margin: "0",
          color: "#ccc",
          fontWeight: "bold",
        }}
      >
        404
      </h1>
      <h2
        style={{
          fontSize: "1.5rem",
          margin: "1rem 0",
          color: "#666",
        }}
      >
        Page Not Found
      </h2>
      <p
        style={{
          fontSize: "1rem",
          color: "#888",
          marginBottom: "2rem",
          maxWidth: "500px",
        }}
      >
        Sorry, the page you are looking for doesn't exist. You can go back to
        the homepage or navigate to other pages using the links above.
      </p>
      <Link
        to="/"
        style={{
          padding: "12px 24px",
          backgroundColor: "#007bff",
          color: "white",
          textDecoration: "none",
          borderRadius: "6px",
          fontSize: "1rem",
          transition: "background-color 0.2s",
        }}
        onMouseOver={(e) =>
          ((e.target as HTMLElement).style.backgroundColor = "#0056b3")
        }
        onMouseOut={(e) =>
          ((e.target as HTMLElement).style.backgroundColor = "#007bff")
        }
      >
        Go Home
      </Link>
    </div>
  );
};

export default NotFound;
