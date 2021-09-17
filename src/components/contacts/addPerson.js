import react from "react";
import styles from "../../stylesheets/contacts.css";

function AddPerson() {
  return (
    <div>
      <div
        class="modal fade"
        id="staticBackdrop20"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabindex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered modal-lg">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="staticBackdropLabel">Add Person Details</h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body addPersonMainDiv">
              <div>
                <div className="row">
                  <div className="col-3">
                    <input type="text"></input>
                    <input type="text"></input>
                    <input type="text"></input>
                    <input type="text"></input>
                    <input type="text"></input>
                    <input type="text"></input>
                  </div>
                  <div className="col-3">
                    <input type="text"></input>
                    <input type="text"></input>
                    <input type="text"></input>
                    <input type="text"></input>
                    <input type="text"></input>
                    <input type="text"></input>
                  </div>
                  <div className="col-3">
                    <input type="text"></input>
                    <input type="text"></input>
                    <input type="text"></input>
                    <input type="text"></input>
                    <input type="text"></input>
                  </div>
                  <div className="col-3">
                    <input type="text"></input>
                    <input type="text"></input>
                    <input type="text"></input>
                    <input type="text"></input>
                    <input type="text"></input>
                  </div>
                </div>
                <h6>Street Address</h6>
                <div className="row">
                  <div className="col-3">
                    <input type="text"></input>
                  </div>
                  <div className="col-3">
                    <input type="text"></input>
                  </div>
                  <div className="col-3">
                    <input type="text"></input>
                  </div>
                  <div className="col-3">
                    <input type="text"></input>
                  </div>
                  <div className="col-3">
                    <input type="text"></input>
                  </div>
                  <div className="col-3">
                    <input type="text"></input>
                  </div>
                  <div className="col-3">
                    <input type="text"></input>
                  </div>
                </div>
                <h6>Postal Address</h6>
                <div className="row">
                  <div className="col-3">
                    <input type="text"></input>
                  </div>
                  <div className="col-3">
                    <input type="text"></input>
                  </div>
                  <div className="col-3">
                    <input type="text"></input>
                  </div>
                  <div className="col-3">
                    <input type="text"></input>
                  </div>
                  <div className="col-3">
                    <input type="text"></input>
                  </div>
                  <div className="col-3">
                    <input type="text"></input>
                  </div>
                  <div className="col-3">
                    <input type="text"></input>
                  </div>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Cancel
              </button>
              <button type="button" class="btn btn-primary">
                OK
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddPerson;
