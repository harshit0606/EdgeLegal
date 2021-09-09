import react from "react";
import styles from "../../stylesheets/property.css";

function ParticularProperty(props){

    const {titleRef,address} = props;

    return (
        <div>
            <div className="row">
                <h6 className="col-4">{titleRef}</h6>
                <h6 className="col-8">{address}</h6>
            </div>
        </div>
    );
}

export default ParticularProperty;