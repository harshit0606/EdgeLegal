import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import attachid from './attachid';
import { Modal } from 'react-bootstrap';
import PersonDetail from './PersonDetail';
import OrganisationDetail from './OrganisationDetail';
import Matter from './matters';
import EditPersonDetails from './EditPersonDetails';
import EditOrgDetails from './EditOrgDetails';
import Attachid from './attachid';
import axios from 'axios';
import url from '../../config.js';
import { useCookies } from 'react-cookie';
import '../../stylesheets/SingleContact.css';

function SingleContact(props) {
  const history = useHistory();
  const [currScreen, setCurrScreen] = useState('details');
  const [cookies, setCookie, removeCookie] = useCookies(['token']);
  const [editPerson, setEditPerson] = useState(false);
  const [editOrg, setEditOrg] = useState(false);
  const [contactType, setContactType] = useState('');
  const loggedInToken = cookies.token;

  const aboutProps = props?.location?.aboutProps
    ? props?.location?.aboutProps
    : false;

  if (!aboutProps) {
    history.push('/home/contacts');
  }

  const [contactDetails, setContactDetails] = useState({});
  const [custodyDetails, setCustodyDetails] = useState([]);
  const [boolVal, setBoolVal] = useState(false);

  // console.log(aboutProps);

  useEffect(async () => {
    if (!boolVal) {
      if (aboutProps.contactType === 'ORGANISATION') {
        axios
          .get(
            `${url}/api/contacts/org/${aboutProps.contactId}?requestId=1124455`,
            {
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${loggedInToken}`,
              },
            },
            {
              withCredentials: true,
            }
          )
          .then((response) => {
            console.log(response.data.data);
            setContactDetails(response.data.data);
            setContactType('org');
          });
      } else if (aboutProps.contactType === 'PERSON') {
        axios
          .get(
            `${url}/api/contacts/person/${aboutProps.contactId}?requestId=1124455`,
            {
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${loggedInToken}`,
              },
            },
            {
              withCredentials: true,
            }
          )
          .then((response) => {
            // console.log(response.data.data);
            setContactDetails(response.data.data);
            setContactType('person');
          });
      }
      setBoolVal(true);
    }
  }, [boolVal]);

  const handleOpen = () => {
    if (contactType === 'org') {
      setEditOrg(true);
    }
    if (contactType === 'person') {
      setEditPerson(true);
    }
  };

  const handleClose = () => {
    if (contactType === 'org') {
      setEditOrg(false);
    }
    if (contactType === 'person') {
      setEditPerson(false);
    }
  };

  const handleRenderSafecustody = () => {
    axios
      .get(
        `${url}/api/safecustody/contact/${aboutProps.contactId}?requestId=123456&contactType=${aboutProps.contactType}`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${loggedInToken}`,
          },
        },
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        console.log(response.data.data);
        setCustodyDetails(response.data.data);
        setCurrScreen('safe custody');
      });
    // setCurrScreen('safe custody');
  };

  function renderDetails() {
    if (contactType === 'person') {
      return (
        <div>
          <PersonDetail contactDetails={contactDetails} />
        </div>
      );
    }
    if (contactType === 'org') {
      return (
        <div>
          <OrganisationDetail contactDetails={contactDetails} />
        </div>
      );
    }
  }
  function renderSafeCustody() {
    return (
      <div className='renderSafecustody-container'>
        <div className='contactDetail-header-div'>
          <div className='contactDetail-header'>Packet Id</div>
          <div className='contactDetail-header'>Contact Role</div>
        </div>
        {custodyDetails.map((d) => (
          <div className='contactDetail-content-div'>
            <div className='contactDetail-val'>{d.id.safeCustodyPacketId}</div>
            <div className='contactDetail-val'>{d.contactRole}</div>
          </div>
        ))}
      </div>
    );
  }
  function renderMatters() {
    return (
      <div>
        <Matter />
      </div>
    );
  }
  function renderAttachId() {
    return (
      <div>
        <Attachid details={aboutProps} changeBool={setBoolVal} />
      </div>
    );
  }

  return (
    <div>
      <div className='safe-custody-stripe'></div>
      <div className='safe-custody-div'>
        <div className='safeContacts '>
          <div>
            <h5 style={{ fontWeight: 'bold' }}>Contacts</h5>
          </div>
          <div className='custodyPageBtns'>
            <button onClick={handleOpen} disabled={contactType === ''}>
              Update
            </button>
          </div>

          <Modal size='xl' show={editPerson} onHide={handleClose}>
            <Modal.Body>
              <EditPersonDetails
                close={handleClose}
                contactDetails={contactDetails}
                changeBool={setBoolVal}
              />
            </Modal.Body>
          </Modal>
          <Modal size='xl' show={editOrg} onHide={handleClose}>
            <Modal.Body>
              <EditOrgDetails
                close={handleClose}
                contactDetails={contactDetails}
                changeBool={setBoolVal}
              />
            </Modal.Body>
          </Modal>
        </div>
        <div className='safe-custody-btns-div'>
          <button
            className={
              currScreen === 'details'
                ? 'safe-custody-btns safe-custody-btns-clicked'
                : 'safe-custody-btns'
            }
            onClick={() => setCurrScreen('details')}
          >
            {' '}
            Details
          </button>
          <br />
          <button
            className={
              currScreen === 'matters'
                ? 'safe-custody-btns safe-custody-btns-clicked'
                : 'safe-custody-btns'
            }
            onClick={() => {
              setCurrScreen('matters');
            }}
          >
            {' '}
            Matters
          </button>
          <br />
          <button
            className={
              currScreen === 'safe custody'
                ? 'safe-custody-btns safe-custody-btns-clicked'
                : 'safe-custody-btns'
            }
            onClick={handleRenderSafecustody}
          >
            {' '}
            Safe Custody
          </button>
          <br />
          <button
            className={
              currScreen === 'attachid'
                ? 'safe-custody-btns safe-custody-btns-clicked'
                : 'safe-custody-btns'
            }
            onClick={() => {
              setCurrScreen('attachid');
            }}
          >
            {' '}
            Attach Id
          </button>
          <br />
        </div>

        {currScreen === 'details' && renderDetails()}
        {currScreen === 'matters' && renderMatters()}
        {currScreen === 'safe custody' && renderSafeCustody()}
        {currScreen === 'attachid' && renderAttachId()}
      </div>
    </div>
  );
}

export default SingleContact;
