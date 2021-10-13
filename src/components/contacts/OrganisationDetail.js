import React from 'react';
import moment from 'moment';
import '../../stylesheets/contact-details.css';

function OrganisationDetail(props) {
  const { contactDetails } = props;
  console.log(contactDetails);
  return (
    <div className='main-contact-detail-div'>
      <div className='contact-detail-horizontal'>
        <div className='smaller-detail-div'>
          <p>Name</p>
          <h3>{contactDetails?.name ? contactDetails?.name : ''}</h3>
        </div>
        <div className='smaller-detail-div'>
          <p>Legal Name</p>
          <h3>{contactDetails?.legalName ? contactDetails?.legalName : ''}</h3>
        </div>
        <div className='smaller-detail-div'>
          <p>Title</p>
          <h3>{contactDetails?.title ? contactDetails?.title : ''}</h3>
        </div>
      </div>
      <div className='contact-detail-horizontal'>
        <div className='smaller-detail-div'>
          <p>Sub-type</p>
          <h3>{contactDetails?.subType ? contactDetails?.subType : ''}</h3>
        </div>
        <div className='smaller-detail-div'>
          <p>ABN</p>
          <h3>{contactDetails?.abn ? contactDetails?.abn : ''}</h3>
        </div>
        <div className='smaller-detail-div'>
          <p>ACN</p>
          <h3>{contactDetails?.acn ? contactDetails?.acn : ''}</h3>
        </div>
      </div>
      <div className='contact-detail-horizontal'>
        <div className='smaller-detail-div'>
          <p>Email Address</p>
          <h3>{contactDetails?.emailId1 ? contactDetails?.emailId1 : ''}</h3>
        </div>
        <div className='smaller-detail-div'>
          <p>Email Address</p>
          <h3>{contactDetails?.emailId2 ? contactDetails?.emailId2 : ''}</h3>
        </div>
        <div className='smaller-detail-div'>
          <p>Fax Number</p>
          <h3>{contactDetails?.faxNumber ? contactDetails?.faxNumber : ''}</h3>
        </div>
      </div>
      <div className='contact-detail-horizontal'>
        <div className='smaller-detail-div'>
          <p>Mobile Number</p>
          <h3>
            {contactDetails?.mobilePhoneNumber
              ? contactDetails?.mobilePhoneNumber
              : ''}
          </h3>
        </div>
        <div className='smaller-detail-div'>
          <p>Phone Number</p>
          <h3>
            {contactDetails?.phoneNumber1 ? contactDetails?.phoneNumber1 : ''}
          </h3>
        </div>
        <div className='smaller-detail-div'>
          <p>Phone Number</p>
          <h3>
            {contactDetails?.phoneNumber2 ? contactDetails?.phoneNumber2 : ''}
          </h3>
        </div>
      </div>
      <div className='contact-detail-horizontal'>
        <div className='smaller-detail-div'>
          <p>Communication Address</p>
          <h3>
            {contactDetails?.commAddress1
              ? `${contactDetails?.commAddress1}, ${contactDetails?.commAddress2} ${contactDetails?.commAddress3}`
              : ''}
          </h3>
        </div>

        <div className='smaller-detail-div'>
          <p>Mailing Address</p>
          <h3>
            {contactDetails?.commAddress1
              ? `${contactDetails?.mailingAddress1}, ${contactDetails?.mailingAddress2} ${contactDetails?.mailingAddress3}`
              : ''}
          </h3>
        </div>
        <div className='smaller-detail-div'></div>
      </div>
    </div>
  );
}

export default OrganisationDetail;
