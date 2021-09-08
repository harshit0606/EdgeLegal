import react from "react";
import styles from "../../stylesheets/property.css";

import PopupFormR from "./popupformR.js";
import PopupFormUnR from "./popupformUnR.js";
import Lot from "./lot.js";
import RelatedMattersLot from "./relatedMatters.js";

function RenderProperty(){
    return (
        <div>
            <div className="row propertyDiv">
                <div className="col-3">
                    <div>
                        <div className="propertyPageHeadings">
                            <h6 className="propertyPageHeads">Property</h6>
                            <button className="propertyPageBtns">+ Add New</button>
                        </div>
                        <div>
                            <label for="titleReference">Title Reference</label>
                            <input id="titleReference" type="text"/>
                            <label for="address">Address</label>
                            <input id="address" type="text"/>
                            <button className="propertyPageBtns searchBtn">Search</button>
                        </div>
                    </div>
                </div>
                <div className="col-9">
                    <div>
                        <div>
                            <div className="propertyPageHeadings">
                                <h6 className="propertyPageHeads" >Property</h6>
                                <button className="propertyPageBtns">Save</button>
                                <button className="propertyPageBtns">Delete</button>
                                <button className="propertyPageBtns">Cancel</button>
                            </div>
                            <div className="propertyPagesubHeads propertyPageFirstDiv">
                                <div className="row">
                                    <div className="col-3">
                                        <label>Building Name</label>
                                        <input type="text" />
                                    </div>
                                    <div className="col-3">
                                        <label>Unit</label>
                                        <input type="text" />
                                    </div>
                                    <div className="col-3">
                                        <label>Street No.</label>
                                        <input type="text" />
                                    </div>
                                    <div className="col-3">
                                        <label>Street</label>
                                        <input type="text" />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-3">
                                        <label>Suburb</label>
                                        <input type="text" />
                                    </div>
                                    <div className="col-3">
                                        <label>State</label>
                                        <input type="text" />
                                    </div>
                                    <div className="col-3">
                                        <label>Post Code</label>
                                        <input type="text" />
                                    </div>
                                    <div className="col-3">
                                        <label>County</label>
                                        <input type="text" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="2">
                            <div className="propertyPageHeadings">
                                <h6 className="propertyPageHeads" >Add/Edit Registered Lots</h6>
                                <button className="propertyPageBtns" data-bs-toggle="modal" data-bs-target="#staticBackdrop1">+ Add</button>
                                <PopupFormR />
                            </div>
                            <div className="propertyPagesubHeads">
                                <div className="row">
                                    <div className="col-1">
                                        <h6>Edit</h6>
                                    </div>
                                    <div className="col-2">
                                        <h6>Title Reference</h6>
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
                                        <h6>Strata Plan No.</h6>
                                        <input type="text"></input>
                                    </div>
                                    <div className="col-2">
                                        <h6>Description</h6>
                                        <input type="text"></input>
                                    </div>
                                </div>
                                <div className="lotsScrollDiv">
                                    <Lot modal={1}/>
                                    <Lot modal={1}/>
                                    <Lot modal={1}/>
                                    <Lot modal={1}/>
                                    <Lot modal={1}/>
                                    <Lot modal={1}/>
                                </div>
                            </div>
                        </div>
                        <div className="3">
                            <div className="propertyPageHeadings">
                                <h6 className="propertyPageHeads" >Add/Edit Unregistered Lots</h6>
                                <button className="propertyPageBtns" data-bs-toggle="modal" data-bs-target="#staticBackdrop2">+ Add</button>
                                <PopupFormUnR />
                            </div>
                            <div className="propertyPagesubHeads">
                            <div className="row">
                                    <div className="col-1">
                                        <h6>Edit</h6>
                                    </div>
                                    <div className="col-2">
                                        <h6>Title Reference</h6>
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
                                        <h6>Strata Plan No.</h6>
                                        <input type="text"></input>
                                    </div>
                                    <div className="col-2">
                                        <h6>Description</h6>
                                        <input type="text"></input>
                                    </div>
                                </div>
                                <div className="lotsScrollDiv">
                                    <Lot modal={2}/>
                                    <Lot modal={2}/>
                                    <Lot modal={2}/>
                                    <Lot modal={2}/>
                                    <Lot modal={2}/>
                                    <Lot modal={2}/>
                                </div>
                            </div>
                        </div>
                        <div className="4">
                            <div className="propertyPageHeadings">
                                <h6 className="propertyPageHeads">Related Matters</h6>
                            </div>
                            <div className="propertyPagesubHeads">
                                <div className="row relatedMattersDiv">
                                    <div className="col-1">
                                        <h6>Matter</h6>
                                        <input type="text"></input>
                                    </div>
                                    <div className="col-2">
                                        <h6>Client Name</h6>
                                        <input type="text"></input>
                                    </div>
                                    <div className="col-2">
                                        <h6>Responsible Person</h6>
                                        <input type="text"></input>
                                    </div>
                                    <div className="col-1">
                                        <h6>Status</h6>
                                        <input type="text"></input>
                                    </div>
                                    <div className="col-1">
                                        <h6>Sub type</h6>
                                        <input type="text"></input>
                                    </div>
                                    <div className="col-1">
                                        <h6>Total Amount Due</h6>
                                        <input type="text"></input>
                                    </div>
                                    <div className="col-2">
                                        <h6>Start Date</h6>
                                        <input type="text"></input>
                                    </div>
                                    <div className="col-2">
                                        <h6>End Date</h6>
                                        <input type="text"></input>
                                    </div>
                                </div>
                                <div className="lotsScrollDiv">
                                    <RelatedMattersLot/>
                                    <RelatedMattersLot/>
                                    <RelatedMattersLot/>
                                    <RelatedMattersLot />
                                    <RelatedMattersLot />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RenderProperty;