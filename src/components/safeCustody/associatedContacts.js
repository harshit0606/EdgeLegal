import React from 'react';
import '../../stylesheets/safeCustody.css';

function AssociatedContacts(props) {
  const { contacts } = props;
  return (

    <div >
      {contacts.map((contact) => (
        <div className="associatedd">
        <div className='row'>
          <div className='col-1'>
            <input type='checkbox' style={{ marginLeft: '50%' }}></input>
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
            <p>{contact.contactDetails.emailAddress}</p>
          </div>
          <div className='col-2'>
            <p>{contact.contactDetails.telephoneNumber}</p>
          </div>
        </div>
        </div>
      ))}


    </div>
  );
}

export default AssociatedContacts;
