import react, { useState } from "react";
import styles from "../../stylesheets/property.css";
import axios from "axios";

import PopupFormR from "./popupformR.js";
import PopupFormUnR from "./popupformUnR.js";
import Lot from "./lot.js";
import EditLot from "./editLot.js";
import url from "../../config.js";

import { useCookies } from "react-cookie";

function AddNewProperty(props) {
  const { modalId } = props;

  const [buildingName, setBuildingName] = useState(null);
  const [unit, setUnit] = useState(null);
  const [streetNo, setStreetNo] = useState(null);
  const [street, setStreet] = useState(null);
  const [suburb, setSuburb] = useState(null);
  const [state, setState] = useState(null);
  const [postCode, setPostCode] = useState(null);
  const [county, setCounty] = useState(null);
  const [current, setCurrent] = useState("general");
  const [tempRegistered, setTempRegistered] = useState([]);
  const [tempUnregistered, setTempUnregistered] = useState([]);

  const [cookies, setCookie, removeCookie] = useCookies(["token"]);
  const loggedInToken = cookies.token;

  // const x =[3,5];
  // const y =[3,5];

  function renderRegisteredLots() {
    return tempRegistered?.map((registeredLot) => {
      return <Lot modal={9} registeredLot={registeredLot} lotType={1} />;
    });
  }

  function renderUnregisteredLots() {
    return tempUnregistered?.map((unregisteredLot) => {
      return (
        <EditLot modal={10} unregisteredLot={unregisteredLot} lotType={2} />
      );
    });
  }

  function renderGeneral() {
    return (
      <div
        // style={{ marginTop: "10%" }}
        className="row"
      >
        <div className="col-4">
          <label>Building Name</label>
          <input
            type="text"
            value={buildingName}
            onChange={(e) => {
              setBuildingName(e.target.value);
            }}
          />
        </div>
        <div className="col-4">
          <label>Unit &nbsp; </label>
          <input
            type="text"
            value={unit}
            onChange={(e) => {
              setUnit(e.target.value);
            }}
          />
        </div>
        <div className="col-4">
          <label>Street No.</label>
          <input
            type="text"
            value={streetNo}
            onChange={(e) => {
              setStreetNo(e.target.value);
            }}
          />
        </div>
        <div className="col-4">
          <label>Street</label>
          <input
            type="text"
            value={street}
            onChange={(e) => {
              setStreet(e.target.value);
            }}
          />
        </div>
        <div className="col-4">
          <label>Suburb</label>
          <input
            type="text"
            value={suburb}
            onChange={(e) => {
              setSuburb(e.target.value);
            }}
          />
        </div>
        <div className="col-4">
          <label>State</label>
          <input
            type="text"
            value={state}
            onChange={(e) => {
              setState(e.target.value);
            }}
          />
        </div>
        <div className="col-4">
          <label>Post Code</label>
          <input
            type="text"
            value={postCode}
            onChange={(e) => {
              setPostCode(e.target.value);
            }}
          />
        </div>
        <div className="col-4">
          <label>County</label>
          <input
            type="text"
            value={county}
            onChange={(e) => {
              setCounty(e.target.value);
            }}
          />
        </div>
      </div>
    );
  }

  function renderAttachedLots() {
    return (
      <div>
        <div className="2">
          <div className="propertyPageHeadings">
            <h6 className="propertyPageHeads">Add/Edit Registered Lots</h6>
            <button
              className="propertyPageBtns"
              data-bs-toggle="modal"
              data-bs-target="#staticBackdrop4"
            >
              + Add
            </button>
            <PopupFormR
              modalId={4}
              tempRegistered={tempRegistered}
              setTempRegistered={setTempRegistered}
              addBtn = {1}
            />
          </div>
          <div className="propertyPagesubHeads">
            <div className="row">
              <div className="col-1">
                <h6>Edit</h6>
              </div>
              <div className="col-2">
                <h6>Title Ref</h6>
                <input type="text"></input>
              </div>
              <div className="col-1">
                <h6>LotNo.</h6>
                <input type="text"></input>
              </div>
              <div className="col-1">
                <h6>Section</h6>
                <input type="text"></input>
              </div>
              <div className="col-3">
                <h6>Deposited Plan No.</h6>
                <input type="text"></input>
              </div>
              <div className="col-2">
                <h6>Strata Plan</h6>
                <input type="text"></input>
              </div>
              <div className="col-2">
                <h6>Description</h6>
                <input type="text"></input>
              </div>
            </div>
            <div className="lotsScrollDiv">{renderRegisteredLots()}</div>
          </div>
        </div>
        <div className="3">
          <div className="propertyPageHeadings">
            <h6 className="propertyPageHeads">Add/Edit Unregistered Lots</h6>
            <button
              className="propertyPageBtns"
              data-bs-toggle="modal"
              data-bs-target="#staticBackdrop5"
            >
              + Add
            </button>
            <PopupFormUnR
              modalId={5}
              tempUnregistered={tempUnregistered}
              setTempUnregistered={setTempUnregistered}
              addBtn = {1}
            />
          </div>
          <div className="propertyPagesubHeads">
            <div className="row">
              <div className="col-1">
                <h6>Edit</h6>
              </div>
              <div className="col-2">
                <h6>LotNo.</h6>
                <input type="text"></input>
              </div>
              <div className="col-2">
                <h6>Part of Lot</h6>
                <input type="text"></input>
              </div>
              <div className="col-1">
                <h6>Section</h6>
                <input type="text"></input>
              </div>
              <div className="col-3">
                <h6>Plan Number</h6>
                <input type="text"></input>
              </div>
              <div className="col-3">
                <h6>Description</h6>
                <input type="text"></input>
              </div>
            </div>
            <div className="lotsScrollDiv">{renderUnregisteredLots()}</div>
          </div>
        </div>
      </div>
    );
  }

  function onSave() {
    console.log("in bada save reg", tempRegistered);
    console.log("in bada save unreg", tempUnregistered);
    const data = {
      buildingName: buildingName,
      unit: unit,
      streetNo: streetNo,
      street: street,
      suburb: suburb,
      state: state,
      postCode: postCode,
      county: county,
      registeredProperties: tempRegistered,
      unregisteredProperties: tempUnregistered,
    };
    console.log(data);
    axios
      .post(
        `${url}/api/property`,
        {
          requestId: "1123445",
          data: data
        },
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
        console.log("adding new property", response.data);
      });
  }

  return (
    <div
      className="modal fade"
      id="staticBackdrop3"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabindex="-1"
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div
          // style={{ height: "32rem" }}
          className="modal-content popupNewProperty"
        >
          <div className="modal-header newPropertyHead">
            <h5 className="modal-title" id="staticBackdropLabel">
              Add New Property
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="newPropertyBtnTray">
            <button
              className={
                current === "general"
                  ? "newPropertyMainBtns newPropertyMainBtnsClicked"
                  : "newPropertyMainBtns"
              }
              onClick={() => {
                setCurrent("general");
              }}
            >
              General
            </button>
            <button
              className={
                current === "attached"
                  ? "newPropertyMainBtns newPropertyMainBtnsClicked"
                  : "newPropertyMainBtns"
              }
              onClick={() => {
                setCurrent("attached");
              }}
            >
              Attached Lots
            </button>
            {current === "general" ? (
              <button
                style={{ marginLeft: "50%", marginRight: "3%" }}
                onClick={() => {
                  setCurrent("attached");
                }}
                className="propertyPageBtns"
              >
                Next
              </button>
            ) : (
              <button
                data-bs-dismiss="modal"
                style={{ marginLeft: "50%", marginRight: "3%" }}
                className="propertyPageBtns"
                onClick={() => {
                  onSave();
                }}
              >
                Save
              </button>
            )}
            <button className="propertyPageBtns" data-bs-dismiss="modal">
              Cancel
            </button>
          </div>
          <div className="modal-body">
            {current === "general" ? renderGeneral() : renderAttachedLots()}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddNewProperty;
