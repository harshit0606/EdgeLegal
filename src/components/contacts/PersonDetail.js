import React from 'react';
import moment from 'moment';
import '../../stylesheets/contact-details.css';
function PersonDetail(props) {
  const { contactDetails } = props;
  // console.log(contactDetails);
  return (
    <div className='main-contact-detail-div'>
      <div className='contact-detail-horizontal'>
        <div className='smaller-detail-div'>
          <p>Status</p>
          <h3>
            {contactDetails?.flagDeactivated === 1 ? 'De-Active' : 'Active'}
          </h3>
        </div>
        <div className='smaller-detail-div'>
          <p>Type</p>
          <h3>{contactDetails?.role ? contactDetails?.role : ''}</h3>
        </div>
        <div className='smaller-detail-div'>
          <p>Salutaion</p>
          <h3>
            {contactDetails?.salutation ? contactDetails?.salutation : ''}
          </h3>
        </div>
      </div>
      <div className='contact-detail-horizontal'>
        <div className='smaller-detail-div'>
          <p>First Name</p>
          <h3>{contactDetails?.firstName ? contactDetails?.firstName : ''}</h3>
        </div>
        <div className='smaller-detail-div'>
          <p>Middle Name</p>
          <h3>
            {contactDetails?.middleName ? contactDetails?.middleName : ''}
          </h3>
        </div>

        <div className='smaller-detail-div'>
          <p>Last Name</p>
          <h3>{contactDetails?.lastName ? contactDetails?.lastName : ''}</h3>
        </div>
      </div>
      <div className='contact-detail-horizontal'>
        <div className='smaller-detail-div'>
          <p>Country of Brith</p>
          <h3>
            {contactDetails?.countryOfBirth
              ? contactDetails?.countryOfBirth
              : ''}
          </h3>
        </div>
        <div className='smaller-detail-div'>
          <p>Date of Birth</p>
          <h3>
            {contactDetails?.dateOfBirth
              ? moment(contactDetails?.dateOfBirth).format('DD-MM-YYYY')
              : ''}
          </h3>
        </div>
        <div className='smaller-detail-div'>
          <p>Place of birth</p>
          <h3>
            {contactDetails?.placeOfBirth ? contactDetails?.placeOfBirth : ''}
          </h3>
        </div>
      </div>
      <div className='contact-detail-horizontal'>
        <div className='smaller-detail-div'>
          <p>Gender</p>
          <h3>{contactDetails?.gender ? contactDetails?.gender : ''}</h3>
        </div>
        <div className='smaller-detail-div'>
          <p>Email 1</p>
          <h3>{contactDetails?.emailId1 ? contactDetails?.emailId1 : ''}</h3>
        </div>
        <div className='smaller-detail-div'>
          <p>Email 2</p>
          <h3>{contactDetails?.emailId2 ? contactDetails?.emailId2 : ''}</h3>
        </div>
      </div>
      <div className='contact-detail-horizontal'>
        <div className='smaller-detail-div'>
          <p>Home Phone</p>
          <h3>
            {contactDetails?.phoneNumber1 ? contactDetails?.phoneNumber1 : ''}
          </h3>
        </div>
        <div className='smaller-detail-div'>
          <p>Mobile Number</p>
          <h3>
            {contactDetails?.mobilePhoneNumber
              ? contactDetails?.mobilePhoneNumber
              : ''}
          </h3>
        </div>
        <div className='smaller-detail-div'>
          <p>Fax Number</p>
          <h3>{contactDetails?.faxNumber ? contactDetails?.faxNumber : ''}</h3>
        </div>
      </div>
      <div className='contact-detail-horizontal'>
        <div className='smaller-detail-div'>
          <p>Passport Number</p>
          <h3>
            {contactDetails?.passportNumber
              ? contactDetails?.passportNumber
              : ''}
          </h3>
        </div>
        <div className='smaller-detail-div'>
          <p>Website</p>
          <h3>{contactDetails?.website ? contactDetails?.website : ''}</h3>
        </div>
        <div className='smaller-detail-div'>
          {/**<p>Comment</p>
            <h3>{'comment'}</h3> */}
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

export default PersonDetail;
