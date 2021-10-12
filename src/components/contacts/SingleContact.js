import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import attachid from './attachid';
import Detail from './Detail';
import Matter from './matters';
import Attachid from './attachid';
import axios from 'axios';
import url from '../../config.js';
import { useCookies } from 'react-cookie';

function SingleContact(props) {
  const history = useHistory();
  const [currScreen, setCurrScreen] = useState('details');
  const [cookies, setCookie, removeCookie] = useCookies(['token']);
  const loggedInToken = cookies.token;

  const aboutProps = props?.location?.aboutProps
    ? props?.location?.aboutProps
    : false;

  if (!aboutProps) {
    history.push('/home/contacts');
  }

  const [contactDetails, setContactDetails] = useState({});
  const [boolVal, setBoolVal] = useState(false);
  console.log(aboutProps);

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
            // console.log(response.data.data);
            setContactDetails(response.data.data);
            // setSafeCustodyPackets(response.data.data.safeCustodyPackets);
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
            // setSafeCustodyPackets(response.data.data.safeCustodyPackets);
          });
      }
      setBoolVal(true);
    }
  }, [boolVal]);

  function renderDetails() {
    return (
      <div>
        <Detail contactDetails={contactDetails} />
      </div>
    );
  }
  function renderSafeCustody() {
    return <div>Safe Custody</div>;
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
        <Attachid />
      </div>
    );
  }

  return (
    <div>
      <div className='safe-custody-stripe'></div>
      <div className='safe-custody-div'>
        <div className='safeContacts'>
          <div>
            <h5 style={{ fontWeight: 'bold' }}>Contacts</h5>
          </div>
        </div>
        <div className='safe-custody-btns-div'>
          <button
            className={
              currScreen === 'details'
                ? 'safe-custody-btns safe-custody-btns-clicked'
                : 'safe-custody-btns'
            }
            onClick={() => {
              setCurrScreen('details');
            }}
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
            onClick={() => {
              setCurrScreen('safe custody');
            }}
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
