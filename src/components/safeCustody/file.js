import react from "react";
import styles from "../../stylesheets/safeCustody.css";

function File(props) {
  const { packetNumber, status, contents } = props;
  return (
    <div>
      <div className="row safeSelectHeads">
        <div className="col-1">
          <input type="checkbox" />
        </div>
        <div className="col-2">
          <h6>5001</h6>
        </div>
        <div className="col-2">
          <h6>{packetNumber}</h6>
        </div>
        <div className="col-2">
          <h6>Adams.adams</h6>
        </div>
        <div className="col-2">
          <h6>{status}</h6>
        </div>
        <div className="col-3">
          <h6>{contents}</h6>
        </div>
      </div>
    </div>
  );
}

export default File;
