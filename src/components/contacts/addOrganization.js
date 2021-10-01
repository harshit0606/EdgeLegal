import React, { useState, useEffect } from 'react';
import url from '../../config.js';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import '../../stylesheets/contacts.css';

const initialData = {
  type: '',
  subType: '',
  legalName: '',
  name: '',
  title: '',
  phoneNumber1: '',
  phoneNumber2: '',
  faxNumber: '',
  mobilePhoneNumber: '',
  website: '',
  emailId1: '',
  emailId2: '',
  dxNumber: '',
  dxCity: '',
  abn: '',
  acn: '',
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
  representativeId: '',
};

function AddOrganization(props) {
  const [cookies, setCookie, removeCookie] = useCookies(['token']);
  const loggedInToken = cookies.token;
  const [organizationDetails, setOrganizationDetails] = useState(initialData);
  const [sameAddress, setSameAddress] = useState(false);
  const [otherDetails, setOtherDetails] = useState({
    companyId: '',
    siteId: '',
  });
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
    setOrganizationDetails({ ...organizationDetails, [name]: e.target.value });
  };

  const handleMailingAddress = () => {
    if (sameAddress === false) {
      setSameAddress(true);
      setOrganizationDetails({
        ...organizationDetails,
        mailingAddress1: organizationDetails.commAddress1,
        mailingAddress2: organizationDetails.commAddress2,
        mailingAddress3: organizationDetails.commAddress3,
        mailingCity: organizationDetails.commCity,
        mailingState: organizationDetails.commState,
        mailingPostCode: organizationDetails.commPostCode,
        mailingCountry: organizationDetails.commCountry,
      });
    }
    if (sameAddress === true) {
      setSameAddress(false);
      setOrganizationDetails({
        ...organizationDetails,
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
    // console.log('org', organizationDetails);
    var formData = {
      companyId: otherDetails.companyId,
      siteId: otherDetails.siteId,
      organisation: {
        ...organizationDetails,
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
      setOrganizationDetails(initialData);
      props.close();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className='addPersonDiv'>
      <div className='titleDiv'>
        <h2>Add Organisation Details</h2>
        <p style={{ cursor: 'pointer' }} onClick={props.close}>
          &#10006;
        </p>
      </div>
      <div style={{ marginLeft: '20px', marginTop: '10px', fontSize: '14px' }}>
        <p style={{ marginBottom: '10px' }}>Organisation Type</p>
        <input
          type='radio'
          name='type'
          value='Bussiness/Partnership'
          onChange={handleFormChange}
        ></input>{' '}
        Bussiness/Partnership&nbsp;&nbsp;&nbsp;
        <input
          type='radio'
          name='type'
          value='Company'
          onChange={handleFormChange}
        />{' '}
        Company&nbsp;&nbsp;&nbsp;
        <input
          type='radio'
          name='type'
          value='Government Department'
          onChange={handleFormChange}
        />{' '}
        Government Department&nbsp;&nbsp;&nbsp;
        <input
          type='radio'
          name='type'
          value='Trust'
          onChange={handleFormChange}
        />{' '}
        Trust&nbsp;&nbsp;&nbsp;
      </div>
      <div className='inputtDiv'>
        <input
          className='AddInput'
          type='text'
          name='name'
          value={organizationDetails.name}
          onChange={handleFormChange}
          placeholder='Name'
        />
        <input
          className='AddInput'
          type='text'
          name='subType'
          value={organizationDetails.subType}
          onChange={handleFormChange}
          placeholder='Sub Type'
        />
        <input
          className='AddInput'
          type='text'
          name='legalName'
          value={organizationDetails.legalName}
          onChange={handleFormChange}
          placeholder='Legal Name'
        />
        <input
          className='AddInput'
          type='text'
          name='title'
          value={organizationDetails.title}
          onChange={handleFormChange}
          placeholder='Title'
        />
        <input
          className='AddInput'
          type='text'
          name='phoneNumber1'
          value={organizationDetails.phoneNumber1}
          onChange={handleFormChange}
          placeholder='Phone Number 1'
        />
        <input
          className='AddInput'
          type='text'
          name='phoneNumber2'
          value={organizationDetails.phoneNumber2}
          onChange={handleFormChange}
          placeholder='Phone Number 2'
        />
        <input
          className='AddInput'
          type='text'
          name='phoneNumber3'
          value={organizationDetails.phoneNumber3}
          onChange={handleFormChange}
          placeholder='Phone Number 3'
        />
        <input
          className='AddInput'
          type='text'
          name='faxNumber'
          value={organizationDetails.faxNumber}
          onChange={handleFormChange}
          placeholder='Fax'
        />
        <input
          className='AddInput'
          type='text'
          name='website'
          value={organizationDetails.website}
          onChange={handleFormChange}
          placeholder='Website'
        />
        <input
          className='AddInput'
          type='text'
          name='emailId1'
          value={organizationDetails.emailId1}
          onChange={handleFormChange}
          placeholder='Email 1'
        />
        <input
          className='AddInput'
          type='text'
          name='emailId2'
          value={organizationDetails.emailId2}
          onChange={handleFormChange}
          placeholder='Email 2'
        />
        <input
          className='AddInput'
          type='text'
          name='dxNumber'
          value={organizationDetails.dxNumber}
          onChange={handleFormChange}
          placeholder='DX Number'
        />
        <input
          className='AddInput'
          type='text'
          name='dxCity'
          value={organizationDetails.dxCity}
          onChange={handleFormChange}
          placeholder='DX City'
        />
        <input
          className='AddInput'
          type='text'
          name='representativeId'
          value={organizationDetails.representativeId}
          onChange={handleFormChange}
          placeholder='RepresentativeId'
        />
        <input
          className='AddInput'
          type='text'
          name='abn'
          value={organizationDetails.abn}
          onChange={handleFormChange}
          placeholder='ABN'
        />
        <input
          className='AddInput'
          type='text'
          name='acn'
          value={organizationDetails.acn}
          onChange={handleFormChange}
          placeholder='ACN'
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
          value={organizationDetails.commAddress1}
          onChange={handleFormChange}
          placeholder='Address 1'
        />
        <input
          className='AddInput'
          type='text'
          name='commAddress2'
          value={organizationDetails.commAddress2}
          onChange={handleFormChange}
          placeholder='Address 2'
        />
        <input
          className='AddInput'
          type='text'
          name='commAddress3'
          value={organizationDetails.commAddress3}
          onChange={handleFormChange}
          placeholder='Address 3'
        />
        <input
          className='AddInput'
          type='text'
          name='commCity'
          value={organizationDetails.commCity}
          onChange={handleFormChange}
          placeholder='Suburb'
        />
        <input
          className='AddInput'
          type='text'
          name='commState'
          value={organizationDetails.commState}
          onChange={handleFormChange}
          placeholder='State'
        />
        <input
          className='AddInput'
          type='text'
          name='commPostCode'
          value={organizationDetails.commPostCode}
          onChange={handleFormChange}
          placeholder='Zip'
        />
        <input
          className='AddInput'
          type='text'
          name='commCountry'
          value={organizationDetails.commCountry}
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
          onClick={handleMailingAddress}
          type='checkbox'
        ></input>
        <label>Same as Communication Address</label>
      </div>
      <div className='inputtDiv'>
        <input
          className='AddInput'
          type='text'
          name='mailingAddress1'
          value={organizationDetails.mailingAddress1}
          onChange={handleFormChange}
          placeholder='Address 1'
        />
        <input
          className='AddInput'
          type='text'
          name='mailingAddress2'
          value={organizationDetails.mailingAddress2}
          onChange={handleFormChange}
          placeholder='Address 2'
        />
        <input
          className='AddInput'
          type='text'
          name='mailingAddress3'
          value={organizationDetails.mailingAddress3}
          onChange={handleFormChange}
          placeholder='Address 3'
        />
        <input
          className='AddInput'
          type='text'
          name='mailingCity'
          value={organizationDetails.mailingCity}
          onChange={handleFormChange}
          placeholder='Suburb'
        />
        <input
          className='AddInput'
          type='text'
          name='mailingState'
          value={organizationDetails.mailingState}
          onChange={handleFormChange}
          placeholder='State'
        />
        <input
          className='AddInput'
          type='text'
          name='mailingPostCode'
          value={organizationDetails.mailingPostCode}
          onChange={handleFormChange}
          placeholder='Zip'
        />
        <input
          className='AddInput'
          type='text'
          name='mailingCountry'
          value={organizationDetails.mailingCountry}
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

export default AddOrganization;
