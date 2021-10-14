import react, { useState } from "react";
import styles from "../stylesheets/signup.css";
import url from "../config.js";

import axios from "axios";
import { useCookies } from "react-cookie";

import signupFooter from "../images/signupFooter.svg";
import arrow from "../images/arrow.svg";

function Signup() {
  const [cookies, setCookie, removeCookie] = useCookies(["cookie-name"]);

  function handleSubmit(e) {
    e.preventDefault();
    axios
      .post(`${url}/api/auth/signup`, {
        name: name,
        email: email,
        phone: phone,
        firmSize: firmSize,
        password: password,
      })
      .then((response) => {
        setCookie("token", response.data.accessToken);
        alert("You are successfuly signed up");
      })
      .catch((error) => {
        alert("Something went wrong! Try Again!");
      });
  }

  function goToLogin() {
    window.location.href = "/login";
  }

  const [name, setName] = useState(undefined);
  const [email, setEmail] = useState(undefined);
  const [phone, setPhone] = useState(undefined);
  const [firmSize, setFirmSize] = useState(undefined);
  const [password, setPassword] = useState(undefined);

  return (
    <div>
      <div className="container">
        <div className="signupContainer">
          <div className="signupCard">
            <form
              onSubmit={(e) => {
                handleSubmit(e);
              }}
            >
              <h1 className="logo">Logo</h1>
              <div className="inputDiv">
                <label htmlFor="name" className="labelStyle">
                  Name
                </label>
                <input
                  placeholder="Enter full name"
                  type="text"
                  name="name"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                  className="inputStyle"
                  required
                />
              </div>
              <div className="inputDiv">
                <label htmlFor="email" className="labelStyle">
                  Email
                </label>
                <input
                  placeholder="Enter email"
                  type="text"
                  name="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  className="inputStyle"
                  required
                />
              </div>
              <div className="inputDiv">
                <label htmlFor="phoneNumber" className="labelStyle">
                  Phone number
                </label>
                <input
                  placeholder="Enter phone number"
                  type="text"
                  name="phone"
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value);
                  }}
                  className="inputStyle"
                  required
                />
              </div>
              <div className="inputDiv">
                <label htmlFor="firmSize" className="labelStyle">
                  Firm size
                </label>
                <input
                  placeholder="Enter firm size"
                  type="text"
                  name="firmSize"
                  value={firmSize}
                  onChange={(e) => {
                    setFirmSize(e.target.value);
                  }}
                  className="inputStyle"
                  required
                />
              </div>
              <div className="inputDiv">
                <label htmlFor="password" className="labelStyle">
                  Password
                </label>
                <input
                  placeholder="Choose password"
                  type="password"
                  name="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  className="inputStyle"
                  required
                />
              </div>
              <button className="buttonStyle">Get Started</button>
            </form>
          </div>
          <div className="messageCard">
            <h3 className="messageHead">
              See how Edge can help your law firm succeed
            </h3>
            <p className="messageBody">
              Save hours per day and boost billables with the world's most
              trusted legal software.
            </p>
            <p className="messageFooter">
              <span className="messageSpan">
                <img
                  src={signupFooter}
                  alt="footer"
                  style={{ height: "34px", width: "34px" }}
                />
              </span>{" "}
              Start you FREE trial now!
            </p>
          </div>
        </div>
        <div className="loginLink">
          <div className="loginButton" onClick={goToLogin}>
            <p className="login">Log in</p>
            <span className="icon">
              <img
                src={arrow}
                alt="up-arrow"
                style={{ height: "10px", width: "10px" }}
              />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
