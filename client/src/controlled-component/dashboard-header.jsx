import { useCallback, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";


export function DashboardHeader({ title,icon, search = false, onSearch }) {

  const [cookies,setCookies,removeCookies]=useCookies(["userName","userEmail"]);
  const [searchBarVal,setSearchBarVal]=useState("")
  let navigate=useNavigate();

// Logout
function LogoutUser(){
  removeCookies("userEmail");
  removeCookies("userName");
  navigate("/")
}

//search bar


const HandleSearch=useCallback((e)=>{
 setSearchBarVal(e.target.value)
})

const  HandleSearchClick=useCallback(()=>{
  onSearch(searchBarVal)
},[onSearch,searchBarVal])



  return (
    <nav className="bg-white shadow-sm sticky-top p-3">

      <div className="d-flex justify-content-between align-items-center flex-wrap gap-2">

        <div className="d-flex align-items-center">
          <button
            className="btn btn-outline-primary d-lg-none me-2"
            data-bs-toggle="offcanvas"
            data-bs-target="#sidebarMenu"
          >
            <i className="bi bi-list fs-4"></i>
          </button>

          <span className="navbar-brand fw-bold text-primary mb-0">
            <i className={`bi ${icon} me-2`}></i>
            {title}
          </span>
        </div>

        {search && (
          <div
            className="input-group order-3 order-lg-2 w-100 w-lg-auto"
            style={{ maxWidth: "350px" }}
          >
            <input
              type="text"
              className="form-control"
              placeholder="Search tasks..."
             onChange={HandleSearch}
            />
            <button className="btn btn-warning" onClick={ HandleSearchClick}>
              <i className="bi bi-search"></i>
            </button>
          </div>
        )}

        {/* logout */}
        <button className="btn btn-outline-danger order-2 order-lg-3" onClick={LogoutUser}>
          <i className="bi bi-box-arrow-right me-2"></i>
          Logout
        </button>

      </div>

    </nav>
  );
}