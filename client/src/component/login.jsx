import {Link} from "react-router-dom";
import { LoginCard } from "./loginCard";

export function Login() {
  return (
    <div
      className="container-fluid d-flex justify-content-center align-items-center min-vh-100"
    >
      <div className="row justify-content-center w-100">
        <div className="col-11 col-sm-9 col-md-7 col-lg-5 col-xl-4">
          <div className="shadow p-4 rounded bg-white">
            <div className="text-center mb-3 fs-1 fw-bold bi bi-check-circle text-info-emphasis"> TaskFlow</div>

            <h3 className="text-center fw-bold">Welcome Back</h3>

            <p className="text-center text-secondary mb-4">
              The focus-first engine for high-performance teams
            </p>

            <div>
              <LoginCard />
            </div>

      
          </div>
        </div>
      </div>
    </div>
  );
}

