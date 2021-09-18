import React, { useEffect, useState } from "react";
import axios from "axios";
import url from "../../config.js";
import "../../stylesheets/stripes.css";
import Bell from "../../icons/bell.png";
import { Avatar } from "@mui/material";
import Photo from "../../icons/avatar-4.png";
import { CgGirl } from "react-icons/cg";
import { AiOutlineLogout } from "react-icons/ai";
import { useCookies } from "react-cookie";
import AddPerson from "../contacts/addPerson.js";
import AddOrganization from "../contacts/addOrganization.js";
function SafeCustodystripe() {
  const [cookies, setCookie, removeCookie, get] = useCookies(["token"]);
  const loggedInToken = cookies.token;
  function logout() {
    removeCookie("token");
    window.location.href = "/login";
  }
  const [user,setUser] = useState(null);
  useEffect(() => {
    axios
      .get(
        `${url}/api/user/${1}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${loggedInToken}`,
          },
        },
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        console.log("userdetails",response.data);
        setUser(response.data);
      });
  }, []);
  function renderContactPageButtons() {
    return (
      <div className="navbarContactBtns">
        <button data-bs-toggle="modal" data-bs-target="#staticBackdrop20">
          + Person
        </button>
        <AddPerson />
        <button data-bs-toggle="modal" data-bs-target="#staticBackdrop21">
          + Organization
        </button>
        <AddOrganization />
      </div>
    );
  }
  return (
    <div className="safestrip">
      <p>Safe Custody</p>
      <div className="safe_iconsDiv">
        <button className="safeadd">Add</button>
        <img className="safe_iconsDivimg" src={Bell} />
        {/* {renderContactPageButtons()} */}
        {/* <Avatar src={Photo}/> */}
        <span class="dropdown">
          <button
            style={{ border: "none", backgroundColor: "transparent" }}
            className="dropdown-toggle"
            onClick={() => {
              console.log("fuc this is ");
            }}
            id="dropdownMenuButton1"
            data-bs-toggle="dropdown"
          >
            <CgGirl size={50} />
          </button>
          <ul
            class="dropdown-menu"
            aria-labelledby="dropdownMenuButton1"
            style={{ width: "100%" }}
          >
            <li>
              <div className="row userDiv1">
                <img
                  className="userImage col-3"
                  src="data:image/png;base64,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"
                />
                <div className="col-8">
                  <h6 style={{ fontWeight: "bold" }}>{user?.firstName} {user?.lastName}</h6>
                  <h6>{user?.login}</h6>
                </div>
              </div>
            </li>
            <li>
              <div className="userDiv2">
                <h6 style={{fontWeight:'bold'}}>Company Name</h6>
                <h6> {user?.organizationName} </h6>
                <h6 style={{fontWeight:'bold'}}>Role</h6>
                <h6>System Administrator</h6>
                <h6 style={{fontWeight:'bold'}}>Version</h6>
                <h6>2.0.12</h6>
              </div>
              <hr style={{ margin: "0 10%" }} />
            </li>
            <li>
              <div className="userDiv3">
                <h6 style={{fontWeight:'bold'}}>My Profile</h6>
                {user?.siteInfoList.map((site)=>{
                  return <h6>{site.siteName}</h6>
                })}
                {/* <h6>Warren and Warren</h6>
                <h6>Warren and Warren</h6>
                <h6>Warren and Warren</h6> */}
              </div>
              <button
              style={{border:'none',marginLeft:'30%'}}
                // className="logoutBtn"
                onClick={() => {
                  logout();
                }}
              >
                <AiOutlineLogout />
                Logout
              </button>
            </li>
          </ul>
        </span>
      </div>
    </div>
  );
}

export default SafeCustodystripe;
