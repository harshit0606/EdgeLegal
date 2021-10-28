import React, { useState } from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { Link } from 'react-router-dom';
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
                  <Link
                    style={{ textDecoration: 'none', color: 'black' }}
                    to={{
                      pathname: '/home/singlecontact',
                      aboutProps: contact,
                    }}
                  >
                    <p>{contact.contactDetails.contactCode}</p>
                  </Link>
                </div>
                <div className='col-1'>
                  <Link
                    style={{ textDecoration: 'none', color: 'black' }}
                    to={{
                      pathname: '/home/singlecontact',
                      aboutProps: contact,
                    }}
                  >
                    <p>{contact.contactDetails.firstName}</p>
                  </Link>
                </div>
                <div className='col-1'>
                  <Link
                    style={{ textDecoration: 'none', color: 'black' }}
                    to={{
                      pathname: '/home/singlecontact',
                      aboutProps: contact,
                    }}
                  >
                    <p>{contact.contactDetails.lastName}</p>
                  </Link>
                </div>
                <div className='col-2'>
                  <Link
                    style={{ textDecoration: 'none', color: 'black' }}
                    to={{
                      pathname: '/home/singlecontact',
                      aboutProps: contact,
                    }}
                  >
                    <p>{contact.contactDetails.companyName}</p>
                  </Link>
                </div>
                <div className='col-1'>
                  <Link
                    style={{ textDecoration: 'none', color: 'black' }}
                    to={{
                      pathname: '/home/singlecontact',
                      aboutProps: contact,
                    }}
                  >
                    <p>{contact.contactType}</p>
                  </Link>
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
                    <Link
                      style={{ textDecoration: 'none', color: 'black' }}
                      to={{
                        pathname: '/home/singlecontact',
                        aboutProps: contact,
                      }}
                    >
                      <p style={{ textAlign: 'center', paddingLeft: '8px' }}>
                        {contact.contactDetails.emailAddress}
                      </p>
                    </Link>
                  </OverlayTrigger>
                </div>
                <div className='col-2'>
                  <Link
                    style={{ textDecoration: 'none', color: 'black' }}
                    to={{
                      pathname: '/home/singlecontact',
                      aboutProps: contact,
                    }}
                  >
                    <p>{contact.contactDetails.telephoneNumber}</p>
                  </Link>
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
                  <Link
                    style={{ textDecoration: 'none', color: 'black' }}
                    to={{
                      pathname: '/home/singlecontact',
                      aboutProps: contact,
                    }}
                  >
                    <p>{contact.contactDetails.contactCode}</p>
                  </Link>
                </div>
                <div className='col-1'>
                  <Link
                    style={{ textDecoration: 'none', color: 'black' }}
                    to={{
                      pathname: '/home/singlecontact',
                      aboutProps: contact,
                    }}
                  >
                    <p>{contact.contactDetails.firstName}</p>
                  </Link>
                </div>
                <div className='col-1'>
                  <Link
                    style={{ textDecoration: 'none', color: 'black' }}
                    to={{
                      pathname: '/home/singlecontact',
                      aboutProps: contact,
                    }}
                  >
                    <p>{contact.contactDetails.lastName}</p>
                  </Link>
                </div>
                <div className='col-2'>
                  <Link
                    style={{ textDecoration: 'none', color: 'black' }}
                    to={{
                      pathname: '/home/singlecontact',
                      aboutProps: contact,
                    }}
                  >
                    <p>{contact.contactDetails.companyName}</p>
                  </Link>
                </div>
                <div className='col-1'>
                  <Link
                    style={{ textDecoration: 'none', color: 'black' }}
                    to={{
                      pathname: '/home/singlecontact',
                      aboutProps: contact,
                    }}
                  >
                    <p>{contact.contactType}</p>
                  </Link>
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
                    <Link
                      style={{ textDecoration: 'none', color: 'black' }}
                      to={{
                        pathname: '/home/singlecontact',
                        aboutProps: contact,
                      }}
                    >
                      <p style={{ textAlign: 'center', paddingLeft: '8px' }}>
                        {contact.contactDetails.emailAddress}
                      </p>
                    </Link>
                  </OverlayTrigger>
                </div>
                <div className='col-2'>
                  <Link
                    style={{ textDecoration: 'none', color: 'black' }}
                    to={{
                      pathname: '/home/singlecontact',
                      aboutProps: contact,
                    }}
                  >
                    <p>{contact.contactDetails.telephoneNumber}</p>
                  </Link>
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
