import PropTypes from "prop-types";
import { Link, useLocation } from "react-router-dom";

export default function Navbar({
    Mode,
    title,
    aboutText,
    toggelMode,
    userExists,
    LogOut,
    userName,
    Role
}) {

    const location = useLocation();

    const isActive = (path) =>
        location.pathname === path ? "nav-link active fw-bold" : "nav-link";

    return (
        <nav className={`navbar navbar-expand-lg navbar-${Mode} bg-${Mode} shadow-sm`}>
            <div className="container-fluid">

                {/*  BRAND */}
                <Link className="navbar-brand fw-bold" to="/">
                    🚀 {title}
                </Link>

                {/*  TOGGLER */}
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                {/*  NAV CONTENT */}
                <div className="collapse navbar-collapse" id="navbarSupportedContent">

                    {/* LEFT MENU */}
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">

                        <li className="nav-item">
                            <Link className={isActive("/")} to="/">Home</Link>
                        </li>

                        <li className="nav-item">
                            <Link className={isActive("/about")} to="/about">
                                {aboutText}
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link className={isActive("/Datapassing")} to="/Datapassing">
                                Datapassing
                            </Link>
                        </li>

                        {/*  Show only when logged in */}
                        {userExists && Role === "Admin" && (
                            <li className="nav-item">
                                <Link className={isActive("/Employees")} to="/Employees">
                                    Employees
                                </Link>
                            </li>
                        )}

                    </ul>

                    {/* RIGHT SIDE */}
                    <div className="d-flex align-items-center gap-3">

                        {/* 👤 USER INFO */}
                        {userExists && (
                            <span className="fw-semibold">
                                👋 Welcome {userName}
                            </span>
                        )}

                        {/*  LOGIN / LOGOUT */}
                        {userExists ? (
                            <button
                                className="btn btn-danger btn-sm"
                                onClick={LogOut}
                            >
                                Logout
                            </button>
                        ) : (
                            <Link className="btn btn-primary btn-sm" to="/Login">
                                Login
                            </Link>
                        )}

                        {/* 🌙 MODE SWITCH */}
                        <div className={`form-check form-switch text-${Mode === 'light' ? 'dark' : 'light'}`}>
                            <input
                                className="form-check-input"
                                onChange={toggelMode}
                                type="checkbox"
                                role="switch"
                            />
                            <label className="form-check-label">Mode</label>
                        </div>

                    </div>

                </div>
            </div>
        </nav>
    );
}

Navbar.propTypes = {
    title: PropTypes.string.isRequired,
    aboutText: PropTypes.string
};

Navbar.defaultProps = {
    title: "My App",
    aboutText: "About"
};