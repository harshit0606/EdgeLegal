import React, { useState, useEffect } from 'react';
import url from '../../config.js';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import '../../stylesheets/contacts.css';
import { FormControl, InputLabel, Select, TextField } from '@material-ui/core';

const initialData = {
  role: '',
  subType: '',
  legalName: '',
  name: '',
  title: '',
  phoneNumber1: '',
  phoneNumber2: '',
  phoneNumber3: '',
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

const CustomTextInput = (props) => {
  return (
    <TextField
      {...props}
      style={{
        width: 256,
        height: 50,
        marginRight: 7,
        marginLeft: 9,
        marginBottom: 10,
        outline: 'none',
      }}
      InputLabelProps={{
        style: {
          fontSize: 14,
          fontFamily: 'inherit',
          color: 'rgb(94, 94, 94)',
          marginLeft: 10,
        },
      }}
      inputProps={{
        style: {
          fontSize: 14,
          fontFamily: 'inherit',
          color: 'rgb(94, 94, 94)',
          marginLeft: 10,
        },
      }}
      type='text'
    />
  );
};

function AddOrganization(props) {
  const [cookies, setCookie, removeCookie] = useCookies(['token']);
  const loggedInToken = cookies.token;
  const [organizationDetails, setOrganizationDetails] = useState(initialData);
  const [sameAddress, setSameAddress] = useState(false);
  const [countries, setCountries] = useState([]);
  const [commStates, setCommStates] = useState([]);
  const [mailStates, setMailStates] = useState([]);
  const [otherDetails, setOtherDetails] = useState({
    companyId: '',
    siteId: '',
  });
  const [boolVal, setBoolVal] = useState(false);

  useEffect(async () => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get(
          `${url}/api/dropdown/countries?requestId=1124455`,
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
        // console.log(response.data);
        setCountries(response.data?.data?.countryList);
      } catch (err) {
        console.log(err);
      }
    };
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
        // console.log(data);
        setOtherDetails({
          ...otherDetails,
          companyId: data?.organizationId,
          siteId: data?.siteId ? data?.siteId : 1, // this will change later
        });
        fetchCountries();
      } catch (err) {
        console.log(err);
      }
      setBoolVal(true);
    }
  }, [boolVal, loggedInToken, otherDetails]);

  const handleFormChange = (e) => {
    const { name } = e.target;
    setOrganizationDetails({ ...organizationDetails, [name]: e.target.value });
  };

  const handleChangeCountry = (e) => {
    const index = e.target.value;
    const selectedCountry = countries[index];
    setOrganizationDetails({
      ...organizationDetails,
      commCountry: selectedCountry.id,
    });
    // console.log(selectedCountry);
    setCommStates(selectedCountry.states);
  };

  const handleChangeMailCountry = (e) => {
    const index = e.target.value;
    const selectedCountry = countries[index];
    setOrganizationDetails({
      ...organizationDetails,
      mailingCountry: selectedCountry.id,
    });
    // console.log(selectedCountry);
    setMailStates(selectedCountry.states);
  };

  const handleMailingAddress = () => {
    if (sameAddress === false) {
      setSameAddress(true);
      setMailStates(commStates);
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
          name='role'
          value='Bussiness/Partnership'
          onChange={handleFormChange}
        ></input>{' '}
        Bussiness/Partnership&nbsp;&nbsp;&nbsp;
        <input
          type='radio'
          name='role'
          value='Company'
          onChange={handleFormChange}
        />{' '}
        Company&nbsp;&nbsp;&nbsp;
        <input
          type='radio'
          name='role'
          value='Government Department'
          onChange={handleFormChange}
        />{' '}
        Government Department&nbsp;&nbsp;&nbsp;
        <input
          type='radio'
          name='role'
          value='Trust'
          onChange={handleFormChange}
        />{' '}
        Trust&nbsp;&nbsp;&nbsp;
      </div>
      <div className='inputtDiv'>
        <CustomTextInput
          name='name'
          label='Name'
          value={organizationDetails.name}
          onChange={handleFormChange}
        />
        <CustomTextInput
          name='subType'
          label='Sub Type'
          value={organizationDetails.subType}
          onChange={handleFormChange}
        />
        <CustomTextInput
          name='legalName'
          label='Legal Name'
          value={organizationDetails.legalName}
          onChange={handleFormChange}
        />
        <CustomTextInput
          name='title'
          label='Title'
          value={organizationDetails.title}
          onChange={handleFormChange}
        />
        <CustomTextInput
          name='phoneNumber1'
          label='Phone Number 1'
          value={organizationDetails.phoneNumber1}
          onChange={handleFormChange}
        />
        <CustomTextInput
          name='phoneNumber2'
          label='Phone Number 2'
          value={organizationDetails.phoneNumber2}
          onChange={handleFormChange}
        />
        <CustomTextInput
          name='phoneNumber3'
          label='Phone Number 3'
          value={organizationDetails.phoneNumber3}
          onChange={handleFormChange}
        />
        <CustomTextInput
          name='faxNumber'
          label='Fax'
          value={organizationDetails.faxNumber}
          onChange={handleFormChange}
        />
        <CustomTextInput
          name='website'
          label='Website'
          value={organizationDetails.website}
          onChange={handleFormChange}
        />
        <CustomTextInput
          name='emailId1'
          label='Email 1'
          value={organizationDetails.emailId1}
          onChange={handleFormChange}
        />
        <CustomTextInput
          name='emailId2'
          label='Email 2'
          value={organizationDetails.emailId2}
          onChange={handleFormChange}
        />
        <CustomTextInput
          name='dxNumber'
          label='DX Number'
          value={organizationDetails.dxNumber}
          onChange={handleFormChange}
        />
        <CustomTextInput
          name='dxCity'
          label='DX City'
          value={organizationDetails.dxCity}
          onChange={handleFormChange}
        />
        <CustomTextInput
          name='representativeId'
          label='RepresentativeId'
          value={organizationDetails.representativeId}
          onChange={handleFormChange}
        />
        <CustomTextInput
          name='abn'
          label='ABN'
          value={organizationDetails.abn}
          onChange={handleFormChange}
        />
        <CustomTextInput
          name='acn'
          label='ACN'
          value={organizationDetails.acn}
          onChange={handleFormChange}
        />
      </div>
      <div className='labelll'>
        <h3>Street Address</h3>
      </div>
      <div className='inputtDiv'>
        <CustomTextInput
          name='commAddress1'
          label='Address 1'
          value={organizationDetails.commAddress1}
          onChange={handleFormChange}
        />
        <CustomTextInput
          name='commAddress2'
          label='Address 2'
          value={organizationDetails.commAddress2}
          onChange={handleFormChange}
        />
        <CustomTextInput
          name='commAddress3'
          label='Address 3'
          value={organizationDetails.commAddress3}
          onChange={handleFormChange}
        />
        <CustomTextInput
          name='commCity'
          label='Suburb'
          value={organizationDetails.commCity}
          onChange={handleFormChange}
        />
        <FormControl
          style={{
            width: 256,
            height: 50,
            marginRight: 7,
            marginLeft: 9,
            marginBottom: 10,
            outline: 'none',
          }}
        >
          <InputLabel
            id='demo-simple-select-helper-label'
            style={{
              fontSize: 14,
              fontFamily: 'inherit',
              color: 'rgb(94, 94, 94)',
              marginLeft: 9,
            }}
          >
            Country
          </InputLabel>
          <Select
            native
            labelId='demo-simple-select-helper-label'
            id='demo-simple-select-helper'
            style={{
              fontSize: 14,
              fontFamily: 'inherit',
              color: 'rgb(94, 94, 94)',
            }}
            inputProps={{
              style: {
                fontSize: 14,
                fontFamily: 'inherit',
                color: 'rgb(94, 94, 94)',
                padding: 5,
              },
            }}
            name='commCountry'
            value={organizationDetails.commCountry}
            onChange={handleChangeCountry}
          >
            <option
              aria-label='Country'
              selected
              disabled
              style={{ display: 'none' }}
              value=''
            />
            {countries.map((country, index) => (
              <option value={index} key={country.id}>
                {country.countryName}
              </option>
            ))}
          </Select>
        </FormControl>

        <FormControl
          style={{
            width: 256,
            height: 50,
            marginRight: 7,
            marginLeft: 9,
            marginBottom: 10,
            outline: 'none',
          }}
        >
          <InputLabel
            id='demo-simple-select-helper-label'
            style={{
              fontSize: 14,
              fontFamily: 'inherit',
              color: 'rgb(94, 94, 94)',
              marginLeft: 9,
            }}
          >
            State
          </InputLabel>
          <Select
            native
            labelId='demo-simple-select-helper-label'
            id='demo-simple-select-helper'
            style={{
              fontSize: 14,
              fontFamily: 'inherit',
              color: 'rgb(94, 94, 94)',
            }}
            inputProps={{
              style: {
                fontSize: 14,
                fontFamily: 'inherit',
                color: 'rgb(94, 94, 94)',
                padding: 5,
              },
            }}
            name='commState'
            value={organizationDetails.commState}
            onChange={handleFormChange}
          >
            <option
              aria-label='State'
              selected
              disabled
              style={{ display: 'none' }}
              value=''
            />
            {commStates.map((state) => (
              <option value={state.id} key={state.id}>
                {state.stateName}
              </option>
            ))}
          </Select>
        </FormControl>
        <CustomTextInput
          name='commPostCode'
          label='Zip'
          value={organizationDetails.commPostCode}
          onChange={handleFormChange}
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
        <CustomTextInput
          name='mailingAddress1'
          label='Address 1'
          value={organizationDetails.mailingAddress1}
          onChange={handleFormChange}
        />
        <CustomTextInput
          name='mailingAddress2'
          label='Address 2'
          value={organizationDetails.mailingAddress2}
          onChange={handleFormChange}
        />
        <CustomTextInput
          name='mailingAddress3'
          label='Address 3'
          value={organizationDetails.mailingAddress3}
          onChange={handleFormChange}
        />
        <CustomTextInput
          name='mailingCity'
          label='Suburb'
          value={organizationDetails.mailingCity}
          onChange={handleFormChange}
        />
        <FormControl
          style={{
            width: 256,
            height: 50,
            marginRight: 7,
            marginLeft: 9,
            marginBottom: 10,
            outline: 'none',
          }}
        >
          <InputLabel
            id='demo-simple-select-helper-label'
            style={{
              fontSize: 14,
              fontFamily: 'inherit',
              color: 'rgb(94, 94, 94)',
              marginLeft: 9,
            }}
          >
            Country
          </InputLabel>
          <Select
            native
            labelId='demo-simple-select-helper-label'
            id='demo-simple-select-helper'
            style={{
              fontSize: 14,
              fontFamily: 'inherit',
              color: 'rgb(94, 94, 94)',
            }}
            inputProps={{
              style: {
                fontSize: 14,
                fontFamily: 'inherit',
                color: 'rgb(94, 94, 94)',
                padding: 5,
              },
            }}
            name='mailingCountry'
            value={organizationDetails.mailingCountry}
            onChange={handleChangeMailCountry}
          >
            <option
              aria-label='Country'
              selected={organizationDetails.mailingCountry === ''}
              disabled
              style={{ display: 'none' }}
              value=''
            />
            {countries.map((country, index) => (
              <option
                key={country.id}
                value={index}
                selected={organizationDetails.mailingCountry === country.id}
              >
                {country.countryName}
              </option>
            ))}
          </Select>
        </FormControl>

        <FormControl
          style={{
            width: 256,
            height: 50,
            marginRight: 7,
            marginLeft: 9,
            marginBottom: 10,
            outline: 'none',
          }}
        >
          <InputLabel
            id='demo-simple-select-helper-label'
            style={{
              fontSize: 14,
              fontFamily: 'inherit',
              color: 'rgb(94, 94, 94)',
              marginLeft: 9,
            }}
          >
            State
          </InputLabel>
          <Select
            native
            labelId='demo-simple-select-helper-label'
            id='demo-simple-select-helper'
            style={{
              fontSize: 14,
              fontFamily: 'inherit',
              color: 'rgb(94, 94, 94)',
            }}
            inputProps={{
              style: {
                fontSize: 14,
                fontFamily: 'inherit',
                color: 'rgb(94, 94, 94)',
                padding: 5,
              },
            }}
            name='mailingState'
            value={organizationDetails.mailingState}
            onChange={handleFormChange}
          >
            <option
              aria-label='State'
              selected={organizationDetails.mailingState === ''}
              disabled
              style={{ display: 'none' }}
              value=''
            />
            {mailStates.map((state) => (
              <option
                key={state.id}
                selected={state.id === organizationDetails.mailingState}
                value={state.id}
              >
                {state.stateName}
              </option>
            ))}
          </Select>
        </FormControl>
        <CustomTextInput
          name='mailingPostCode'
          label='Zip'
          value={organizationDetails.mailingPostCode}
          onChange={handleFormChange}
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
