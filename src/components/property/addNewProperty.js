import react, { useState } from "react";
import styles from "../../stylesheets/property.css";

import PopupFormR from "./popupformR.js";
import PopupFormUnR from "./popupformUnR.js";
import Lot from "./lot.js";

function AddNewProperty() {
  function renderGeneral() {
    return (
      <div className="row">
        <div className="col-4">
          <label>Building Name</label>
          <input type="text" />
        </div>
        <div className="col-4">
          <label>Unit &nbsp; </label>
          <input type="text" />
        </div>
        <div className="col-4">
          <label>Street No.</label>
          <input type="text" />
        </div>
        <div className="col-4">
          <label>Street</label>
          <input type="text" />
        </div>
        <div className="col-4">
          <label>Suburb</label>
          <input type="text" />
        </div>
        <div className="col-4">
          <label>State</label>
          <input type="text" />
        </div>
        <div className="col-4">
          <label>Post Code</label>
          <input type="text" />
        </div>
        <div className="col-4">
          <label>County</label>
          <input type="text" />
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
              data-bs-target="#staticBackdrop1"
            >
              + Add
            </button>
            <PopupFormR />
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
            <div className="lotsScrollDiv">
              <Lot modal={1} />
              <Lot modal={1} />
              <Lot modal={1} />
              <Lot modal={1} />
              <Lot modal={1} />
              <Lot modal={1} />
            </div>
          </div>
        </div>
        <div className="3">
          <div className="propertyPageHeadings">
            <h6 className="propertyPageHeads">Add/Edit Unregistered Lots</h6>
            <button
              className="propertyPageBtns"
              data-bs-toggle="modal"
              data-bs-target="#staticBackdrop2"
            >
              + Add
            </button>
            <PopupFormUnR />
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
            <div className="lotsScrollDiv">
              <Lot modal={2} />
              <Lot modal={2} />
              <Lot modal={2} />
              <Lot modal={2} />
              <Lot modal={2} />
              <Lot modal={2} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  const [current, setCurrent] = useState("general");

  return (
    <div
      className="modal fade "
      id="staticBackdrop3"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabindex="-1"
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div
          style={{ height: "45rem" }}
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
                style={{ marginLeft: "50%", marginRight: "3%" }}
                className="propertyPageBtns"
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
