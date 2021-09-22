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
        <input className="AddInput" type="text" placeholder="Type" />
        <input className="AddInput" type="text" placeholder="Type" />
        <input className="AddInput" type="text" placeholder="Type" />
        <input className="AddInput" type="text" placeholder="Type" />
        <input className="AddInput" type="text" placeholder="Type" />
        <input className="AddInput" type="text" placeholder="Type" />
        <input className="AddInput" type="text" placeholder="Type" />
        <input className="AddInput" type="text" placeholder="Type" />
        <input className="AddInput" type="text" placeholder="Type" />
        <input className="AddInput" type="text" placeholder="Type" />
        <input className="AddInput" type="text" placeholder="Type" />
        <input className="AddInput" type="text" placeholder="Type" />
      </div>
      <div className="labelll">
        <h3>Street Address</h3>
      </div>
      <div className="inputtDiv">
        <input className="AddInput" type="text" placeholder="Type" />
        <input className="AddInput" type="text" placeholder="Type" />
        <input className="AddInput" type="text" placeholder="Type" />
        <input className="AddInput" type="text" placeholder="Type" />
        <input className="AddInput" type="text" placeholder="Type" />
        <input className="AddInput" type="text" placeholder="Type" />
        <input className="AddInput" type="text" placeholder="Type" />
        <input className="AddInput" type="text" placeholder="Type" />
      </div>
      <div className="labelll">
        <h3>Postal Address</h3>
        </div>
        <div className="inputtDiv">
          <input className="AddInput" type="text" placeholder="Type" />
          <input className="AddInput" type="text" placeholder="Type" />
          <input className="AddInput" type="text" placeholder="Type" />
          <input className="AddInput" type="text" placeholder="Type" />
          <input className="AddInput" type="text" placeholder="Type" />
          <input className="AddInput" type="text" placeholder="Type" />
          <input className="AddInput" type="text" placeholder="Type" />
          <input className="AddInput" type="text" placeholder="Type" />
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

export default AddPerson;
