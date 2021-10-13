import React, { useState } from "react";
import "../../stylesheets/property.css";
import { FiEdit2 } from "react-icons/fi";

const ConfirmationPopup = (props) => {};

function EditForm(props) {
  const {
    setIsEditTrue,
    unregDetails,
    setTempUnregistered,
    tempUnregistered,
    index,
  } = props;
  const [chotaFormUn, setChotaFormUn] = useState(unregDetails);
  const [openConfirm, setOpenConfirm] = useState(false);

  function chotaSave() {
    let list = [...tempUnregistered];
    list[index] = chotaFormUn;
    setTempUnregistered(list);
    setIsEditTrue(false);
  }

  const deleteUnregLot = () => {
    let list = [...tempUnregistered];
    list.splice(index, 1);
    setTempUnregistered(list);
  };

  return (
    <div className="propertyPopup-container">
      <div className="propertyPopup-grid">
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
              onClick={() => {
                chotaSave();
              }}
              className="propertyPageBtns"
            >
              Save
            </button>

            <button className="propertyPageBtns" onClick={deleteUnregLot}>
              Delete
            </button>
            <button
              className="propertyPageBtns"
              onClick={() => setIsEditTrue(false)}
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
      {openConfirm && (
        <ConfirmationPopup
          closePopup={() => setOpenConfirm(false)}
          unregDetails={unregDetails}
        />
      )}
    </div>
  );
}

function NewUnregisteredLots(props) {
  const { unregisteredLot, setTempUnregistered, tempUnregistered, index } =
    props;
  const [isEditTrue, setIsEditTrue] = useState(false);
  // console.log('modal', modal);

  return (
    <div>
      <div className="row">
        <div className="col-1">
          <button
            className="editBtn"
            onClick={() => {
              setIsEditTrue(true);
            }}
          >
            <FiEdit2 />
          </button>
          {isEditTrue && (
            <EditForm
              index={index}
              setIsEditTrue={setIsEditTrue}
              unregDetails={unregisteredLot}
              tempUnregistered={tempUnregistered}
              setTempUnregistered={setTempUnregistered}
            />
          )}
        </div>
        <div className="col-2">
          <input value={unregisteredLot?.lot} disabled type="text" />
        </div>
        <div className="col-2">
          <input value={unregisteredLot?.partOfLot} disabled type="text" />
        </div>
        <div className="col-1">
          <input value={unregisteredLot?.section} disabled type="text" />
        </div>
        <div className="col-3">
          <input value={unregisteredLot?.plan} disabled type="text" />
        </div>
        <div className="col-3">
          <input type="text" value={unregisteredLot?.description} disabled />
        </div>
      </div>
    </div>
  );
}

export default NewUnregisteredLots;
