import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./register.css";

function Register() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: ""
    });

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    function handleChange(e) {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            await axios.post("http://localhost:8080/auth/register",formData);
            alert("Registration successful! Please log in.");
            navigate("/login");
        } catch (err) {
            setError(
                err.response?.data?.message ||
                "Registration failed. Please try again."
            );
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="auth-container">
            <form className="auth-card" onSubmit={handleSubmit}>
                <h1>Create Account</h1>
                <p>Join BusinessHub</p>

                {error && <p className="error">{error}</p>}

                <label>Full Name</label>
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    required
                />

                <label>Email</label>
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    required
                />

                <label>Password</label>
                <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Minimum 8 characters"
                    minLength={8}
                    required
                />

                <button type="submit" disabled={loading}>
                    {loading ? "Registering..." : "Register"}
                </button>

                <p>
                    Already have an account?{" "}
                    <Link to="/login">Login</Link>
                </p>
            </form>
        </div>
    );
}

export default Register;