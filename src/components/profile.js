import react,{useState} from "react";
import styles from "../stylesheets/profile.css";

import dashboard from "../icons/dashboard.jpg";
import matters from "../icons/matters.jpg";
import contacts from "../icons/contacts.jpg";
import safeCustody from "../icons/safeCustody.jpg";

import RenderSafeCustody from "./safeCustody/safeCustody.js";
import RenderProperty from "./property/property.js";

import { RiContactsBook2Line } from 'react-icons/ri';
import { MdDashboard } from 'react-icons/md';
import { FaChartPie,FaRegBuilding } from 'react-icons/fa';
import { BiBuildings } from 'react-icons/bi';

function renderDashboard(){
    return (
        <div>
            <h1>dashboard</h1>
        </div>
    );
}

function renderMatters(){
    return (
        <div className="root">
          <main className="content">
            <div className="appBarSpacer" />
            <div className="bodyDiv">
              <div className="contentDiv">
                <h2 className="contentTitle">Matters</h2>
                <div className="headDiv">
                  <div className="subHeadDiv">Matter / Description</div>
                  <div className="subHeadDiv">Associated Client</div>
                  <div className="subHeadDiv">Location / Match</div>
                </div>
                <div className="valueDiv">
                  <div className="valueRow underline">
                    000009 Smith
                  </div>
                  <div className="valueRow">Kevin Smith</div>
                  <div className="valueRow grayColor">
                    Ex-Spouse
                  </div>
                </div>
                <div className="secondRowDiv">
                  <div className="secondRow grayColor">
                    Dissolution of Marriage
                  </div>
                  <div className="secondRow"></div>
                  <div className="secondRow">Kevin Smith</div>
                </div>
                <div className="cardFooter">
                  <div className="footerElement">1 Result only</div>
                  <button className="footerButton">Export</button>
                </div>
              </div>
            </div>
          </main>
        </div>
    );
}

function renderContacts(){
    return (
        <div>
            <h1>Contacts</h1>
        </div>
    );
}

function renderSafeCustody(){

    return (
        <div>
            <RenderSafeCustody />
        </div>
    );
}

function renderProperty(){

  return (
      <div>
          <RenderProperty />
      </div>
  );
}

function Profile(){

    const [current,setCurrent] = useState("property");
    return (
        <div className="row">
            <div className="col-2 profile-menu">
                <button className={current==="dashboard" ? "profile-btns profile-btns-clicked" : "profile-btns" } onClick={()=>{setCurrent("dashboard")}}><MdDashboard /> &nbsp; Dashboard</button><br />
                <button className={current==="matters" ? "profile-btns profile-btns-clicked" : "profile-btns" } onClick={()=>{setCurrent("matters")}}><FaChartPie /> &nbsp; Matters</button><br />
                <button className={current==="contacts" ? "profile-btns profile-btns-clicked" : "profile-btns" } onClick={()=>{setCurrent("contacts")}}><RiContactsBook2Line /> &nbsp; Contacts</button><br />
                <button className={current==="safeCustody" ? "profile-btns profile-btns-clicked" : "profile-btns" } onClick={()=>{setCurrent("safeCustody")}}><BiBuildings /> &nbsp; Custody</button><br />
                <button className={current==="property" ? "profile-btns profile-btns-clicked" : "profile-btns" } onClick={()=>{setCurrent("property")}}><FaRegBuilding /> &nbsp; Property</button><br />
            </div>
            <div className="col-10 profile-main">
              {/* <div>
                hello
              </div> */}
              {current==="dashboard" && renderDashboard()}
              {current==="matters" && renderMatters()}
              {current==="contacts" && renderContacts()}
              {current==="safeCustody" && renderSafeCustody()}
              {current==="property" && renderProperty()}
            </div>
        </div>
    );
}

export default Profile;