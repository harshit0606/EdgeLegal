import react, { useState, useEffect } from "react";
import Sidebar from "./sidebar";
import RenderAllSafeCustody from "./safeCustody/AllSafeCustody.js";
import RenderSafeCustody from "./safeCustody/safeCustody";
import RenderProperty from "./property/property.js";
import Matters from "./matters";
import "../stylesheets/profile.css";
import "../stylesheets/home.css";
import Navbar from "./navbar.js";
import{Link,Switch,Route} from "react-router-dom"
import RenderContacts from "./contacts/contacts.js";
import safeCustodystripe from "./topStripes/safeCustody";
import homestripe from "./topStripes/homestripe";
import SingleContact from "./contacts/SingleContact"
function Home() {
 

  const [collapse, setCollapse] = useState(false);
  const [current, setCurrent] = useState("safeCustody");

  const pagesDiv = document.querySelector(".pagesDiv");
  useEffect(() => {}, [collapse,current]);

  if (collapse == true) {
    if (pagesDiv) pagesDiv.classList.add("fullwidth");
  } else {
    if (pagesDiv) pagesDiv.classList.remove("fullwidth");
  }
  function renderMatters() {
    return (
      <div className="root">
        <main className="content">
          <div className="appBarSpacer"/>
          <div className="bodyDiv">
            <div className="contentDiv">
              <h2 className="contentTitle">Matters</h2>
              <div className="headDiv">
                <div className="subHeadDiv">Matter / Description</div>
                <div className="subHeadDiv">Associated Client</div>
                <div className="subHeadDiv">Location / Match</div>
              </div>
              <div className="valueDiv">
                <div className="valueRow underline">000009 Smith</div>
                <div className="valueRow">Kevin Smith</div>
                <div className="valueRow grayColor">Ex-Spouse</div>
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

  function renderContacts() {
    return (
      <div>
        <RenderContacts />
      </div>
    );
  }

  function renderSafeCustody() {
    return (
      <div>
        <RenderSafeCustody />
      </div>
    );
  }
  function renderAllSafeCustody(){
    return (
      <div>
        <RenderAllSafeCustody />
      </div>
    );
  }

  function renderProperty() {
    return (
      <div>
        <RenderProperty />
      </div>
    );
  }

  return (
    <div>
      <Sidebar 
      collapse={collapse} 
      setCollapse={setCollapse}
      setCurrent={setCurrent}
      />
      <div className="pagesDiv">
      <div className="stripes">
      <Route path="/home" component={homestripe} />
      </div>
      <div className="sidepagecontent">
      <Switch>
      <Route path="/home/matters" exact component={Matters} />
      <Route path="/home/contacts" exact component={RenderContacts} />
      <Route path="/home/safecustody" exact component={RenderAllSafeCustody} />
      <Route path="/home/safecustody/:id" exact component={RenderSafeCustody}/>
      <Route path="/home/property" exact component={RenderProperty} />
      <Route path="/home/singlecontact" exact component={SingleContact}/>  
  </Switch>
    </div>
      </div>
    </div>
  );
}

export default Home;
