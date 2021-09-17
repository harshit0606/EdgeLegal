import React from "react";
function renderMatters() {
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
  export default renderMatters; 