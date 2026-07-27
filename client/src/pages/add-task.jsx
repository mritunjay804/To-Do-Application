import { useFormik } from "formik";
import { DashboardHeader } from "../controlled-component/dashboard-header";
import * as Yup from "yup";
import axios, { formToJSON } from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

export function AddTask() {
  const [cookies] = useCookies(["userEmail"]);
  let navigate = useNavigate();


  const formik = useFormik({
    initialValues: {
      task_title: "",
      task_description: "",
      task_category: "",
      task_date:"",
      user_email: cookies["userEmail"],
    },
    validationSchema: Yup.object({
      task_title: Yup.string().required("Title must we required"),
      task_description: Yup.string().required("Description must we required"),
      task_category: Yup.string().required("Category must we required"),
      task_date: Yup.string().required("Date must we required"),
    }),
    onSubmit: async (appointment) => {
      const data={
        ...appointment,
        task_date:new Date(appointment.task_date)
      }

      try {
        await axios.post("http://127.0.0.1:3000/add-appointment", data);
        console.log(cookies["userEmail"])
        alert("Appointment Added Successfully");
        navigate("/userDashboard");
      } catch (err) {
        console.log(err);
      }
    },
  });

  //cancel btn
  function HandleCancelClick(){
    navigate("/userDashboard");
  }
  return (
  <div>
    <header>
      <DashboardHeader title="Add Task" icon="bi-plus-circle" />
    </header>

    <section className="container-fluid py-4">
      <div className="row justify-content-center">

        <div className="col-12 col-md-10 col-lg-8 col-xl-7">

          <div className="mb-4">
            <h2 className="fw-bold">Add New Task</h2>
            <p className="text-muted mb-0">
              Create and organize your work efficiently
            </p>
          </div>

          <form
            noValidate
            onSubmit={formik.handleSubmit}
            className="bg-light shadow-lg rounded-4 p-3 p-md-4"
          >
            <dl className="mb-0">

              <dt>Task Title</dt>
              <dd>
                <input
                  className="form-control"
                  type="text"
                  name="task_title"
                  placeholder="e.g., Design System Update"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <div className="text-danger small">
                  {formik.touched.task_title &&
                    formik.errors.task_title}
                </div>
              </dd>

              <dt className="mt-4">Description</dt>
              <dd>
                <textarea
                  className="form-control"
                  rows="5"
                  name="task_description"
                  placeholder="Briefly describe the objective of this task..."
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                ></textarea>

                <div className="text-danger small">
                  {formik.touched.task_description &&
                    formik.errors.task_description}
                </div>
              </dd>

              <dt className="mt-4">Category</dt>
              <dd>
                <select
                  name="task_category"
                  className="form-select"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                >
                  <option value="">Select the Category</option>
                  <option value="work">Work</option>
                  <option value="personal">Personal</option>
                  <option value="research">Research</option>
                  <option value="design">Design</option>
                </select>

                <div className="text-danger small">
                  {formik.touched.task_category &&
                    formik.errors.task_category}
                </div>
              </dd>

              <dt className="mt-4">Due Date</dt>
              <dd>
                <input
                  type="date"
                  name="task_date"
                  className="form-control"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />

                <div className="text-danger small">
                  {formik.touched.task_date &&
                    formik.errors.task_date}
                </div>
              </dd>

            </dl>

            <div className="d-flex flex-column flex-sm-row justify-content-end gap-2 mt-4">

              <button
                type="reset"
                className="btn btn-outline-info"
              >
                Reset
              </button>

              <button
                type="button"
                onClick={HandleCancelClick}
                className="btn btn-outline-danger"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="btn btn-primary"
              >
                <i className="bi bi-plus me-2"></i>
                Create Task
              </button>

            </div>
          </form>

        </div>

      </div>
    </section>
  </div>
);
}
