
import { useEffect, useState } from "react";
import axios from "axios";
import "./clients.css";
import Sidebar from "../../components/Sidebar/Sidebar";

const API_URL = "http://localhost:8080/clients";

function Clients() {
    const [clients, setClients] = useState([]);
    const [formData, setFormData] = useState({
        companyName: "",
        contactPerson: "",
        email: "",
        phone: "",
        status: "Active"
    });

    const [editingId, setEditingId] = useState(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    async function fetchClients() {
        setLoading(true);
        setError("");

        try {
            const token = localStorage.getItem("token");

            const response = await axios.get(API_URL, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            // Supports either an array or { clients: [...] }
            const data = response.data;
            setClients(Array.isArray(data) ? data : data.clients || []);
        } catch (err) {
            setError(
                err.response?.data?.message ||
                "Unable to load clients."
            );
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchClients();
    }, []);

    function handleChange(e) {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }

    function resetForm() {
        setFormData({
            companyName: "",
            contactPerson: "",
            email: "",
            phone: "",
            status: "Active"
        });
        setEditingId(null);
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setError("");

        try {
            const token = localStorage.getItem("token");

            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            };

            if (editingId) {
                await axios.put(
                    `${API_URL}/${editingId}`,
                    formData,
                    config
                );
            } else {
                await axios.post(API_URL, formData, config);
            }

            resetForm();
            await fetchClients();
        } catch (err) {
            setError(
                err.response?.data?.message ||
                "Unable to save client."
            );
        }
    }

    function handleEdit(client) {
        setFormData({
            companyName: client.companyName || "",
            contactPerson: client.contactPerson || "",
            email: client.email || "",
            phone: client.phone || "",
            status: client.status || "Active"
        });

        setEditingId(client._id);
        setError("");

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }

    async function handleDelete(id) {
        const confirmed = window.confirm(
            "Are you sure you want to delete this client?"
        );

        if (!confirmed) return;

        setError("");

        try {
            const token = localStorage.getItem("token");

            await axios.delete(`${API_URL}/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (editingId === id) {
                resetForm();
            }

            await fetchClients();
        } catch (err) {
            setError(
                err.response?.data?.message ||
                "Unable to delete client."
            );
        }
    }

    return (
        <div className="clients-page">
          <Sidebar/>
          <main className="clients-main">
            <div className="clients-header">
                <div>
                    <h1>Clients</h1>
                    <p>Manage your business relationships.</p>
                </div>

                <div className="clients-count">
                    {clients.length} clients
                </div>
            </div>

            {error && (
                <div className="clients-error" role="alert">
                    {error}
                </div>
            )}

            <section className="client-form-card">
                <h2>
                    {editingId ? "Edit Client" : "Add New Client"}
                </h2>

                <form onSubmit={handleSubmit}>
                    <div className="client-form-grid">
                        <div className="client-field">
                            <label htmlFor="companyName">
                                Company Name
                            </label>
                            <input
                                id="companyName"
                                name="companyName"
                                value={formData.companyName}
                                onChange={handleChange}
                                placeholder="Enter company name"
                                required
                            />
                        </div>

                        <div className="client-field">
                            <label htmlFor="contactPerson">
                                Contact Person
                            </label>
                            <input
                                id="contactPerson"
                                name="contactPerson"
                                value={formData.contactPerson}
                                onChange={handleChange}
                                placeholder="Enter contact name"
                                required
                            />
                        </div>

                        <div className="client-field">
                            <label htmlFor="clientEmail">
                                Email Address
                            </label>
                            <input
                                id="clientEmail"
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="name@company.com"
                                required
                            />
                        </div>

                        <div className="client-field">
                            <label htmlFor="phone">Phone Number</label>
                            <input
                                id="phone"
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                placeholder="Enter phone number"
                                required
                            />
                        </div>

                        <div className="client-field">
                            <label htmlFor="status">Status</label>
                            <select
                                id="status"
                                name="status"
                                value={formData.status}
                                onChange={handleChange}
                            >
                                <option value="Active">Active</option>
                                <option value="Inactive">Inactive</option>
                            </select>
                        </div>
                    </div>

                    <div className="client-form-actions">
                        <button type="submit" className="client-primary-btn">
                            {editingId ? "Update Client" : "Add Client"}
                        </button>

                        {editingId && (
                            <button
                                type="button"
                                className="client-secondary-btn"
                                onClick={resetForm}
                            >
                                Cancel
                            </button>
                        )}
                    </div>
                </form>
            </section>

            <section className="client-list-card">
                <div className="client-list-header">
                    <h2>All Clients</h2>
                    <button
                        type="button"
                        className="client-secondary-btn"
                        onClick={fetchClients}
                        disabled={loading}
                    >
                        {loading ? "Loading..." : "Refresh"}
                    </button>
                </div>

                {loading ? (
                    <p className="clients-empty">Loading clients...</p>
                ) : clients.length === 0 ? (
                    <p className="clients-empty">
                        No clients yet. Add your first client above.
                    </p>
                ) : (
                    <div className="client-table-wrapper">
                        <table className="client-table">
                            <thead>
                                <tr>
                                    <th>Company</th>
                                    <th>Contact Person</th>
                                    <th>Email</th>
                                    <th>Phone</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>

                            <tbody>
                                {clients.map((client) => (
                                    <tr key={client._id}>
                                        <td className="company-name">
                                            {client.companyName}
                                        </td>
                                        <td>{client.contactPerson}</td>
                                        <td>{client.email}</td>
                                        <td>{client.phone}</td>
                                        <td>
                                            <span
                                                className={`client-status ${
                                                    client.status === "Active"
                                                        ? "active"
                                                        : "inactive"
                                                }`}
                                            >
                                                {client.status || "Active"}
                                            </span>
                                        </td>
                                        <td>
                                            <div className="client-row-actions">
                                                <button
                                                    type="button"
                                                    className="edit-btn"
                                                    onClick={() =>
                                                        handleEdit(client)
                                                    }
                                                >
                                                    Edit
                                                </button>

                                                <button
                                                    type="button"
                                                    className="delete-btn"
                                                    onClick={() =>
                                                        handleDelete(client._id)
                                                    }
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </section>
        </main>
        </div>

    );
}

export default Clients;
