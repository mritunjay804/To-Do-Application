import axios, { formToJSON } from "axios";
import { useFormik } from "formik";
import *as Yup from "yup"
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
export function LoginCard() {

  let navigate=useNavigate();
  const [cookies, setCookies,removeCookies]=useCookies(["userEmail","userName"]);

  //login
  const formik=useFormik({
    initialValues:{
      user_email:"",
      user_password:""
    },
    validationSchema:Yup.object({
      user_email:Yup.string().required("User Email Required"),
      user_password:Yup.string().required("User Password Required")
    }),
    onSubmit:async (values,{setFieldError})=>{
      try{
        const res=await axios.get(`http://127.0.0.1:3000/user/${values.user_email}`);
      console.log(res.data);
      if(res.data.user_password===values.user_password){
        navigate("/userDashboard")
        setCookies("userEmail",res.data.user_email);
        setCookies("userName",res.data.user_name)
      }else{
        setFieldError("user_password","Invalid Password");
      }

      }catch(err){
        if(err.response.status==404){
          setFieldError("user_email","Email Not Found")
        }else{
          console.log(err)
        }
      }
    }
  })

  return (
    <form onSubmit={formik.handleSubmit} noValidate className="card shadow-lg border-0 rounded-4">
      <div className="card-body p-4">
        <h3 className="text-center mb-4">Welcome Back</h3>

        <input
          type="email"
          className="form-control mb-3"
          placeholder="Email"
          name="user_email"
          value={formik.values.user_email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        <div className="text-danger">{formik.touched.user_email && formik.errors.user_email}</div>

        <input
          type="password"
          className="form-control mb-3"
          placeholder="Password"
          name="user_password"
          value={formik.values.user_password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        <div className="text-danger">{formik.touched.user_password && formik.errors.user_password}</div>

        <button type="submit" className="btn btn-primary w-100">
          Sign In
        </button>
        <p className="text-center mt-4 mb-0">
              New to TaskFlow?{" "}
              <Link className="text-decoration-none" to="/register">Create Free Account</Link>
            </p>
      </div>
    </form>
  );
}