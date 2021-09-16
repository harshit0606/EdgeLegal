import react, { useState } from "react";
import styles from "../../stylesheets/property.css";

function PopupFormUnR(props) {
  const {
    modalId,
    addBtn,
    tempUnregistered,
    setTempUnregistered,
    isEditTrue,
  } = props;

  const [chotaFormUn, setChotaFormUn] = useState({
    lotNumber: "",
    partOfLot: "",
    section: "",
    planNumber: "",
    description: "",
  });

  function chotaSave() {
    setTempUnregistered([...tempUnregistered, chotaFormUn]);
    setChotaFormUn({
      lotNumber: "",
      partOfLot: "",
      section: "",
      planNumber: "",
      description: "",
    });
    console.log("chotaFormUn", chotaFormUn);
  }

  return (
    <div
      className="modal fade"
      id={`staticBackdrop${modalId}`}
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabindex="-1"
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div class="modal-header">
            <h5
              style={{ marginRight: "10%" }}
              className="modal-title"
              id="staticBackdropLabel"
            >
              Unregistered Lots
            </h5>
            <button
              data-bs-toggle="modal"
              data-bs-target={`#staticBackdrop${modalId}`}
              onClick={() => {
                chotaSave();
              }}
              className="propertyPageBtns"
            >
              Save
            </button>

            {/* <button className="propertyPageBtns">Delete</button> */}
            {isEditTrue == true && (
              <button className="propertyPageBtns">Delete</button>
            )}
            <button className="propertyPageBtns">Cancel</button>
            <button
              type="button"
              class="btn-close"
              data-bs-toggle="modal"
              data-bs-target={`#staticBackdrop${modalId}`}
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <div>
              <div className="row">
                <div className="col-4">
                  <h6>Lot No.</h6>
                  <input
                    className="popupFormInputs"
                    value={chotaFormUn.lotNumber}
                    onChange={(e) => {
                      setChotaFormUn({
                        ...chotaFormUn,
                        lotNumber: e.target.value,
                      });
                    }}
                    type="text"
                  ></input>
                </div>
                <div className="col-4">
                  <h6>Part of lot</h6>
                  <input
                    className="popupFormInputs"
                    value={chotaFormUn.partOfLot}
                    onChange={(e) => {
                      setChotaFormUn({
                        ...chotaFormUn,
                        partOfLot: e.target.value,
                      });
                    }}
                    type="text"
                  ></input>
                </div>
                <div className="col-4">
                  <h6>Section</h6>
                  <input
                    className="popupFormInputs"
                    value={chotaFormUn.section}
                    onChange={(e) => {
                      setChotaFormUn({
                        ...chotaFormUn,
                        section: e.target.value,
                      });
                    }}
                    type="text"
                  ></input>
                </div>
                <div className="col-4">
                  <h6>Plan No.</h6>
                  <input
                    className="popupFormInputs"
                    value={chotaFormUn.planNumber}
                    onChange={(e) => {
                      setChotaFormUn({
                        ...chotaFormUn,
                        planNumber: e.target.value,
                      });
                    }}
                    type="text"
                  ></input>
                </div>
              </div>
              <h6>Description</h6>
              <textarea
                value={chotaFormUn.description}
                onChange={(e) => {
                  setChotaFormUn({
                    ...chotaFormUn,
                    description: e.target.value,
                  });
                }}
                rows="2"
                cols="55"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PopupFormUnR;
