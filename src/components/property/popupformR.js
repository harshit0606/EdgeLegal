import react, { useState, useEffect } from "react";
import styles from "../../stylesheets/property.css";

function PopupForm(props) {
  const {
    modalId,
    addBtncount,
    countFn,
    tempRegistered,
    setTempRegistered,
    addBtn
  } = props;

  const [chotaForm, setChotaForm] = useState({
    titleReference: "",
    lotNumber: "",
    depositedPlanNumber: "",
    strataPlanNumber: "",
    section: "",
  });

  function chotaSave() {
    console.log(tempRegistered);
    setTempRegistered([...tempRegistered, chotaForm]);
    setChotaForm({
      titleReference: "",
      lotNumber: "",
      depositedPlanNumber: "",
      strataPlanNumber: "",
      section: "",
    });
    console.log("chotaForm", chotaForm);
  }
  useEffect(()=>{
    console.log("addBtn in popup form r",addBtn);
  },[]);
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
              Registered Lots
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
            {addBtn===0 && <button className="propertyPageBtns">Delete</button>}
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
                  <h6>Title Reference</h6>
                  <input
                    className="popupFormInputs"
                    value={chotaForm.titleReference}
                    onChange={(e) => {
                      setChotaForm({
                        ...chotaForm,
                        titleReference: e.target.value,
                      });
                    }}
                    type="text"
                  ></input>
                </div>
                <div className="col-4">
                  <h6>Lot No.</h6>
                  <input
                    className="popupFormInputs"
                    value={chotaForm.lotNumber}
                    onChange={(e) => {
                      setChotaForm({
                        ...chotaForm,
                        lotNumber: e.target.value,
                      });
                    }}
                    type="text"
                  ></input>
                </div>
                <div className="col-4">
                  <h6>Section</h6>
                  <input
                    className="popupFormInputs"
                    value={chotaForm.section}
                    onChange={(e) => {
                      setChotaForm({
                        ...chotaForm,
                        section: e.target.value,
                      });
                    }}
                    type="text"
                  ></input>
                </div>
                <div className="col-4">
                  <h6>Deposited Plan No.</h6>
                  <input
                    className="popupFormInputs"
                    value={chotaForm.depositedPlanNumber}
                    onChange={(e) => {
                      setChotaForm({
                        ...chotaForm,
                        depositedPlanNumber: e.target.value,
                      });
                    }}
                    type="text"
                  ></input>
                </div>
                <div className="col-4">
                  <h6>Strata Plan No.</h6>
                  <input
                    className="popupFormInputs"
                    value={chotaForm.strataPlanNumber}
                    onChange={(e) => {
                      setChotaForm({
                        ...chotaForm,
                        strataPlanNumber: e.target.value,
                      });
                    }}
                    type="text"
                  ></input>
                </div>
                {/* <button onClick={()=>{
                                countFn(count+1);
                                console.log("count in child:",count)
                            }}>Hello</button> */}
              </div>
              <h6>Description</h6>
              <textarea rows="2" cols="55" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PopupForm;
