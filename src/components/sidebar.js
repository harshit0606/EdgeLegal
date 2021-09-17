import React from 'react'
import Ham from "../icons/Vector.png";
import Matters from "../icons/Matters.png";
import Safe from "../icons/Safe Custody.png";
import documentt from "../icons/document.png";
import task from "../icons/Tasks.png";
import contacts from "../icons/contacts.png";
import "../stylesheets/sidebar.css";
function sidebar() {
    return (
        <div className="sidebarDiv">
            <div className="logo_div">
            <img src={Ham} />
                <h1>Edge</h1>
            </div>
            <div className="firstTab">
                <img src={Matters}/>
                <p>Matters</p>
            </div>
            <div className="sideTab">
                <img src={documentt}/>
                <p>Document</p>
            </div>
            <div className="sideTab">
                <img src={task}/>
                <p>Tasks</p>
            </div>
            <div className="sideTab">
                <img src={contacts}/>
                <p>Contacts</p>
            </div>
            <div className="sideTab">
                <img src={Safe}/>
                <p>Safe Custody</p>
            </div>
            
        </div>
    )
}

export default sidebar
