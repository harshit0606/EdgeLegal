import react from "react";
import styles from "../../stylesheets/contacts.css";

function addOrganization(props) {
  return (
    <div className="addPersonDiv">
      <div className="titleDiv">
        <h2>Add Organisation Details</h2>
        <p style={{cursor:"pointer"}} onClick={props.close}>&#10006;</p>
      </div>
      <div style={{marginLeft:"20px",marginTop:"10px",fontSize:"14px"}}>
      <p style={{marginBottom:"10px"}}>Organisation Type</p>
         <input type="radio" name="org type" value="Bussiness/Partnership"></input> Bussiness/Partnership&nbsp;&nbsp;&nbsp;
         <input type="radio" name="org type" value="Company"/> Company&nbsp;&nbsp;&nbsp;
         <input type="radio" name="org type" value="Government Department"/> Government Department&nbsp;&nbsp;&nbsp;
         <input type="radio" name="org type" value="Trust"/> Trust&nbsp;&nbsp;&nbsp;
        </div>
      <div className="inputtDiv">
        
        <input className="AddInput" type="text" placeholder="Name" />
        <input className="AddInput" type="text" placeholder="Sub Type" />
        <input className="AddInput" type="text" placeholder="Legal Name" />
        <input className="AddInput" type="text" placeholder="Title" />
        <input className="AddInput" type="text" placeholder="Phone Number 1" />
        <input className="AddInput" type="text" placeholder="Fax" />
        <input className="AddInput" type="text" placeholder="Phone Number 2" />
        <input className="AddInput" type="text" placeholder="Phone Number 3" />
        <input className="AddInput" type="text" placeholder="Website" />
        <input className="AddInput" type="text" placeholder="Email 1" />
        <input className="AddInput" type="text" placeholder="Email 2" />
        <input className="AddInput" type="text" placeholder="DX Number"/>
        <input className="AddInput" type="text" placeholder="DX City"/>
        <input className="AddInput" type="text" placeholder="RepresentativeId"/>
        <input className="AddInput" type="text" placeholder="ABN"/>
        <input className="AddInput" type="text" placeholder="CAN"/>

        
      </div>
      <div className="labelll">
        <h3>Street Address</h3>
      </div>
      <div className="inputtDiv">
        <input className="AddInput" type="text" placeholder="Address 1" />
        <input className="AddInput" type="text" placeholder="Address 2" />
        <input className="AddInput" type="text" placeholder="Address 3" />
        <input className="AddInput" type="text" placeholder="Suburb" />
        <input className="AddInput" type="text" placeholder="State" />
        <input className="AddInput" type="text" placeholder="Zip" />
        <input className="AddInput" type="text" placeholder="Country" />
      </div>
      <div className="labelll">
        <h3>Postal Address</h3>
        <input style={{marginLeft:"58%",marginRight:"5px",height:"15px",width:"15px"}} type="checkbox"></input><label>Same as Communication Address</label>
        </div>
        <div className="inputtDiv">
        <input className="AddInput" type="text" placeholder="Address 1" />
        <input className="AddInput" type="text" placeholder="Address 2" />
        <input className="AddInput" type="text" placeholder="Address 3" />
        <input className="AddInput" type="text" placeholder="Suburb" />
        <input className="AddInput" type="text" placeholder="State" />
        <input className="AddInput" type="text" placeholder="Zip" />
        <input className="AddInput" type="text" placeholder="Country" />
        </div>
        <div className="labelll">
        <div className="personnbtnDiv">
        <button className="personncancel">Cancel</button>
        <button className="personnAdd">Add</button>
        </div>
        </div>
    </div>
  );
}

export default addOrganization;
