import React, { useState, useEffect } from 'react';
import url from '../../config.js';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import '../../stylesheets/contacts.css';

const initialData = {
  type: '',
  gender: '',
  salutation: '',
  firstName: '',
  middleName: '',
  lastName: '',
  phoneNumber1: '',
  phoneNumber2: '',
  faxNumber: '',
  mobilePhoneNumber: '',
  website: '',
  emailId1: '',
  emailId2: '',
  dateOfBirth: '',
  placeOfBirth: '',
  countryOfBirth: '',
  nationality: '',
  passportNumber: '',
  occupation: '',
  practiceCertNumber: '',
  personComments: '',
  commAddress1: '',
  commAddress2: '',
  commAddress3: '',
  commCity: '',
  commState: '',
  commPostCode: '',
  commCountry: '',
  mailingAddress1: '',
  mailingAddress2: '',
  mailingAddress3: '',
  mailingCity: '',
  mailingState: '',
  mailingPostCode: '',
  mailingCountry: '',
  flagDeactivated: '',
  deactivatedOn: '',
  deactivatedBy: '',
};

function AddPerson(props) {
  const [cookies, setCookie, removeCookie] = useCookies(['token']);
  const loggedInToken = cookies.token;
  const [personDetails, setPersonDetails] = useState(initialData);
  const [otherDetails, setOtherDetails] = useState({
    companyId: '',
    siteId: '',
  });
  const [sameAddress, setSameAddress] = useState(false);
  const [boolVal, setBoolVal] = useState(false);

  useEffect(async () => {
    if (!boolVal) {
      try {
        const { data } = await axios.get(
          `${url}/api/user/1`,
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
        console.log(data);
        setOtherDetails({
          ...otherDetails,
          companyId: data?.organizationId,
          siteId: data?.siteId ? data?.siteId : 1, // this will change later
        });
      } catch (err) {
        console.log(err);
      }
      setBoolVal(true);
    }
  }, []);

  const handleFormChange = (e) => {
    const { name } = e.target;
    setPersonDetails({ ...personDetails, [name]: e.target.value });
  };

  const handleMailingAddress = () => {
    if (sameAddress === false) {
      setSameAddress(true);
      setPersonDetails({
        ...personDetails,
        mailingAddress1: personDetails.commAddress1,
        mailingAddress2: personDetails.commAddress2,
        mailingAddress3: personDetails.commAddress3,
        mailingCity: personDetails.commCity,
        mailingState: personDetails.commState,
        mailingPostCode: personDetails.commPostCode,
        mailingCountry: personDetails.commCountry,
      });
    }
    if (sameAddress === true) {
      setSameAddress(false);
      setPersonDetails({
        ...personDetails,
        mailingAddress1: '',
        mailingAddress2: '',
        mailingAddress3: '',
        mailingCity: '',
        mailingState: '',
        mailingPostCode: '',
        mailingCountry: '',
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    var formData = {
      companyId: otherDetails.companyId,
      siteId: otherDetails.siteId,
      person: {
        ...personDetails,
      },
    };
    // console.log(formData);
    try {
      const { data } = await axios.post(
        `${url}/api/contacts`,
        {
          requestId: '1123445',
          data: formData,
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
      setPersonDetails(initialData);
      props.close();
      // window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className='addPersonDiv'>
      <div className='titleDiv'>
        <h2>Add Person Details</h2>
        <p style={{ cursor: 'pointer' }} onClick={props.close}>
          &#10006;
        </p>
      </div>
      <div className='inputtDiv'>
        <select className='AddInput' name='type' onChange={handleFormChange}>
          <option value='' disabled selected>
            Type
          </option>
          <option value='OWNER'>Owner</option>
          <option value='TENANT'>Tenant</option>
        </select>
        <select className='AddInput' name='gender' onChange={handleFormChange}>
          <option value='Male'>Male</option>
          <option value='Female'>Female</option>
        </select>
        <select
          className='AddInput'
          name='salutation'
          onChange={handleFormChange}
        >
          <option value='Mr'>Mr</option>
          <option value='Ms'>Ms</option>
        </select>
        <input
          className='AddInput'
          type='text'
          name='firstName'
          value={personDetails.firstName}
          onChange={handleFormChange}
          placeholder='First Name'
        />
        <input
          className='AddInput'
          type='text'
          name='middleName'
          value={personDetails.middleName}
          onChange={handleFormChange}
          placeholder='Middle Name'
        />
        <input
          className='AddInput'
          type='text'
          name='lastName'
          value={personDetails.lastName}
          onChange={handleFormChange}
          placeholder='Last Name'
        />
        <input
          className='AddInput'
          type='text'
          name='phoneNumber1'
          value={personDetails.phoneNumber1}
          onChange={handleFormChange}
          placeholder='Home Phone'
        />
        <input
          className='AddInput'
          type='text'
          name='phoneNumber2'
          value={personDetails.phoneNumber2}
          onChange={handleFormChange}
          placeholder='Work Phone'
        />
        <input
          className='AddInput'
          type='text'
          name='faxNumber'
          value={personDetails.faxNumber}
          onChange={handleFormChange}
          placeholder='Fax'
        />
        <input
          className='AddInput'
          type='text'
          name='mobilePhoneNumber'
          value={personDetails.mobilePhoneNumber}
          onChange={handleFormChange}
          placeholder='Mobile Number'
        />
        <input
          className='AddInput'
          type='text'
          name='website'
          value={personDetails.website}
          onChange={handleFormChange}
          placeholder='Website'
        />
        <input
          className='AddInput'
          type='text'
          name='emailId1'
          value={personDetails.emailId1}
          onChange={handleFormChange}
          placeholder='Email 1'
        />
        {/** there is no organisationId in api body */}
        <input className='AddInput' type='text' placeholder='OrganisationId' />
        <input
          className='AddInput'
          type='text'
          name='emailId2'
          value={personDetails.emailId2}
          onChange={handleFormChange}
          placeholder='Email 2'
        />
        <input
          className='AddInput'
          type='text'
          name='placeOfBirth'
          value={personDetails.placeOfBirth}
          onChange={handleFormChange}
          placeholder='Place of Birth'
        />
        <input
          className='AddInput'
          type='date'
          name='dateOfBirth'
          onChange={handleFormChange}
        />
        <input
          className='AddInput'
          type='text'
          name='countryOfBirth'
          value={personDetails.countryOfBirth}
          onChange={handleFormChange}
          placeholder='Country of Birth'
        />
        <input
          className='AddInput'
          type='text'
          name='nationality'
          onChange={handleFormChange}
          value={personDetails.nationality}
          placeholder='Nationality'
        />
        <input
          className='AddInput'
          type='text'
          name='passportNumber'
          value={personDetails.passportNumber}
          onChange={handleFormChange}
          placeholder='Passport No.'
        />
        <input
          className='AddInput'
          type='text'
          name='occupation'
          value={personDetails.occupation}
          onChange={handleFormChange}
          placeholder='Occupation'
        />
        <input
          className='AddInput'
          type='text'
          name='practiceCertNumber'
          value={personDetails.practiceCertNumber}
          onChange={handleFormChange}
          placeholder='Practicing Certificate No.'
        />
        <input
          className='AddInput'
          type='text'
          name='personComments'
          value={personDetails.personComments}
          onChange={handleFormChange}
          placeholder='Comments'
        />
      </div>
      <div className='labelll'>
        <h3>Street Address</h3>
      </div>
      <div className='inputtDiv'>
        <input
          className='AddInput'
          type='text'
          name='commAddress1'
          value={personDetails.commAddress1}
          onChange={handleFormChange}
          placeholder='Address 1'
        />
        <input
          className='AddInput'
          type='text'
          name='commAddress2'
          value={personDetails.commAddress2}
          onChange={handleFormChange}
          placeholder='Address 2'
        />
        <input
          className='AddInput'
          type='text'
          name='commAddress3'
          value={personDetails.commAddress3}
          onChange={handleFormChange}
          placeholder='Address 3'
        />
        <input
          className='AddInput'
          type='text'
          name='commCity'
          value={personDetails.commCity}
          onChange={handleFormChange}
          placeholder='Suburb'
        />
        <input
          className='AddInput'
          type='text'
          name='commState'
          value={personDetails.commState}
          onChange={handleFormChange}
          placeholder='State'
        />
        <input
          className='AddInput'
          type='text'
          name='commPostCode'
          value={personDetails.commPostCode}
          onChange={handleFormChange}
          placeholder='Zip'
        />
        <input
          className='AddInput'
          type='text'
          name='commCountry'
          value={personDetails.commCountry}
          onChange={handleFormChange}
          placeholder='Country'
        />
      </div>
      <div className='labelll'>
        <h3>Postal Address</h3>
        <input
          style={{
            marginLeft: '58%',
            marginRight: '5px',
            height: '15px',
            width: '15px',
          }}
          type='checkbox'
          onClick={handleMailingAddress}
        />
        <label>Same as Communication Address</label>
      </div>
      <div className='inputtDiv'>
        <input
          className='AddInput'
          type='text'
          name='mailingAddress1'
          value={personDetails.mailingAddress1}
          onChange={handleFormChange}
          placeholder='Address 1'
        />
        <input
          className='AddInput'
          type='text'
          name='mailingAddress2'
          value={personDetails.mailingAddress2}
          onChange={handleFormChange}
          placeholder='Address 2'
        />
        <input
          className='AddInput'
          type='text'
          name='mailingAddress3'
          value={personDetails.mailingAddress3}
          onChange={handleFormChange}
          placeholder='Address 3'
        />
        <input
          className='AddInput'
          type='text'
          name='mailingCity'
          value={personDetails.mailingCity}
          onChange={handleFormChange}
          placeholder='Suburb'
        />
        <input
          className='AddInput'
          type='text'
          name='mailingState'
          value={personDetails.mailingState}
          onChange={handleFormChange}
          placeholder='State'
        />
        <input
          className='AddInput'
          type='text'
          name='mailingPostCode'
          value={personDetails.mailingPostCode}
          onChange={handleFormChange}
          placeholder='Zip'
        />
        <input
          className='AddInput'
          type='text'
          name='mailingCountry'
          value={personDetails.mailingCountry}
          onChange={handleFormChange}
          placeholder='Country'
        />
      </div>
      <div className='labelll'>
        <div className='personnbtnDiv'>
          <button onClick={props.close} className='personncancel'>
            Cancel
          </button>
          <button className='personnAdd' onClick={handleSubmit}>
            Add
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddPerson;
