

import { useCookies } from "react-cookie";
import { Link, Outlet } from "react-router-dom";

export function UserDashboard() {
  const [cookies] = useCookies(["userName"]);

  const Sidebar = () => (
    <>
      <div className="fs-2 fw-bold text-primary mb-4">
        <i className="bi bi-check-circle-fill me-2"></i>
        TaskFlow
      </div>

      <div className="card mb-4">
        <div className="card-body text-center">
          <i className="bi bi-person-circle display-4"></i>
          <h5 className="mt-2">{cookies["userName"]}</h5>
        </div>
      </div>

      <ul className="nav flex-column">

        <li className="nav-item mb-2">
          <Link className="nav-link text-dark" to=".">
            <i className="bi bi-grid me-2"></i>
            Dashboard
          </Link>
        </li>

        <li className="nav-item mb-2">
          <Link className="nav-link text-dark" to="total-task">
            <i className="bi bi-list-task me-2"></i>
            Total Tasks
          </Link>
        </li>

        <li className="nav-item mb-2">
          <Link className="nav-link text-dark" to="complete-appointment">
            <i className="bi bi-check-circle me-2"></i>
            Completed
          </Link>
        </li>

        <li className="nav-item mb-2">
          <Link className="nav-link text-dark" to="pending-task">
            <i className="bi bi-clipboard-check me-2"></i>
            Pending
          </Link>
        </li>

        <li className="nav-item mb-2">
          <Link className="nav-link text-dark" to="calendar">
            <i className="bi bi-calendar me-2"></i>
            Calendar
          </Link>
        </li>

        <li className="nav-item mb-2">
          <Link className="nav-link text-dark" to="settings">
            <i className="bi bi-gear me-2"></i>
            Settings
          </Link>
        </li>

      </ul>

      <Link to="add-task" className="btn btn-primary w-100 mt-4">
        <i className="bi bi-plus-circle me-2"></i>
        Add Task
      </Link>
    </>
  );

  return (
    <div className="container-fluid">
      <div className="row">

        {/* Mobile Sidebar */}
        <div
          className="offcanvas offcanvas-start"
          tabIndex="-1"
          id="sidebarMenu"
        >
          <div className="offcanvas-header">
            <h5 className="text-primary fw-bold">
              <i className="bi bi-check-circle-fill me-2"></i>
              TaskFlow
            </h5>

            <button
              className="btn-close"
              data-bs-dismiss="offcanvas"
            ></button>
          </div>

          <div className="offcanvas-body">
            <Sidebar />
          </div>
        </div>

        {/* Desktop Sidebar */}
        <div className="d-none d-lg-block col-lg-2 bg-light border-end min-vh-100 p-3">
          <Sidebar />
        </div>

        {/* Main Content */}
        <div className="col-12 col-lg-10 p-0">
          <Outlet />
        </div>

      </div>
    </div>
  );
}
