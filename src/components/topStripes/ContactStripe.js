import React, { useState } from 'react';
import '../../stylesheets/stripes.css';
import { Modal, Button } from 'react-bootstrap';
import AddPerson from '../contacts/addPerson';
import AddOrganization from '../contacts/addOrganization';

function ContactStripe(props) {
  const [peopleShow, setPeopleShow] = useState(false);
  const [orgShow, setOrgShow] = useState(false);
  const showAddPeople = () => {
    setPeopleShow(true);
  };
  const showOrgModal = () => {
    setOrgShow(true);
  };
  function handleClose() {
    setOrgShow(false);
    setPeopleShow(false);
  }
  return (
    <div className='safeStripe colorOfBackground'>
      <p
        style={{
          fontSize: '16px',
          marginBottom: '0px',
          color: '#0c244c',
          fontWeight: '600',
          fontFamily: "'Poppins', 'Mulish', sans-serif !important",
          marginRight: '2.2rem',
        }}
      >
        Contacts
      </p>
      <div
        style={{
          display: 'flex',
          width: '500px',
          justifyContent: 'flex-start',
        }}
      >
        <button onClick={showAddPeople} className='custodyAddbtn'>
          <span className='plusdiv'>+</span> Person
        </button>
        <button onClick={showOrgModal} className='custodyAddbtn'>
          <span className='plusdiv'>+</span> Organisation
        </button>
        <button onClick={props.handleDelete} className='custodyAddbtn'>
          Delete
        </button>
      </div>
      <Modal size='xl' show={peopleShow} onHide={handleClose}>
        <Modal.Body>
          <AddPerson close={handleClose} />
        </Modal.Body>
      </Modal>
      <Modal size='xl' show={orgShow} onHide={handleClose}>
        <Modal.Body>
          <AddOrganization close={handleClose} />
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default ContactStripe;
