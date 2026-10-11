
import { NavLink, useNavigate } from "react-router-dom";
import "./sidebar.css";

function Sidebar() {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("user") || "null");

    function handleLogout() {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
    }

    return (
        <aside className="sidebar">
            <div className="sidebar-brand">
                <div className="sidebar-logo">B</div>
                <h2>BusinessHub</h2>
            </div>

            <div className="sidebar-user">
                <div className="sidebar-avatar">
                    {user?.name?.charAt(0).toUpperCase() || "U"}
                </div>
                <div>
                    <p className="sidebar-user-name">{user?.name || "User"}</p>
                    <span className="sidebar-user-role">
                        {user?.role || "employee"}
                    </span>
                </div>
            </div>

            <nav className="sidebar-nav">
                <p className="sidebar-section-title">MAIN MENU</p>

                <NavLink to="/dashboard" className="sidebar-link">
                    <span>▦</span> Dashboard
                </NavLink>

                <NavLink to="/clients" className="sidebar-link">
                    <span>♙</span> Clients
                </NavLink>
            </nav>

            <div className="sidebar-bottom">
                <button
                    className="sidebar-logout"
                    onClick={handleLogout}
                >
                    <span>↪</span> Logout
                </button>
            </div>
        </aside>
    );
}

export default Sidebar;
