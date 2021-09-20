import React,{useEffect,useState} from "react";
import { useCookies } from "react-cookie";
import "../../stylesheets/stripes.css";
import Bell from "../../icons/bell.png";
import { Avatar } from "@mui/material";
import Photo from "../../icons/avatar-4.png";
import axios from "axios";
import url from "../../config.js";
import { AiOutlineLogout } from "react-icons/ai";
import "../../stylesheets/profileCard.css";
function HomeStipe() {
  const [cookies, setCookie, removeCookie, get] = useCookies(["token"]);
  const loggedInToken = cookies.token;
  function logout() {
    removeCookie("token");
    window.location.href = "/";
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
            <h3>{user?.firstName} {user?.lastName}</h3>
            <p>{user?.login}</p>
          </div>
        </div>
        <div className="cardDiv">
          <h3>Company Name</h3>
          <p>{user?.organizationName} </p>
          <h3>Role</h3>
          <p>System administrator</p>
          <h3>Version</h3>
          <p>2.0.102</p>
          <hr></hr>
          <h3>My profile</h3>
          {user?.siteInfoList.map((site)=>{
            return <p>{site.siteName}</p>
          })}
          <div onClick={() => {
            logout();
          }} className="logoutdivv">
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
