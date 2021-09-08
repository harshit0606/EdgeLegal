import react from "react";
import styles from "../../stylesheets/property.css";

import { FiEdit2 } from "react-icons/fi";

function Lot(props) {

    const {modal} = props;
    console.log("modal",modal);
  return (
    <div>
      <div className="row">
        <div className="col-1">
        <button className="editBtn" data-bs-toggle="modal" data-bs-target={`#staticBackdrop${modal}`}><FiEdit2 /></button>
        </div>
        <div className="col-2">
          <input type="text" placeholder="some value" />
        </div>
        <div className="col-1">
          <input type="text" placeholder="some value" />
        </div>
        <div className="col-1">
          <input type="text" placeholder="some value" />
        </div>
        <div className="col-3">
          <input type="text" placeholder="some value" />
        </div>
        <div className="col-2">
          <input type="text" placeholder="some value" />
        </div>
        <div className="col-2">
          <input type="text" placeholder="some value" />
        </div>
      </div>
    </div>
  );
}

export default Lot;
