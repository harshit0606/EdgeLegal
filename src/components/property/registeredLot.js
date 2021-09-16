import react, { useState } from "react";
import styles from "../../stylesheets/property.css";

import { FiEdit2 } from "react-icons/fi";
import PopupFormR from "./popupformR.js";

function RegisteredLot(props) {
  const { modal, registeredLot, isEditTrue, setIsEditTrue, idx } = props;
  console.log("modal", modal);
  const [selectedLot, setSelectedLot] = useState(null);
  return (
    <div>
      <div className="row">
        <div className="col-1">
          <button
            id={idx}
            className="editBtn"
            data-bs-toggle="modal"
            data-bs-target={`#staticBackdrop${modal}`}
            onClick={() => {
              setSelectedLot(registeredLot);
              console.log("i got clicked");
              setIsEditTrue(true);
            }}
          >
            <FiEdit2 />
          </button>
          {isEditTrue && (
            <PopupFormR
              modalId={modal}
              addBtn={0}
              isEditTrue={isEditTrue}
              regLot={selectedLot}
              idx={idx}
              key={selectedLot?.titleReference?.length}
            />
          )}
        </div>
        <div className="col-2">
          <input
            value={registeredLot?.titleReference}
            type="text"
            placeholder="some value"
          />
        </div>
        <div className="col-1">
          <input
            value={registeredLot?.lotNumber}
            type="text"
            placeholder="some value"
          />
        </div>
        <div className="col-1">
          <input
            value={registeredLot?.section}
            type="text"
            placeholder="some value"
          />
        </div>
        <div className="col-3">
          <input
            value={registeredLot?.depositedPlanNumber}
            type="text"
            placeholder="some value"
          />
        </div>
        <div className="col-2">
          <input
            value={registeredLot?.strataPlanNumber}
            type="text"
            placeholder="some value"
          />
        </div>
        <div className="col-2">
          <input type="text" placeholder="some value" />
        </div>
      </div>
    </div>
  );
}

export default RegisteredLot;
