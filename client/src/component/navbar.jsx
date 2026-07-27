
import { Link } from "react-router-dom";

export function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg bg-white shadow-sm py-3">
      <div className="container">
        {/* Logo */}
        <Link
          to="/"
          className="navbar-brand fw-bold fs-3 text-primary d-flex align-items-center"
        >
          <span className="bi bi-check-circle-fill me-2"></span>
          TaskFlow
        </Link>

        {/* Hamburger Button */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarMenu"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Menu */}
        <div
          className="collapse navbar-collapse justify-content-between"
          id="navbarMenu"
        >
          <ul className="navbar-nav mx-auto">
            <li className="nav-item">
              <Link to="/" className="nav-link">
                Home
              </Link>
            </li>

            <li className="nav-item">
              <Link to="/features" className="nav-link">
                Features
              </Link>
            </li>

            <li className="nav-item">
              <Link to="/solutions" className="nav-link">
                Solutions
              </Link>
            </li>

            <li className="nav-item">
              <Link to="/pricing" className="nav-link">
                Pricing
              </Link>
            </li>

            <li className="nav-item">
              <Link to="/about" className="nav-link">
                About
              </Link>
            </li>
          </ul>

          <Link
            to="/login"
            className="btn btn-primary rounded-pill px-4 mt-3 mt-lg-0"
          >
            Get Started
          </Link>
        </div>
      </div>
    </nav>
  );
}