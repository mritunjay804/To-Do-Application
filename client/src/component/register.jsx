import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import axios from "axios";
import { Login } from "./login";
import * as yup from "yup";

export function Register() {
  let navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      user_name: "",
      user_id: "",
      user_email: "",
      user_password: "",
      confirm_password: "",
    },
    validationSchema: yup.object({
      user_name: yup
        .string()
        .required("Full Name is required")
        .min(4, "Name must we at least 4 Charecters"),
      user_id: yup.string().required("User Id is required"),
      user_email: yup
        .string()
        .email("Invalid Email")
        .required("Email is required"),
      user_password: yup
        .string()
        .required("Password is required")
        .min(6, "Password must be at least 6 characters")
        .max(12, "Password can not exceed 12 charecters")
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#^()_\-+=])[A-Za-z\d@$!%*?&#^()_\-+=]{6,12}$/,
          "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
        ),
      confirm_password: yup
        .string()
        .oneOf([yup.ref("user_password")], "Password do not match"),
    }),
    onSubmit: async (user, { setFieldError }) => {
      try {
        await axios.post("http://127.0.0.1:3000/add-register", user);

        alert("Registered Successfully");
        navigate("/login");
      } catch (err) {
        if (err.response?.status === 409) {
          setFieldError(err.response.data.field, err.response.data.message);
        } else {
          console.log(err);
        }
      }
    },
  });

  return (
    <div className="d-flex justify-content-center align-items-center container-fluid min-vh-100">
      <div className="row justify-content-center w-100">
        <div className="col-11 col-sm-9 col-md-7 col-lg-5 col-xl-4">
          <div className="shadow shadow-lg rounded rounded-5 p-4">
            <div className="bi bi-check-circle text-info-emphasis fs-1 fw-bold">
              TaskFlow
            </div>
            <div className="fs-3 fw-bold">Create Account</div>
            <form onSubmit={formik.handleSubmit} noValidate>
              <dl>
                <dt>Full Name</dt>
                <dd className="my-3">
                  <input
                    type="text"
                    placeholder="Alex Rivera"
                    className="form-control"
                    name="user_name"
                    value={formik.values.user_name}
                    onChange={formik.handleChange}
                  />
                  <div className="text-dange">
                    {formik.touched.user_name && formik.errors.user_name}
                  </div>
                </dd>

                <dt>User Id</dt>
                <dd className="my-3">
                  <input
                    type="text"
                    placeholder="Alex Rivera"
                    className="form-control"
                    name="user_id"
                    value={formik.values.user_id}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  <div className="text-danger">
                    {formik.touched.user_id && formik.errors.user_id}
                  </div>
                </dd>
                <dt>Work Email</dt>
                <dd className="my-3">
                  <input
                    type="text"
                    placeholder="alex@company.com"
                    className="form-control"
                    name="user_email"
                    value={formik.values.user_email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  <div className="text-danger">
                    {formik.touched.user_email && formik.errors.user_email}
                  </div>
                </dd>
                <dt>Password</dt>
                <dd className="my-3">
                  <input
                    type="password"
                    placeholder="......."
                    className="form-control"
                    name="user_password"
                    value={formik.values.user_password}
                    onChange={formik.handleChange}
                  />
                  <div className="text-danger">
                    {formik.touched.user_password &&
                      formik.errors.user_password}
                  </div>
                </dd>
                <dt>Conform Password</dt>
                <dd className="my-3">
                  <input
                    type="password"
                    placeholder="......"
                    className="form-control"
                    name="confirm_password"
                    value={formik.values.confirm_password}
                    onChange={formik.handleChange}
                  />
                  <div className="text-danger">
                    {formik.touched.confirm_password &&
                      formik.errors.confirm_password}
                  </div>
                </dd>
              </dl>

              <button type="submit" className="btn btn-primary w-100 my-3">
                Create Account
              </button>
            </form>
            <div>
              Already have an account? <Link to="/login">Sign in</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
