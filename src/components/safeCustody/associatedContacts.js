import React, { useState } from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import '../../stylesheets/safeCustody.css';

function AssociatedContacts(props) {
  const { contacts, handleSelectContact, isContactSelected } = props;
  const [selectedIndex, setSelectedIndex] = useState('');

  const handleClick = (data, index) => {
    handleSelectContact(data, index);
  };
  // console.log(contacts);
  return (
    <div>
      {contacts?.map((contact, index) => {
        if (index % 2 == 0)
          return (
            <div className='contacttdatadiv' key={index}>
              <div className='row'>
                <div className='col-1'>
                  <input
                    type='checkbox'
                    onChange={() => handleClick(contact, index)}
                    checked={isContactSelected(index)}
                    style={{ marginLeft: '50%' }}
                  ></input>
                </div>
                <div className='col-2'>
                  <p>{contact.contactDetails.contactCode}</p>
                </div>
                <div className='col-1'>
                  <p>{contact.contactDetails.firstName}</p>
                </div>
                <div className='col-1'>
                  <p>{contact.contactDetails.lastName}</p>
                </div>
                <div className='col-2'>
                  <p>{contact.contactDetails.companyName}</p>
                </div>
                <div className='col-1'>
                  <p>{contact.contactType}</p>
                </div>
                <div className='col-2'>
                  <OverlayTrigger
                    key='bottom'
                    placement='bottom'
                    overlay={
                      <Tooltip id={`tooltip-bottom`}>
                        {contact.contactDetails.emailAddress}
                      </Tooltip>
                    }
                  >
                    <p style={{ textAlign: 'center', paddingLeft: '8px' }}>
                      {contact.contactDetails.emailAddress}
                    </p>
                  </OverlayTrigger>
                </div>
                <div className='col-2'>
                  <p>{contact.contactDetails.telephoneNumber}</p>
                </div>
              </div>
            </div>
          );
        else {
          return (
            <div className='lightcontacttdatadiv'>
              <div className='row'>
                <div className='col-1'>
                  <input
                    onChange={() => handleClick(contact, index)}
                    checked={isContactSelected(index)}
                    type='checkbox'
                    style={{ marginLeft: '50%' }}
                  ></input>
                </div>
                <div className='col-2'>
                  <p>{contact.contactDetails.contactCode}</p>
                </div>
                <div className='col-1'>
                  <p>{contact.contactDetails.firstName}</p>
                </div>
                <div className='col-1'>
                  <p>{contact.contactDetails.lastName}</p>
                </div>
                <div className='col-2'>
                  <p>{contact.contactDetails.companyName}</p>
                </div>
                <div className='col-1'>
                  <p>{contact.contactType}</p>
                </div>
                <div className='col-2'>
                  <OverlayTrigger
                    key='bottom'
                    placement='bottom'
                    overlay={
                      <Tooltip id={`tooltip-bottom`}>
                        {contact.contactDetails.emailAddress}
                      </Tooltip>
                    }
                  >
                    <p style={{ textAlign: 'center', paddingLeft: '8px' }}>
                      {contact.contactDetails.emailAddress}
                    </p>
                  </OverlayTrigger>
                </div>
                <div className='col-2'>
                  <p>{contact.contactDetails.telephoneNumber}</p>
                </div>
              </div>
            </div>
          );
        }
      })}
    </div>
  );
}

export default AssociatedContacts;
