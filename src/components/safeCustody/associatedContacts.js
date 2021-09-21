import react from "react";
import styles from "../../stylesheets/safeCustody.css";

function AssociatedContacts() {
  return (
    <div className="associatedd">
      <div className="row">
        <div className="col-1">
          <input type="checkbox" style={{marginLeft:'50%'}}></input>
        </div>
        <div className="col-2">
          <p>BEATTY_RED</p>
        </div>
        <div className="col-1">
          <p>Red</p>
        </div>
        <div className="col-1">
          <p>Beatty</p>
        </div>
        <div className="col-2">
          <p>Azure Inc</p>
        </div>
        <div className="col-1">
          <p>Owner</p>
        </div>
        <div className="col-2">
          <p>1234@gmail.com</p>
        </div>
        <div className="col-2">
          <p>0123-46546</p>
        </div>
      </div>
    </div>
  );
}

export default AssociatedContacts;
