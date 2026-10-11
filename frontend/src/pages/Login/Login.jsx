
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css";

function Login() {
    const [formData, setFormData] = useState({
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
            const response = await axios.post(
                "http://localhost:8080/auth/login",
                formData
            );

            localStorage.setItem("token", response.data.token);

            if (response.data.user) {
                localStorage.setItem("user",JSON.stringify(response.data.user));
            }

            navigate("/dashboard");

        } catch (err) {
            setError(
                err.response?.data?.message ||
                "Login failed. Please check your credentials."
            );
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="login-container">
            <form className="login-card" onSubmit={handleSubmit}>
                <div className="login-brand">
                    <div className="login-logo">B</div>
                    <span>BusinessHub</span>
                </div>

                <h1>Welcome Back</h1>
                <p className="login-subtitle">
                    Sign in to continue to your account
                </p>

                {error && (
                    <p className="login-error">
                        {error}
                    </p>
                )}

                <label htmlFor="email">Email Address</label>
                <input
                    id="email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    autoComplete="email"
                    required
                />

                <label htmlFor="password">Password</label>
                <input
                    id="password"
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    autoComplete="current-password"
                    required
                />

                <button type="submit" disabled={loading}>
                    {loading ? "Signing in..." : "Sign In"}
                </button>

                <p className="login-footer">
                    Don't have an account?{" "}
                    <Link to="/register">Create account</Link>
                </p>
            </form>
        </div>
    );
}

export default Login;
