import React from 'react'
import Ham from "../icons/Vector.png";
import Matters from "../icons/Matters.png";
import Safe from "../icons/Safe Custody.png";
import documentt from "../icons/document.png";
import task from "../icons/Tasks.png";
import contacts from "../icons/contacts.png";
import { Link } from 'react-router-dom';
import "../stylesheets/sidebar.css";
function Sidebar(props) {

    const mainSidebar=document.querySelector("#side");
    const minisidebar=document.querySelector(".minisidebar");



    function handleCollapse(e){
        e.preventDefault();
        if(props.collapse==false){
            if(mainSidebar)
            mainSidebar.classList.add('collapsse');
            props.setCollapse(true);
            
        }
        else{
            if(mainSidebar)
            mainSidebar.classList.remove('collapsse');
            props.setCollapse(false);
            
        }
        
        }
       
    return (
        <div>
        
        <div id="side" className="sidebarDiv">
            <div className="logo_div"  >
            <img src={Ham} onClick={handleCollapse} />
                <h1>Edge</h1>
            </div>
            <Link to="/home/matters" style={{textDecoration:"none"}}><div className="firstTab" onClick={props.setCurrent("matters")}>
                <img src={Matters}/>
                <p>Matters</p>
            </div></Link>
            <div className="sideTab" >
                <img src={documentt}/>
                <p>Document</p>
            </div>
            <div className="sideTab">
                <img src={task}/>
                <p>Tasks</p>
            </div>
            <Link to="/home/contacts" style={{textDecoration:"none"}}><div className="sideTab" onClick={props.setCurrent("contacts")}>
                <img src={contacts}/>
                <p>Contacts</p>
            </div></Link>
            <Link to="/home/safecustody" style={{textDecoration:"none"}}><div className="sideTab" onClick={props.setCurrent("safeCustody")}>
                <img src={Safe}/>
                <p>Safe Custody</p> 
            </div></Link>
            </div>
            <div className="minisidebar">
            <img  src={Ham} onClick={handleCollapse} />
            <Link to="/home/matters" style={{textDecoration:"none"}}><div className="firstminiTab">
            <img src={Matters}/>
           
        </div></Link>
        <div className="minisideTab">
            <img src={documentt}/>
          
        </div>
        <div className="minisideTab">
            <img src={task}/>
            
        </div>
        <Link to="/home/contacts" style={{textDecoration:"none"}}><div className="minisideTab">
            <img src={contacts}/>
            
        </div></Link>
        <Link to="/home/safecustody" style={{textDecoration:"none"}}><div className="minisideTab">
            <img src={Safe}/>
            
        </div></Link>
            </div>
        </div>
    )
}

export default Sidebar
