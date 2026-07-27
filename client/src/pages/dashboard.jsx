import { useCookies } from "react-cookie";
import { DashboardHeader } from "../controlled-component/dashboard-header";
import { Link } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { useFetchData } from "../hooks/fetch-data";
// import { useCompleteAppointment } from "../hooks/complete-appointment";
// import { response } from "express";

export function Dashboard() {
  const [cookies] = useCookies(["userName", "userEmail"]);

  // const [completeAppointment,setCompleteAppointments]=useState([])

  // const LoadAppointment=useCallback(()=>{
  //   axios.get(`http://127.0.0.1:3000/appointments/${cookies["userEmail"]}`).then(response=>{
  //     console.log(response.data);
  //   })
  // },[cookies])

  // useEffect(()=>{
  //   LoadAppointment();
  // },[LoadAppointment])

  //get appointment
  const appointments = useFetchData(
    `http://127.0.0.1:3000/appointments/${cookies["userEmail"]}`,
  );

  //get appointment based on the date
  // const LoadCompleteAppointment=useCallback(()=>{
  //   axios.get(`http://127.0.0.1:3000/completeAppointment/${cookies["userEmail"]}`).then(response=>{

  //   })
  // },[cookies])

  // useEffect(()=>{
  //   LoadCompleteAppointment()
  // },[LoadCompleteAppointment])

  //completed appointment
  const completeAppointment = useFetchData(
    `http://127.0.0.1:3000/completeAppointment/${cookies["userEmail"]}`,
  );

  //pending appointment
  const pendingAppointment = useFetchData(
    `http://127.0.0.1:3000/pendingAppointment/${cookies["userEmail"]}`,
  );

  return (
    <div>
      <DashboardHeader title="TaskFlow" icon="bi-check-circle" />

      <div className="container-fluid">
        {/* Hero */}

        <div className="row bg-primary text-white rounded-4 p-4 mx-2 mx-md-3 my-3 align-items-center">
          <div className="col-12 col-lg-6">
            <h2 className="fw-bold">Hello, {cookies["userName"]}!</h2>

            <p className="mt-3">
              You've completed 75% of your tasks today. Keep up the momentum to
              finish your goals!
            </p>

            <button className="btn btn-light text-primary fw-bold">
              View Daily Report
            </button>
          </div>

          <div className="col-lg-6 text-center d-none d-lg-block">
            <span
              className="bi bi-check-circle opacity-25"
              style={{ fontSize: "180px" }}
            ></span>
          </div>
        </div>

        {/* Cards */}

        <div className="row g-4 p-3">
          <div className="col-12 col-md-6 col-xl-3">
            <div className="card h-100 shadow-sm">
              <div className="card-body">
                <div className="d-flex justify-content-between">
                  <span className="bg-primary-subtle p-3 rounded">
                    <i className="bi bi-list-ul"></i>
                  </span>

                  <Link to="total-task">
                    <i className="bi bi-arrow-right"></i>
                  </Link>
                </div>

                <h5 className="mt-4">Total Tasks</h5>

                <h2>{appointments.length}</h2>
              </div>
            </div>
          </div>

          <div className="col-12 col-md-6 col-xl-3">
            <div className="card h-100 shadow-sm">
              <div className="card-body">
                <div className="d-flex justify-content-between">
                  <span className="bg-success-subtle p-3 rounded">
                    <i className="bi bi-check-circle"></i>
                  </span>

                  <Link to="complete-appointment">
                    <i className="bi bi-arrow-right"></i>
                  </Link>
                </div>

                <h5 className="mt-4">Completed</h5>

                <h2>{completeAppointment.length}</h2>
              </div>
            </div>
          </div>

          <div className="col-12 col-md-6 col-xl-3">
            <div className="card h-100 shadow-sm">
              <div className="card-body">
                <div className="d-flex justify-content-between">
                  <span className="bg-warning-subtle p-3 rounded">
                    <i className="bi bi-clipboard-check"></i>
                  </span>

                  <Link to="pending-task">
                    <i className="bi bi-arrow-right"></i>
                  </Link>
                </div>

                <h5 className="mt-4">Pending</h5>

                <h2>{pendingAppointment.length}</h2>
              </div>
            </div>
          </div>

          <div className="col-12 col-md-6 col-xl-3">
            <div className="card h-100 shadow-sm">
              <div className="card-body">
                <div className="d-flex justify-content-between">
                  <span className="bg-danger-subtle p-3 rounded">
                    <i className="bi bi-exclamation-circle"></i>
                  </span>

                  <Link to="complete-appointment">
                    <i className="bi bi-arrow-right"></i>
                  </Link>
                </div>

                <h5 className="mt-4">Overdue</h5>

                <h2>42</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
