import React,{useEffect} from "react";

import "../../stylesheets/stripes.css";
import Bell from "../../icons/bell.png";
import { Avatar } from "@mui/material";
import Photo from "../../icons/avatar-4.png";

import { AiOutlineLogout } from "react-icons/ai";
import "../../stylesheets/profileCard.css";
function HomeStipe() {
  
  
function showProfile(){
    const profile = document.querySelector(".profilecard");
    const backdrop = document.querySelector(".backdroppp");

    if (profile) {
        profile.classList.toggle("show");
      }
      if(backdrop){
          backdrop.classList.toggle("show");
      }
}





  return (
    <div className="homestripe">
      <div className="safestrip">
      <div className="backdroppp" onClick={showProfile}></div>
        <div className="safe_iconsDiv">
          <img className="safe_iconsDivimg" src={Bell} />
          <div onClick={showProfile} className="avatarr">
            <Avatar sx={{ width: 56, height: 56 }} src={Photo} />
          </div>
        </div>
      </div>
      <div className="profilecard">
        <div className="avatarDiv">
          <Avatar sx={{ width: 56, height: 56 }} src={Photo} />
          <div className="nameDiv">
            <h3>Sierra Ferguson</h3>
            <p>testuser1@gmail.com</p>
          </div>
        </div>
        <div className="cardDiv">
          <h3>Company Location</h3>
          <p>Warren and Warren - Bangalore</p>
          <h3>Role</h3>
          <p>System administrator</p>
          <h3>Version</h3>
          <p>2.0.102</p>
          <hr></hr>
          <h3>My profile</h3>
          <p>Warren and Warren - Bangalore</p>
          <p>Warren and Warren - Bangalore</p>
          <p>Warren and Warren - Bangalore</p>
          <p>Warren and Warren - Bangalore</p>
          <div className="logoutdivv">
            <h2>
              Logout <AiOutlineLogout />
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeStipe;
