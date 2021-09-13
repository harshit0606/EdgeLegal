import react, { useState } from "react";
import styles from "../../stylesheets/safeCustody.css";

import Document from "./document.js";
import AddCustodyPopup from "./addCustodyPopup.js";

function RenderSafeCustody() {
  function renderSafeSelectTop() {
    return (
      <div>
        <h1>renderSafeSelectTop</h1>
      </div>
    );
  }

  function renderSafeContactsTop() {
    return (
      <div>
        <h1>renderSafeContactsTop</h1>
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

  function renderSafeRecepientsTop() {
    return (
      <div>
        <h1>renderSafeRecepientsTop</h1>
      </div>
    );
  }

  function renderSafeSelect() {
    return (
      <div>
        <h1>Select File</h1>
        <input
          type="text"
          value={a}
          onChange={(e) => {
            setA(e.target.value);
          }}
        ></input>
      </div>
    );
  }

  function renderSafeContacts() {
    return (
      <div>
        <h1>Contacts</h1>
        <input
          type="text"
          value={b}
          onChange={(e) => {
            setB(e.target.value);
          }}
        ></input>
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
            <button>PREPARE RECEIPT</button>
          </div>
        </div>
        <AddCustodyPopup />
        <div className="row associatedDocsHead">
          <div className="col-1">
    
          </div>
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

  function renderSafeRecepients() {
    return (
      <div>
        <h1>Recepients</h1>
        <input
          type="text"
          value={d}
          onChange={(e) => {
            setD(e.target.value);
          }}
        ></input>
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
        {currentSafe === "recepients" && renderSafeRecepientsTop()}

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
        {currentSafe === "recepients" && renderSafeRecepients()}
      </div>
    </div>
  );
}

export default RenderSafeCustody;
