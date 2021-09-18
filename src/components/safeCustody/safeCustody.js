import react, { useState } from "react";
import styles from "../../stylesheets/safeCustody.css";

import Document from "./document.js";
import AddCustodyPopup from "./addCustodyPopup.js";
import AssociatedContacts from "./associatedContacts.js";
import File from "./file.js";

function RenderSafeCustody() {

  function renderSafeSelectTop() {
    return (
      <div >
        <div className="selectsFileDiv">
          <div className="d-flex">
            <h6 style={{paddingTop:'12%'}}>Status</h6>
            <div className="dropdown" style={{marginLeft:'20%'}}>
              <button
                className="btn btn-secondary dropdown-toggle"
                type="button"
                id="dropdownMenuButton1"
                data-bs-toggle="dropdown"
              >
                All
              </button>
              <ul className="dropdown-menu">
                <li>
                  <a className="dropdown-item" href="#">
                    Active
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Iactive
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Uplifted
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    All
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <input
            style={{ width: "40%" }}
            placeholder="Search by packet no., Contact name, Address, Document name"
          ></input>
          <div className="custodyPageBtns" style={{ width: "22%" }}>
            <button>Filter </button>
            <button>Clear</button>
            <button>More</button>
            <button>Add</button>
          </div>
        </div>
      </div>
    );
  }

  function renderSafeContactsTop() {
    return (
      <div>
        <div className="safeContacts">
          <div>
            <h6 style={{ color: "#ACB8C9" }}>Contacts for packet no.1</h6>
            <h5 style={{ fontWeight: "bold" }}>Associated Contacts</h5>
          </div>
          <div className="custodyPageBtns" style={{ paddingTop: "2%" }}>
            <button>Save </button>
            <button>Cancel</button>
            <button>Delete</button>
          </div>
        </div>
      </div>
    );
  }

  function renderSafeContentsTop() {
    return (
      <div>
        <div className="safeContentsTop">
          <h5 style={{ fontWeight: "bold" }}>Details for packet no.1</h5>
          <div className="custodyPageBtns">
            <button>Save </button>
            <button>Cancel</button>
            <button>Delete</button>
          </div>
        </div>
      </div>
    );
  }

  function renderSafeReceiptsTop() {
    return (
      <div>
        <div className="safeContentsTop">
          <h5 style={{ fontWeight: "bold" }}>Receipts for packet no.1</h5>
          <div className="recepientsTop">
            <button>Download </button>
            <button
              onClick={() => {
                window.print();
              }}
            >
              Prepare Receipt
            </button>
          </div>
        </div>
      </div>
    );
  }

  function renderSafeSelect() {
    return (
      <div>
        <div className="row safeSelectHeads">
          <div className="col-2">
            <label>Location</label>
            <input type="text"></input>
          </div>
          <div className="col-2">
            <label>Packet No.</label>
            <input type="text"></input>
          </div>
          <div className="col-3">
            <label>Contacts</label>
            <input type="text"></input>
          </div>
          <div className="col-2">
            <label>Status</label>
            <input type="text"></input>
          </div>
          <div className="col-3">
            <label>Comments</label>
            <input type="text"></input>
          </div>
        </div>
        <div>
          <File />
          <File />
          <File />
          <File />
          <File />
        </div>
      </div>
    );
  }

  function renderSafeContacts() {
    return (
      <div>
        {/* <h1>Contacts</h1>
        <input
          type="text"
          value={b}
          onChange={(e) => {
            setB(e.target.value);
          }}
        ></input> */}
        <div>
          <div className="row associatedContacts">
            <div className="col-1"></div>
            <div className="col-2">
              <label> Code</label>
              <input type="text"></input>
            </div>
            <div className="col-1">
              <label>F.Name</label>
              <input type="text"></input>
            </div>
            <div className="col-1">
              <label>L.Name</label>
              <input type="text"></input>
            </div>
            <div className="col-2">
              <label>Company</label>
              <input type="text"></input>
            </div>
            <div className="col-1">
              <label> Type</label>
              <input type="text"></input>
            </div>
            <div className="col-2">
              <label>Email Address</label>
              <input type="text"></input>
            </div>
            <div className="col-2">
              <label>Phone Number</label>
              <input type="text"></input>
            </div>
          </div>
          <div style={{ marginTop: "3%" }}>
            <AssociatedContacts />
            <AssociatedContacts />
            <AssociatedContacts />
            <AssociatedContacts />
            <AssociatedContacts />
          </div>
        </div>
      </div>
    );
  }
  {
    /* {x==="primary" && (<input readOnly placeholder="some name" />)}
                {x==="client" && (<input placeholder="some name" />)} */
  }
  {
    /* {x==="primary" ? <input readOnly>some name</input> : <input>some name</input>} */
  }
  function renderSafeContents() {
    var x = "client";
    return (
      <div>
        <div>
          <div style={{ padding: "2.5%" }} className="row">
            <div className="col-4">
              <div>
                <label
                  for="contents"
                  style={{ marginRight: "5%", color: "#A0A5AA" }}
                >
                  Contents
                </label>
                <textarea rows="2" cols="25" id="contents"></textarea>
              </div>
            </div>
            <div className="col-8 contentsInfo">
              <div className="d-flex">
                <label>First Name:</label>
                <input value="hello" type="text" />
                <label>Last Name:</label>
                <input value="hello" type="text" />
                <label>Contact Type:</label>
                <input value="hello" type="text" />
              </div>
              <div className="row">
                <div>
                  <label style={{ width: "10%" }}>Address:</label>
                  <input value="hello" type="text" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="associatedDocs">
          <h6 style={{ fontWeight: "bold" }}>Associated documents</h6>
          <div className="custodyPageBtns" style={{ width: "48%" }}>
            <button data-bs-toggle="modal" data-bs-target="#staticBackdrop">
              ADD
            </button>
            <button>DELETE</button>
            <button>DOWNLOAD</button>
            <button
              onClick={() => {
                window.print();
              }}
            >
              PREPARE RECEIPT
            </button>
          </div>
        </div>
        <AddCustodyPopup />
        <div className="row associatedDocsHead">
          <div className="col-1"></div>
          <div className="col-2">
            <label>Document Name</label>
          </div>
          <div className="col-2">
            <label>Data Received</label>
          </div>
          <div className="col-1">
            <label>Status</label>
          </div>
          <div className="col-2">
            <label>Data Uplifted</label>
          </div>
          <div className="col-2">
            <label>Uplifted By</label>
          </div>
          <div className="col-2">
            <label>Comments</label>
          </div>
        </div>
        <div>
          <Document />
          <Document />
          <Document />
          <Document />
        </div>
      </div>
    );
  }

  function renderSafeReceipts() {
    return (
      <div>
        <div className="row associatedDocsHead">
          <div className="col-1"></div>
          <div className="col-2">
            <label>Document Name</label>
          </div>
          <div className="col-2">
            <label>Data Received</label>
          </div>
          <div className="col-1">
            <label>Status</label>
          </div>
          <div className="col-2">
            <label>Data Uplifted</label>
          </div>
          <div className="col-2">
            <label>Uplifted By</label>
          </div>
          <div className="col-2">
            <label>Comments</label>
          </div>
        </div>
        <div>
          <Document />
          <Document />
          <Document />
          <Document />
        </div>
      </div>
    );
  }

  const [currentSafe, setCurrentSafe] = useState("select");
  const [a, setA] = useState(null);
  const [b, setB] = useState(null);
  const [c, setC] = useState(null);
  const [d, setD] = useState(null);

  return (
    <div>
      <div className="safe-custody-div">
        {currentSafe === "select" && renderSafeSelectTop()}
        {currentSafe === "contacts" && renderSafeContactsTop()}
        {currentSafe === "contents" && renderSafeContentsTop()}
        {currentSafe === "recepients" && renderSafeReceiptsTop()}

        <div className="safe-custody-btns-div">
          <button
            className={
              currentSafe === "select"
                ? "safe-custody-btns safe-custody-btns-clicked"
                : "safe-custody-btns"
            }
            onClick={() => {
              setCurrentSafe("select");
            }}
          >
            {" "}
            &nbsp; &nbsp; &nbsp; Select File
          </button>
          <br />
          <button
            className={
              currentSafe === "contacts"
                ? "safe-custody-btns safe-custody-btns-clicked"
                : "safe-custody-btns"
            }
            onClick={() => {
              setCurrentSafe("contacts");
            }}
          >
            {" "}
            &nbsp; &nbsp; &nbsp; Contacts
          </button>
          <br />
          <button
            className={
              currentSafe === "contents"
                ? "safe-custody-btns safe-custody-btns-clicked"
                : "safe-custody-btns"
            }
            onClick={() => {
              setCurrentSafe("contents");
            }}
          >
            {" "}
            &nbsp; &nbsp; &nbsp; Contents
          </button>
          <br />
          <button
            className={
              currentSafe === "recepients"
                ? "safe-custody-btns safe-custody-btns-clicked"
                : "safe-custody-btns"
            }
            onClick={() => {
              setCurrentSafe("recepients");
            }}
          >
            {" "}
            &nbsp; &nbsp; &nbsp; Recepients
          </button>
          <br />
        </div>

        {currentSafe === "select" && renderSafeSelect()}
        {currentSafe === "contacts" && renderSafeContacts()}
        {currentSafe === "contents" && renderSafeContents()}
        {currentSafe === "recepients" && renderSafeReceipts()}
      </div>
    </div>
  );
}

export default RenderSafeCustody;
