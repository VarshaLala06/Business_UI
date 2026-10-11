import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar/Sidebar";
import "./Dashboard.css";

const API_URL = "http://localhost:8080/api/clients";

function Dashboard() {
  const navigate = useNavigate();

  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const user = JSON.parse(localStorage.getItem("user") || "null");
  const role = user?.role || "employee";

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await axios.get(API_URL, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = response.data;

        if (Array.isArray(data)) {
          setClients(data);
        } else if (Array.isArray(data.clients)) {
          setClients(data.clients);
        } else {
          setClients([]);
        }
      } catch (err) {
        setError(
          err.response?.data?.message ||
            "Unable to load dashboard data. Please try again."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchClients();
  }, []);

  const activeClients = clients.filter(
    (client) => client.status === "Active"
  ).length;

  const inactiveClients = clients.filter(
    (client) => client.status === "Inactive"
  ).length;

  const recentClients = [...clients]
    .sort(
      (a, b) =>
        new Date(b.createdAt || 0) - new Date(a.createdAt || 0)
    )
    .slice(0, 5);

  const getInitials = (name) => {
    if (!name) return "U";

    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
  };

  const formatDate = (date) => {
    if (!date) return "—";

    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="dashboard-layout">
      <Sidebar />

      <main className="dashboard-main">
        <header className="dashboard-header">
          <div>
            <p className="dashboard-breadcrumb">
              Workspace <span>/</span> Dashboard
            </p>

            <h1>
              Welcome back{user?.name ? `, ${user.name}` : ""}!
            </h1>

            <p className="dashboard-subtitle">
              Here's what's happening with your business today.
            </p>
          </div>

          <button
            className="dashboard-primary-btn"
            onClick={() => navigate("/clients")}
          >
            View Clients <span>→</span>
          </button>
        </header>

        {error && (
          <div className="dashboard-error" role="alert">
            <span>⚠</span> {error}
          </div>
        )}

        <section className="dashboard-welcome-card">
          <div className="dashboard-welcome-content">
            <span className="dashboard-welcome-label">
              BUSINESS OVERVIEW
            </span>

            <h2>Your business, all in one place.</h2>

            <p>
              Keep track of your clients, monitor their status, and
              manage your business relationships from one workspace.
            </p>

            <button
              className="dashboard-welcome-btn"
              onClick={() => navigate("/clients")}
            >
              Manage Clients <span>→</span>
            </button>
          </div>

          <div className="dashboard-welcome-icon" aria-hidden="true">
            <div className="dashboard-icon-circle">
              <span>▥</span>
            </div>
            <div className="dashboard-floating-dot dot-one"></div>
            <div className="dashboard-floating-dot dot-two"></div>
            <div className="dashboard-floating-dot dot-three"></div>
          </div>
        </section>

        <section className="dashboard-section">
          <div className="dashboard-section-heading">
            <div>
              <h2>Overview</h2>
              <p>A quick look at your client activity.</p>
            </div>

            <span className="dashboard-updated-label">
              <span className="dashboard-live-dot"></span>
              Live data
            </span>
          </div>

          <div className="dashboard-stats">
            <article className="dashboard-stat-card">
              <div className="dashboard-stat-top">
                <div className="dashboard-stat-icon total-icon">
                  <span>▤</span>
                </div>
                <span className="dashboard-stat-tag">All clients</span>
              </div>

              <p className="dashboard-stat-label">Total Clients</p>

              <h3>
                {loading ? "—" : clients.length}
              </h3>

              <p className="dashboard-stat-description">
                Clients in your workspace
              </p>
            </article>

            <article className="dashboard-stat-card">
              <div className="dashboard-stat-top">
                <div className="dashboard-stat-icon active-icon">
                  <span>✓</span>
                </div>
                <span className="dashboard-stat-tag active-tag">
                  Active
                </span>
              </div>

              <p className="dashboard-stat-label">Active Clients</p>

              <h3>
                {loading ? "—" : activeClients}
              </h3>

              <p className="dashboard-stat-description">
                Currently active relationships
              </p>
            </article>

            <article className="dashboard-stat-card">
              <div className="dashboard-stat-top">
                <div className="dashboard-stat-icon inactive-icon">
                  <span>◷</span>
                </div>
                <span className="dashboard-stat-tag inactive-tag">
                  Inactive
                </span>
              </div>

              <p className="dashboard-stat-label">Inactive Clients</p>

              <h3>
                {loading ? "—" : inactiveClients}
              </h3>

              <p className="dashboard-stat-description">
                Clients marked as inactive
              </p>
            </article>

            <article className="dashboard-stat-card">
              <div className="dashboard-stat-top">
                <div className="dashboard-stat-icon role-icon">
                  <span>♙</span>
                </div>
                <span className="dashboard-stat-tag role-tag">
                  Account
                </span>
              </div>

              <p className="dashboard-stat-label">Your Role</p>

              <h3 className="dashboard-role-value">
                {role.charAt(0).toUpperCase() + role.slice(1)}
              </h3>

              <p className="dashboard-stat-description">
                Your workspace access level
              </p>
            </article>
          </div>
        </section>

        <section className="dashboard-recent-card">
          <div className="dashboard-recent-header">
            <div>
              <h2>Recent Clients</h2>
              <p>Recently added clients in your workspace.</p>
            </div>

            <button
              className="dashboard-text-btn"
              onClick={() => navigate("/clients")}
            >
              View all <span>→</span>
            </button>
          </div>

          {loading ? (
            <div className="dashboard-state">
              <div className="dashboard-spinner"></div>
              <p>Loading clients...</p>
            </div>
          ) : error ? (
            <div className="dashboard-state">
              <p>Client information could not be loaded.</p>
              <button
                className="dashboard-retry-btn"
                onClick={() => window.location.reload()}
              >
                Try again
              </button>
            </div>
          ) : recentClients.length === 0 ? (
            <div className="dashboard-empty">
              <div className="dashboard-empty-icon">▤</div>
              <h3>No clients yet</h3>
              <p>
                Your client list is empty. Visit the Clients page to get
                started.
              </p>

              <button
                className="dashboard-primary-btn"
                onClick={() => navigate("/clients")}
              >
                Go to Clients <span>→</span>
              </button>
            </div>
          ) : (
            <div className="dashboard-table-wrapper">
              <table className="dashboard-table">
                <thead>
                  <tr>
                    <th>COMPANY</th>
                    <th>CONTACT PERSON</th>
                    <th>EMAIL</th>
                    <th>STATUS</th>
                    <th>DATE ADDED</th>
                  </tr>
                </thead>

                <tbody>
                  {recentClients.map((client) => (
                    <tr key={client._id}>
                      <td>
                        <div className="dashboard-company-cell">
                          <div className="dashboard-company-avatar">
                            {getInitials(client.companyName)}
                          </div>

                          <span className="dashboard-company-name">
                            {client.companyName || "Unnamed company"}
                          </span>
                        </div>
                      </td>

                      <td>{client.contactPerson || "—"}</td>

                      <td className="dashboard-email-cell">
                        {client.email || "—"}
                      </td>

                      <td>
                        <span
                          className={`dashboard-status ${
                            client.status === "Active"
                              ? "status-active"
                              : "status-inactive"
                          }`}
                        >
                          <span className="dashboard-status-dot"></span>
                          {client.status || "Unknown"}
                        </span>
                      </td>

                      <td>{formatDate(client.createdAt)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <div className="dashboard-recent-footer">
            <span>
              Showing {loading ? "—" : recentClients.length} of{" "}
              {loading ? "—" : clients.length} clients
            </span>

            <button
              className="dashboard-footer-link"
              onClick={() => navigate("/clients")}
            >
              Open client management →
            </button>
          </div>
        </section>

        <footer className="dashboard-footer">
          <span>BusinessHub</span>
          <span>Manage relationships. Grow your business.</span>
        </footer>
      </main>
    </div>
  );
}

export default Dashboard;