import react from "react";
import styles from "../../stylesheets/contacts.css";
import AssociatedContacts from "../safeCustody/associatedContacts";
import ContactStripe from "../topStripes/ContactStripe";

function Contacts() {
  return (
    <div style={{backgroundColor:'white',marginLeft:"30px",marginRight:"30px",paddingBottom:"30px"}}>
    <div><ContactStripe/></div>
      
      <div className="row associatedContacts">
        <div className="col-1"></div>
        <div className="col-2">
          <label> Contact Code</label>
          <input type="text"></input>
        </div>
        <div className="col-1">
          <label>F.Name</label>
          <input type="text"></input>
        </div>
        <div className="col-1">
          <label>L.Name</label>
          <input type="text"></input>
        </div>
        <div className="col-2">
          <label>Company</label>
          <input type="text"></input>
        </div>
        <div className="col-1">
          <label> Type</label>
          <input type="text"></input>
        </div>
        <div className="col-2">
          <label>Email Address</label>
          <input type="text"></input>
        </div>
        <div className="col-2">
          <label>Phone Number</label>
          <input type="text"></input>
        </div>
      </div>
      <div>
        <AssociatedContacts />
        <AssociatedContacts />
        <AssociatedContacts />
        <AssociatedContacts />
        <AssociatedContacts />
      </div>
    </div>
  );
}

export default Contacts;
