import { useCallback, useEffect, useMemo, useState } from "react";
import { DashboardHeader } from "../controlled-component/dashboard-header";
import { useFetchData } from "../hooks/fetch-data";
import { useCookies } from "react-cookie";
import { useFilterData } from "../hooks/filter-data";
import { DeleteAppointment } from "../hooks/delete-data";
import axios from "axios";
import { useFormik } from "formik";
// import { response } from "express";

export function TotalTask() {
  const [cookies] = useCookies(["userEmail"]);
  const [searchVal, setSearchVal] = useState("");
  const [appointments, setAppointments] = useState([]);
  const [editAppointment, setEditAppointment] = useState({
    task_title: "",
    task_description: "",
    task_category: "",
    task_date: "",
  });

  //fetch data
  const LoadAppointment = useCallback(() => {
    axios
      .get(`http://127.0.0.1:3000/appointments/${cookies["userEmail"]}`)
      .then((response) => {
        setAppointments(response.data);
      });
  }, [cookies.userEmail]);

  useEffect(() => {
    LoadAppointment();
  }, [LoadAppointment]);

  function HandleSearch(val) {
    setSearchVal(val);
  }

  //delete Appointment
  async function HandleAppointmentDelete(title) {
    try {
      await axios
        .delete(`http://127.0.0.1:3000/deleteAppointment/${title}`)
        .then(() => {
          alert(`${title.toUpperCase()} Appointment Deleted successfully...`);
          LoadAppointment();
        });
    } catch (err) {
      console.log(err);
    }
  }

  const FilterData = useMemo(() => {
    if (!searchVal) return appointments;

    return appointments.filter(
      (appointment) =>
        appointment.task_title
          .toLowerCase()
          .includes(searchVal.toLowerCase()) ||
        appointment.task_description
          .toLowerCase()
          .includes(searchVal.toLowerCase()),
    );
  }, [appointments, searchVal]);

  const EditAppointment = useCallback((id) => {
    axios.get(`http://127.0.0.1:3000/appointment/${id}`).then((res) => {
      setEditAppointment(res.data);
    });
  }, []);

  const Formik_Edit = useFormik({
    enableReinitialize: true,

    initialValues: {
      title: editAppointment.task_title || "",
      description: editAppointment.task_description || "",
      category: editAppointment.task_category || "",
      date: editAppointment.task_date
        ? new Date(editAppointment.task_date).toISOString().split("T")[0]
        : "",
    },

    onSubmit: async (values) => {
      try {
        await axios.put(
          `http://127.0.0.1:3000/editAppointment/${editAppointment._id}`,
          {
            task_title: values.title,
            task_description: values.description,
            task_category: values.category,
            task_date: values.date,
          },
        );

        alert("Appointment Updated Successfully");

        LoadAppointment();

        // document.getElementById("closeModal").click();
      } catch (err) {
        console.log(err);
      }
    },
  });

  return (
    <div>
      <header>
        <DashboardHeader
          title="My Appointment"
          icon="bi-check-circle"
          search={true}
          onSearch={HandleSearch}
        />
      </header>

      <section className="container-fluid mt-3 px-2 px-md-4">
        <div className="table-responsive shadow rounded">
          <table className="table table-bordered table-hover align-middle mb-0">
            <caption className="caption-top fw-bold fs-5">
              My Appointments
            </caption>

            <thead className="table-dark">
              <tr>
                <th style={{ minWidth: "180px" }}>Title</th>
                <th style={{ minWidth: "280px" }}>Description</th>
                <th style={{ minWidth: "120px" }}>Category</th>
                <th style={{ minWidth: "130px" }}>Due Date</th>
                <th style={{ minWidth: "180px" }}>Action</th>
              </tr>
            </thead>

            <tbody>
              {FilterData.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center py-5">
                    <i className="bi bi-inbox fs-1 d-block text-secondary"></i>
                    <h5 className="mt-2">No Appointment Found</h5>
                  </td>
                </tr>
              ) : (
                FilterData.map((item) => (
                  <tr key={item._id || item.task_title}>
                    <td className="fw-semibold">{item.task_title}</td>

                    <td className="text-wrap">{item.task_description}</td>

                    <td>
                      <span className="badge bg-primary">
                        {item.task_category}
                      </span>
                    </td>

                    <td>{new Date(item.task_date).toLocaleDateString()}</td>

                    <td>
                      <div className="d-flex flex-column flex-md-row gap-2">
                        <button
                          className="btn btn-warning btn-sm"
                          data-bs-toggle="modal"
                          data-bs-target="#Edit-appointment"
                          onClick={() => EditAppointment(item._id)}
                        >
                          <i className="bi bi-pencil-fill me-1"></i>
                          Edit
                        </button>

                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() =>
                            HandleAppointmentDelete(item.task_title)
                          }
                        >
                          <i className="bi bi-trash-fill me-1"></i>
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Edit Appointment */}
        <div
          className="modal fade"
          id="Edit-appointment"
          tabIndex="-1"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content">
              <form
                noValidate
                onSubmit={Formik_Edit.handleSubmit}
                className="p-3 p-md-4"
              >
                {/* Header */}
                <div className="modal-header">
                  <h4 className="modal-title fw-bold">Edit Appointment</h4>

                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                  ></button>
                </div>

                {/* Body */}
                <div className="modal-body">
                  <div className="mb-3">
                    <label className="form-label fw-semibold">Task Title</label>

                    <input
                      className="form-control"
                      type="text"
                      name="title"
                      onChange={Formik_Edit.handleChange}
                      onBlur={Formik_Edit.handleBlur}
                      value={Formik_Edit.values.title}
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label fw-semibold">
                      Task Description
                    </label>

                    <textarea
                      rows="4"
                      className="form-control"
                      name="description"
                      onChange={Formik_Edit.handleChange}
                      onBlur={Formik_Edit.handleBlur}
                      value={Formik_Edit.values.description}
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label fw-semibold">
                      Task Category
                    </label>

                    <select
                      className="form-select"
                      name="category"
                      onChange={Formik_Edit.handleChange}
                      onBlur={Formik_Edit.handleBlur}
                      value={Formik_Edit.values.category}
                    >
                      <option value="">Select Category</option>
                      <option value="work">Work</option>
                      <option value="personal">Personal</option>
                      <option value="research">Research</option>
                      <option value="design">Design</option>
                    </select>
                  </div>

                  <div className="mb-3">
                    <label className="form-label fw-semibold">Due Date</label>

                    <input
                      className="form-control"
                      type="date"
                      name="date"
                      onChange={Formik_Edit.handleChange}
                      onBlur={Formik_Edit.handleBlur}
                      value={Formik_Edit.values.date}
                    />
                  </div>
                </div>

                {/* Footer */}
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="btn btn-info"
                    data-bs-dismiss="modal"
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
