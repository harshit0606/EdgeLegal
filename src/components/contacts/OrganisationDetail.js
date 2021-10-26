import React from 'react';
import moment from 'moment';
import '../../stylesheets/contact-details.css';
import EditOrgDetails from './EditOrgDetails';

function OrganisationDetail(props) {
  const {
    contactDetails,
    changeBool,
    allCountries,
    setUpdatedData,
    updatedData,
  } = props;
  // console.log(contactDetails);
  return (
    <div className='main-contact-detail-div'>
      <EditOrgDetails
        contactDetails={contactDetails}
        changeBool={changeBool}
        allCountries={allCountries}
        setUpdatedData={setUpdatedData}
        updatedData={updatedData}
      />
    </div>
  );
}

export default OrganisationDetail;
