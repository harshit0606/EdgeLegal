import react from "react";
import styles from "../../stylesheets/property.css";

function PopupFormUnR(){
    return (
        <div className="modal fade" id="staticBackdrop2" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div class="modal-header">
                        <h5 style={{marginRight:'10%'}} className="modal-title" id="staticBackdropLabel">Unregistered Lots</h5>
                        <button className="propertyPageBtns">Save</button>
                        <button className="propertyPageBtns">Delete</button>
                        <button className="propertyPageBtns">Cancel</button>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                <div class="modal-body">
                   <div>
                       <div className="row">
                            <div className="col-4">
                                <h6>Lot No.</h6>
                                <input className="popupFormInputs" type="text"></input>
                            </div>
                            <div className="col-4">
                                <h6>Part of lot</h6>
                                <input className="popupFormInputs" type="text"></input>
                            </div>
                            <div className="col-4">
                                <h6>Section</h6>
                                <input className="popupFormInputs" type="text"></input>
                            </div>
                            <div className="col-4">
                                <h6>Plan No.</h6>
                                <input className="popupFormInputs" type="text"></input>
                            </div>
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

export default PopupFormUnR;