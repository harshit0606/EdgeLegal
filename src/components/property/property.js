import react, { useEffect,useState } from "react";
import axios from "axios";
import url from "../../config.js";
import {useCookies} from 'react-cookie';

import styles from "../../stylesheets/property.css";

import PopupFormR from "./popupformR.js";
import PopupFormUnR from "./popupformUnR.js";
import Lot from "./lot.js";
import RelatedMattersLot from "./relatedMatters.js";
import AddNewProperty from "./addNewProperty.js";
import ParticularProperty from "./particularProperty.js";

function RenderProperty(){

    const [cookies, setCookie, removeCookie] = useCookies(['token']);
    const loggedInToken = cookies.token;

    const [allProperties,setAllProperties] = useState(null);
    const [titleRef,setTitleRef] = useState(null);
    const [address,setAddress] = useState(null);

    const [specificProperty,setSpecificProperty] = useState(null);

    function getAllProperties(){
        axios.get(`${url}/api/property?requestId=1234567&titleRef=${titleRef}&address=${address}`,{
            headers:{
                'Content-Type':'application/json',
                "Authorization" :`Bearer ${loggedInToken}`
            }
        },{
            withCredentials: true
        })
        .then((response)=>{
            setAllProperties(response.data.data.properties);
            console.log("in axios then",response.data.data);
        });
    }

    function renderAllProperties(){
        console.log("all properties",allProperties);
        return (
            allProperties?.map((property)=>{
                const propertyAddress = "" + property.unit + "/ " + property.streetNo + "/ " + property.street + "/ " + property.suburb + "/ " + property.state + "/ " + property.postCode + "/ " + property.country;
                return (
                    <div className="row particularPrprty" onClick={()=>{fetchPropertyData(property.id)}}>
                        <h6 className="col-4">{property.titleType}</h6>
                        <h6 className="col-8">{propertyAddress}</h6>
                    </div>
                );
            })
        );
    }

    function fetchPropertyData(id){
        document.getElementById("searchPropertyDiv").classList.add("hideSection");
        document.getElementById("mainPropertyDiv").classList.remove("hideSection");
        axios.get(`${url}/api/property/${id}?requestId=1234567`,{
            headers:{
                'Content-Type':'application/json',
                "Authorization" :`Bearer ${loggedInToken}`
            }
        },{
            withCredentials: true
        })
        .then((response)=>{
            console.log(response.data.data);
            setSpecificProperty(response.data.data);
        });
    }

    function backToSearch(){
        document.getElementById("searchPropertyDiv").classList.remove("hideSection");
        document.getElementById("mainPropertyDiv").classList.add("hideSection");
    }
    
    function renderRegisteredLots(){
        return (
            specificProperty?.registeredProperties.map((registeredLot)=>{
                return (
                    <Lot 
                        modal={1}
                        registeredLot = {registeredLot}
                    />
                );
            })
        );
    }

    function renderUnregisteredLots(){
        return (
            specificProperty?.unregisteredProperties.map((unregisteredLot)=>{
                return (
                    <Lot 
                        modal={2}
                        unregisteredLot = {unregisteredLot}
                    />
                );
            })
        );
    }

    //const [count,setCount] = useState(0);

    return (
        <div>
            <div className="row propertyDiv">
                <div className="col-3" id="searchPropertyDiv">
                    <div>
                        {/* <button onClick={()=>{fetchPropertyData()}}>Bello</button> */}
                        <div className="propertyPageHeadings">
                            <h6 className="propertyPageHeads">Property</h6>
                            <button className="propertyPageBtns" data-bs-toggle="modal" data-bs-target="#staticBackdrop3">+ Add New</button>
                            <AddNewProperty />
                        </div>
                        <div className="leftPropertyDiv">
                            <div className="row">
                                <div className="col-4">
                                    <label for="titleReference">Title Ref.</label>
                                    <input style={{width:'100%',marginTop:'20%'}} id="titleReference" value={titleRef} onChange={(e)=>{setTitleRef(e.target.value)}} type="text"/>
                                </div>
                                <div className="col-8">
                                    <label for="address">Address</label>
                                    <input style={{width:'90%',marginTop:'8%'}} id="address" value={address} onChange={(e)=>{setAddress(e.target.value)}} type="text"/>
                                </div>
                            </div>
                            <button className="propertyPageBtns searchBtn" onClick={()=>{
                                getAllProperties()
                            }} >Search</button>
                            <div className="row">
                                <div style={{marginBottom:'5%'}} className="col-4">
                                    <label for="titleReference">Title Ref.</label>
                                </div>
                                <div style={{marginBottom:'5%'}} className="col-8">
                                    <label for="address">Address</label>
                                </div>
                            </div>
                            {renderAllProperties()}
                        </div>
                    </div>
                </div>
                <div className="col-12 hideSection" id="mainPropertyDiv">
                    <button onClick={()=>{backToSearch()}}>Back</button>
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
                                        <input type="text" value={specificProperty?.buildingName}/>
                                    </div>
                                    <div className="col-3">
                                        <label>Unit</label>
                                        <input type="text" value={specificProperty?.unit}/>
                                    </div>
                                    <div className="col-3">
                                        <label>Street No.</label>
                                        <input type="text" value={specificProperty?.streetNo}/>
                                    </div>
                                    <div className="col-3">
                                        <label>Street</label>
                                        <input type="text" value={specificProperty?.street}/>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-3">
                                        <label>Suburb</label>
                                        <input type="text" value={specificProperty?.suburb}/>
                                    </div>
                                    <div className="col-3">
                                        <label>State</label>
                                        <input type="text" value={specificProperty?.state}/>
                                    </div>
                                    <div className="col-3">
                                        <label>Post Code</label>
                                        <input type="text" value={specificProperty?.postCode}/>
                                    </div>
                                    <div className="col-3">
                                        <label>County</label>
                                        <input type="text" value={specificProperty?.county}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="2">
                            <div className="propertyPageHeadings">
                                <h6 className="propertyPageHeads" >Add/Edit Registered Lots</h6>
                                <button className="propertyPageBtns" data-bs-toggle="modal" data-bs-target="#staticBackdrop1">+ Add</button>
                                <PopupFormR 
                                    modalId={1}
                                    //count ={count}
                                    //countFn = {setCount}
                                />
                                {/* <button onClick={()=>{console.log("count:",count)}}>Hello</button> */}
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
                                    {renderRegisteredLots()}
                                </div>
                            </div>
                        </div>
                        <div className="3">
                            <div className="propertyPageHeadings">
                                <h6 className="propertyPageHeads" >Add/Edit Unregistered Lots</h6>
                                <button className="propertyPageBtns" data-bs-toggle="modal" data-bs-target="#staticBackdrop2">+ Add</button>
                                <PopupFormUnR 
                                    modalId={2}
                                />
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
                                    {renderUnregisteredLots()}
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