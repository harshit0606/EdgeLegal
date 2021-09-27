import react from "react";
import styles from "../../stylesheets/contacts.css";

function AddPerson(props) {
  return (
    <div className="addPersonDiv">
      <div className="titleDiv">
        <h2>Add Person Details</h2>
        <p style={{cursor:"pointer"}} onClick={props.close}>&#10006;</p>
      </div>
      <div className="inputtDiv">
      <select className="AddInput" name="type">
      <option value="Type">Type</option>
      <option value="Type1">Type1</option>
      <option value="Type2">Type2</option>
   
    </select>
    <select className="AddInput" name="Gender">
      <option value="Male">Male</option>
      <option value="Female">Female</option>   
    </select>
    <select className="AddInput" name="Gender">
      <option value="Salutation">Salutation</option>
         
    </select>
        <input className="AddInput" type="text" placeholder="First Name" />
        <input className="AddInput" type="text" placeholder="Middle Name" />
        <input className="AddInput" type="text" placeholder="Last Name" />
        <input className="AddInput" type="text" placeholder="Home Phone" />
        <input className="AddInput" type="text" placeholder="Work Phone" />
        <input className="AddInput" type="text" placeholder="Fax" />
        <input className="AddInput" type="text" placeholder="Mobile Number" />
        <input className="AddInput" type="text" placeholder="Website" />
        <input className="AddInput" type="text" placeholder="Email 1" />
        <input className="AddInput" type="text" placeholder="OrganisationId" />
        <input className="AddInput" type="text" placeholder="Email 2" />
        <input className="AddInput" type="text" placeholder="Place of Birth" />
        <input className="AddInput" type="date"  />
        <input className="AddInput" type="text" placeholder="Country of Birth" />
        <input className="AddInput" type="text" placeholder="Nationality"/>
        <input className="AddInput" type="text" placeholder="Passport No." />
        <input className="AddInput" type="text" placeholder="Occupation"/>
        <input className="AddInput" type="text" placeholder="Practicing Certificate No."/>
        <input className="AddInput" type="text" placeholder="Comments"/>
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
        <button onClick={props.close} className="personncancel">Cancel</button>
        <button className="personnAdd">Add</button>
        </div>
        </div>
    </div>
  );
}

export default AddPerson;
