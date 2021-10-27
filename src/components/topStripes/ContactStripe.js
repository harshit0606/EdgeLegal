import React, { useState, useEffect } from 'react';
import axios from 'axios';
import url from '../../config.js';
import { useCookies } from 'react-cookie';
import '../../stylesheets/stripes.css';
import { Modal, Button } from 'react-bootstrap';
import AddPerson from '../contacts/addPerson';
import AddOrganization from '../contacts/addOrganization';

function ContactStripe(props) {
  const { changeBool } = props;
  const [peopleShow, setPeopleShow] = useState(false);
  const [orgShow, setOrgShow] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies(['token']);
  const [countries, setCountries] = useState([]);
  const [boolVal, setBoolVal] = useState(false);

  const loggedInToken = cookies.token;

  useEffect(async () => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get(
          `${url}/api/dropdown/countries?requestId=1124455`,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${loggedInToken}`,
            },
          },
          {
            withCredentials: true,
          }
        );
        setCountries(response.data?.data?.countryList);
      } catch (err) {
        console.log(err);
      }
    };

    if (!boolVal) {
      fetchCountries();
      setBoolVal(true);
    }
  }, [boolVal, loggedInToken]);

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
          <span className='plusdiv'>-</span> Delete
        </button>
      </div>
      <Modal size='xl' show={peopleShow} onHide={handleClose}>
        <Modal.Body>
          <AddPerson
            close={handleClose}
            allCountries={countries}
            refresh={changeBool}
          />
        </Modal.Body>
      </Modal>
      <Modal size='xl' show={orgShow} onHide={handleClose}>
        <Modal.Body>
          <AddOrganization
            close={handleClose}
            allCountries={countries}
            refresh={changeBool}
          />
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default ContactStripe;
