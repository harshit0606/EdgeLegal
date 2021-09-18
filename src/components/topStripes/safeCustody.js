import React from 'react'
import "../../stylesheets/stripes.css";
import Bell from  "../../icons/bell.png";
import {Avatar} from "@mui/material";
import Photo from "../../icons/avatar-4.png";

function safeCustodystripe() {
    return (
        <div className="safestrip">
            <p>Safe Custody</p>
            <div className="safe_iconsDiv">
                <button className="safeadd">Add</button>
                <img className="safe_iconsDivimg" src={Bell}/>
                <Avatar src={Photo}/>
                </div>
        </div>
    )
}

export default safeCustodystripe;
