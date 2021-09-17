import react from "react";
import styles from "../stylesheets/navbar.css";
import { useHistory } from "react-router-dom";

import { IoIosNotifications } from "react-icons/io";
import { CgGirl } from "react-icons/cg";
import AddPerson from "./contacts/addPerson.js";
import AddOrganization from "./contacts/addOrganization.js";

function Navbar(props) {
  const { current } = props;

  // function addPerson() {
  //   window.location.href = "/addPerson";
  // }

  // function addOrganization() {
  //   window.location.href = "/addOrganization";
  // }

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
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid" style={{ padding: "0" }}>
          <div
            className="collapse navbar-collapse navbarHeads"
            id="navbarSupportedContent"
            style={{
              backgroundColor: "#FFFFFF",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            {current === "matters" && <h5>Matters</h5>}
            {current === "contacts" && <h5>Contacts</h5>}
            {current === "safeCustody" && <h5>Safe Custody</h5>}
            {current === "property" && <h5>Property</h5>}
            {current==="contacts" && renderContactPageButtons()}
            <div style={{ marginLeft: "40%" }} className="navbarBtns">
              <button style={{ marginRight: "0%" }}>
                <IoIosNotifications size={50} />
              </button>
              <span class="dropdown">
                <button id="dropdownMenuButton1" data-bs-toggle="dropdown">
                  <CgGirl size={50} />
                </button>
                <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                  <li>
                    <a class="dropdown-item" href="#">
                      Action
                    </a>
                  </li>
                  <li>
                    <a class="dropdown-item" href="#">
                      Another action
                    </a>
                  </li>
                  <li>
                    <a class="dropdown-item" href="#">
                      Something else here
                    </a>
                  </li>
                </ul>
              </span>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
