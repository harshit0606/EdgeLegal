import React,{useState} from 'react'
import "../../stylesheets/stripes.css"
import{Modal,Button} from "react-bootstrap";
import AddPerson from '../contacts/addPerson';
import AddOrganization from "../contacts/addOrganization";

function ContactStripe() {
    const [peopleShow,setPeopleShow]=useState(false);
    const [orgShow,setOrgShow]=useState(false);
    const showAddPeople=()=>{
        setPeopleShow(true);
    }
    const showOrgModal=()=>{
        setOrgShow(true);
    }
    function handleClose(){
        setOrgShow(false);
        setPeopleShow(false);
    }
    return (
        <div className="safeStripe">
            <p>Contacts</p>
            <div style={{display:"flex",width:"300px"}}>
            <button onClick={showAddPeople} className="custodyAddbtn"><span className="plusdiv">+</span> Person</button>
            <button onClick={showOrgModal} className="custodyAddbtn"><span className="plusdiv">+</span> Organisation</button>
            </div>
            <Modal size="lg" show={peopleShow} onHide={handleClose}>
           <Modal.Body>
           <AddPerson close={handleClose}/>
           </Modal.Body>
           </Modal> 
           <Modal size="lg" show={orgShow} onHide={handleClose}>
           <Modal.Body>
           <AddOrganization close={handleClose}/>
           </Modal.Body> 
            </Modal>
        </div>
    )
}

export default ContactStripe
