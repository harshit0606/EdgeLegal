import React, { useState, useEffect, Fragment } from 'react';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
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
import LoadingPage from '../../utils/LoadingPage';
import '../../stylesheets/SingleContact.css';

function SingleContact(props) {
  const history = useHistory();
  const [currScreen, setCurrScreen] = useState('details');
  const [cookies, setCookie, removeCookie] = useCookies(['token']);
  const [editPerson, setEditPerson] = useState(false);
  const [editOrg, setEditOrg] = useState(false);
  const [contactType, setContactType] = useState('');
  const [isLoading, setIsLoading] = useState({});

  const loggedInToken = cookies.token;

  const aboutProps = props?.location?.aboutProps
    ? props?.location?.aboutProps
    : false;

  if (!aboutProps) {
    history.push('/home/contacts');
  }

  const [contactDetails, setContactDetails] = useState({});
  const [custodyDetails, setCustodyDetails] = useState([]);
  const [contactAttachments, setContactAttachments] = useState([]);
  const [countries, setCountries] = useState([]);
  const [boolVal, setBoolVal] = useState(false);
  const [enableButtons, setEnableButtons] = useState(false);
  const [updatedData, setUpdatedData] = useState({});

  // console.log(aboutProps);

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
        // console.log(response.data);
        setCountries(response.data?.data?.countryList);
        setEnableButtons(true);
        setIsLoading(false);
      } catch (err) {
        console.log(err);
        setIsLoading(false);
      }
    };
    if (!boolVal) {
      setIsLoading(true);
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
            fetchCountries();
            // console.log(response.data.data);
            setContactDetails(response.data.data);
            // setUpdatedData(response.data.data);
            setContactType('org');
          });
      } else if (aboutProps.contactType === 'PERSON') {
        setIsLoading(true);
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
            fetchCountries();
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

  const handleContactAttachments = () => {
    axios
      .get(
        `${url}/api/contact-attachment/${aboutProps.contactId}?requestId=123456&contactType=${aboutProps.contactType}`,
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
        setContactAttachments(response.data.data);
        setCurrScreen('attachid');
      });
  };

  function renderDetails() {
    if (contactType === 'person') {
      return (
        <div>
          <PersonDetail
            contactDetails={contactDetails}
            changeBool={setBoolVal}
            allCountries={countries}
            setUpdatedData={setUpdatedData}
            updatedData={updatedData}
          />
        </div>
      );
    }
    if (contactType === 'org') {
      return (
        <div>
          <OrganisationDetail
            contactDetails={contactDetails}
            changeBool={setBoolVal}
            allCountries={countries}
            setUpdatedData={setUpdatedData}
            updatedData={updatedData}
          />
        </div>
      );
    }
  }

  const handleEditInfo = async () => {
    console.log(updatedData);
    var requiredFields = [];
    var allFilled = true;
    if (contactType === 'person') {
      const person = JSON.parse(window.localStorage.getItem('metaData')).person
        .fields;
      // console.log(person);
      person.map((f) => {
        if (!f.allowNull) {
          requiredFields.push(f.fieldName);
        }
      });
      // console.log(requiredFields);
      requiredFields.forEach((e) => {
        if (
          e !== 'deactivatedBy' &&
          e !== 'deactivatedOn' &&
          (updatedData.person[e] === null || updatedData.person[e] === '')
        ) {
          allFilled = false;
          // console.log(e);
        }
      });
    } else {
      const organisation = JSON.parse(window.localStorage.getItem('metaData'))
        .organisation.fields;
      // console.log(organisation);
      organisation.map((f) => {
        if (!f.allowNull) {
          requiredFields.push(f.fieldName);
        }
      });
      // console.log(requiredFields);

      requiredFields.forEach((e) => {
        if (
          e !== 'deactivatedBy' &&
          e !== 'deactivatedOn' &&
          (updatedData.organisation[e] === null ||
            updatedData.organisation[e] === '')
        ) {
          allFilled = false;
          console.log(e);
        }
      });
    }

    // console.log(allFilled);

    if (allFilled) {
      try {
        const { data } = await axios.put(
          `${url}/api/contacts`,
          {
            requestId: '1123445',
            data: updatedData,
          },
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
        // console.log(data);
        setBoolVal(false);
        // window.location.reload();
      } catch (err) {
        console.log(err);
      }
    } else {
      alert('Please fill all required fields');
    }
  };

  function renderSafeCustody() {
    return (
      <div className='renderSafecustody-container'>
        <div className='contactDetail-header-div'>
          <div className='contactDetail-header'>Packet Id</div>
          <div className='contactDetail-header'>Contact Role</div>
        </div>
        {custodyDetails.map((d) => (
          <div className='contactDetail-content-div'>
            <Link to={`/home/safecustody/${d.id.safeCustodyPacketId}`}>
              <div className='contactDetail-val' style={{ fontWeight: '600' }}>
                {d.id.safeCustodyPacketId}
              </div>
            </Link>
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
        <Attachid
          details={aboutProps}
          changeBool={setBoolVal}
          handleContactAttachments={handleContactAttachments}
          attach={contactAttachments}
        />
      </div>
    );
  }

  return (
    <div>
      <div className='safe-custody-stripe'></div>
      <div className='safe-custody-div'>
        <div className='safeContacts '>
          <div>
            <h5 className='singleContact-pageTitle'>Contacts</h5>
          </div>
          <div className='contactBtnDiv'>
            {contactType !== '' && enableButtons !== false && (
              <Fragment>
                <button onClick={handleEditInfo}>Update</button>
                <button onClick={() => history.push('/home/contacts')}>
                  Close
                </button>
              </Fragment>
            )}
          </div>

          <Modal size='xl' show={editPerson} onHide={handleClose}>
            <Modal.Body>
              <EditPersonDetails
                close={handleClose}
                contactDetails={contactDetails}
                changeBool={setBoolVal}
                allCountries={countries}
              />
            </Modal.Body>
          </Modal>
          <Modal size='xl' show={editOrg} onHide={handleClose}>
            <Modal.Body>
              <EditOrgDetails
                close={handleClose}
                contactDetails={contactDetails}
                changeBool={setBoolVal}
                allCountries={countries}
              />
            </Modal.Body>
          </Modal>
        </div>
        <div className='safe-custody-btns-div'>
          <button
            disabled={!enableButtons}
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
            disabled={!enableButtons}
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
            disabled={!enableButtons}
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
            disabled={!enableButtons}
            className={
              currScreen === 'attachid'
                ? 'safe-custody-btns safe-custody-btns-clicked'
                : 'safe-custody-btns'
            }
            onClick={handleContactAttachments}
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
      {isLoading && <LoadingPage />}
    </div>
  );
}

export default SingleContact;
