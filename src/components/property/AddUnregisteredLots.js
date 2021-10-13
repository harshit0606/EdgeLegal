import React, { useState } from "react";
import "../../stylesheets/property.css";

function AddUnregisteredLots(props) {
  const { modalId, tempUnregistered, setTempUnregistered, isAddTrue } = props;

  const [chotaFormUn, setChotaFormUn] = useState({
    lot: "",
    partOfLot: "",
    section: "",
    plan: "",
    description: "",
  });

  function chotaSave() {
    setTempUnregistered([...tempUnregistered, chotaFormUn]);
    setChotaFormUn({
      lot: "",
      partOfLot: "",
      section: "",
      plan: "",
      description: "",
    });
    // axios
    //   .put(
    //     `${url}/api/property`,
    //     {
    //       requestId: '1123445',
    //       data: dataToBeSent,
    //     },
    //     {
    //       headers: {
    //         'Content-Type': 'application/json',
    //         Authorization: `Bearer ${loggedInToken}`,
    //       },
    //     },
    //     {
    //       withCredentials: true,
    //     }
    //   )
    //   .then((response) => {
    //     window.location.reload();
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
    // console.log('unregLots', dataToBeSent);
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
          <div className="modal-header">
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
            {isAddTrue == true && (
              <button className="propertyPageBtns">Delete</button>
            )}
            <button
              className="propertyPageBtns"
              data-bs-toggle="modal"
              data-bs-target={`#staticBackdrop${modalId}`}
              aria-label="Close"
            >
              Cancel
            </button>
          </div>
          <div className="modal-body">
            <div style={{ padding: "12px" }}>
              <div className="row">
                <div className="col-4">
                  <h6>Lot No.</h6>
                  <input
                    className="popupFormInputs"
                    value={chotaFormUn.lot}
                    onChange={(e) => {
                      setChotaFormUn({
                        ...chotaFormUn,
                        lot: e.target.value,
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
                    value={chotaFormUn.plan}
                    onChange={(e) => {
                      setChotaFormUn({
                        ...chotaFormUn,
                        plan: e.target.value,
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

export default AddUnregisteredLots;
