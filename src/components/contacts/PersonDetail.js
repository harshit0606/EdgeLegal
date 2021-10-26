import React from 'react';
import moment from 'moment';
import '../../stylesheets/contact-details.css';
import EditPersonDetails from './EditPersonDetails';
function PersonDetail(props) {
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
      <EditPersonDetails
        contactDetails={contactDetails}
        changeBool={changeBool}
        allCountries={allCountries}
        setUpdatedData={setUpdatedData}
        updatedData={updatedData}
      />
    </div>
  );
}

export default PersonDetail;
