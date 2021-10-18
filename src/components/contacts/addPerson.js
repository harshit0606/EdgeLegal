import React, { useState, useEffect } from 'react';
import url from '../../config.js';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import '../../stylesheets/contacts.css';
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@material-ui/core';

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

const CustomDropDown = (props) => {
  const { lableName, labelId, first, second, name, value, onChange } = props;
  return (
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
        htmlFor={labelId}
        style={{
          fontSize: 14,
          fontFamily: 'inherit',
          color: 'rgb(94, 94, 94)',
          marginLeft: 9,
        }}
      >
        {lableName}
      </InputLabel>
      <Select
        native
        name={name}
        labelId={labelId}
        value={value}
        onChange={onChange}
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
      >
        <option
          aria-label='None'
          selected
          disabled
          style={{ display: 'none' }}
          value=''
        />
        <option value={first}>{first}</option>
        <option value={second}>{second}</option>
      </Select>
    </FormControl>
  );
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
  const [countries, setCountries] = useState([]);
  const [commStates, setCommStates] = useState([]);
  const [mailStates, setMailStates] = useState([]);
  const [boolVal, setBoolVal] = useState(false);
  const [date, setDate] = useState(false);

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
        setCommStates(response.data?.data?.countryList[0].states);
        setMailStates(response.data?.data?.countryList[0].states);
        setPersonDetails({
          ...personDetails,
          commCountry: response.data?.data?.countryList[0].id,
          commState: response.data?.data?.countryList[0].states[0].id,
          mailingCountry: response.data?.data?.countryList[0].id,
          mailingState: response.data?.data?.countryList[0].states[0].id,
        });
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
    setPersonDetails({ ...personDetails, [name]: e.target.value });
  };

  const handleChangeCountry = (e) => {
    // console.log(countries);
    const index = e.target.value;
    const selectedCountry = countries[index];
    // console.log(selectedCountry);
    setPersonDetails({ ...personDetails, commCountry: selectedCountry.id });
    setCommStates(selectedCountry.states);
  };

  const handleChangeMailCountry = (e) => {
    const index = e.target.value;
    const selectedCountry = countries[index];
    setPersonDetails({ ...personDetails, mailingCountry: selectedCountry.id });
    setMailStates(selectedCountry.states);
  };

  const handleMailingAddress = () => {
    if (sameAddress === false) {
      setSameAddress(true);
      setMailStates(commStates);
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
        <CustomDropDown
          lableName='Type'
          labelId='type-sample'
          name='type'
          value={personDetails.type}
          onChange={(e) => handleFormChange(e)}
          first='OWNER'
          second='TENANT'
        />
        <CustomDropDown
          lableName='Gender'
          labelId='gender-sample'
          name='gender'
          value={personDetails.gender}
          onChange={handleFormChange}
          first='Male'
          second='Female'
        />
        <CustomDropDown
          lableName='Salutation'
          labelId='salutation-sample'
          name='salutation'
          value={personDetails.salutation}
          onChange={handleFormChange}
          first='Mr'
          second='Ms'
        />
        <CustomTextInput
          name='firstName'
          label='First Name'
          value={personDetails.firstName}
          onChange={handleFormChange}
        />
        <CustomTextInput
          name='middleName'
          label='Middle Name'
          value={personDetails.middleName}
          onChange={handleFormChange}
        />
        <CustomTextInput
          name='lastName'
          label='Last Name'
          value={personDetails.lastName}
          onChange={handleFormChange}
        />
        <CustomTextInput
          name='phoneNumber1'
          label='Home Phone'
          value={personDetails.phoneNumber1}
          onChange={handleFormChange}
        />
        <CustomTextInput
          name='phoneNumber2'
          label='Work Phone'
          value={personDetails.phoneNumber2}
          onChange={handleFormChange}
        />
        <CustomTextInput
          name='faxNumber'
          label='Fax'
          value={personDetails.faxNumber}
          onChange={handleFormChange}
        />
        <CustomTextInput
          name='mobilePhoneNumber'
          label='Mobile Number'
          state={personDetails.mobilePhoneNumber}
          onChange={handleFormChange}
        />
        <CustomTextInput
          name='website'
          label='Website'
          value={personDetails.website}
          onChange={handleFormChange}
        />
        <CustomTextInput
          name='emailId1'
          label='Email 1'
          value={personDetails.emailId1}
          onChange={handleFormChange}
        />
        {/** there is no organisationId in api body */}
        <CustomTextInput label='OrganisationId' />
        <CustomTextInput
          name='emailId2'
          label='Email 2'
          value={personDetails.emailId2}
          onChange={handleFormChange}
        />
        <CustomTextInput
          name='placeOfBirth'
          label='Place of Birth'
          value={personDetails.placeOfBirth}
          onChange={handleFormChange}
        />
        <TextField
          type={date ? 'date' : 'text'}
          name='dateOfBirth'
          label='Date of Birth'
          onFocus={() => setDate(true)}
          onBlur={() => setDate(false)}
          value={personDetails.dateOfBirth}
          onChange={handleFormChange}
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
              marginLeft: 9,
            },
            shrink: date || personDetails.dateOfBirth !== '' ? true : false,
          }}
          inputProps={{
            style: {
              fontSize: 14,
              fontFamily: 'inherit',
              color: 'rgb(94, 94, 94)',
            },
          }}
        />
        <CustomTextInput
          name='countryOfBirth'
          label='Country of Birth'
          value={personDetails.countryOfBirth}
          onChange={handleFormChange}
        />
        <CustomTextInput
          name='nationality'
          label='Nationality'
          value={personDetails.nationality}
          onChange={handleFormChange}
        />
        <CustomTextInput
          name='passportNumber'
          label='Passport No.'
          value={personDetails.passportNumber}
          onChange={handleFormChange}
        />
        <CustomTextInput
          name='occupation'
          label='Occupation'
          value={personDetails.occupation}
          onChange={handleFormChange}
        />
        <CustomTextInput
          name='practiceCertNumber'
          label='Practicing Certificate No.'
          value={personDetails.practiceCertNumber}
          onChange={handleFormChange}
        />
        <CustomTextInput
          name='personComments'
          label='Comments'
          value={personDetails.personComments}
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
          value={personDetails.commAddress1}
          onChange={handleFormChange}
        />
        <CustomTextInput
          name='commAddress2'
          label='Address 2'
          value={personDetails.commAddress2}
          onChange={handleFormChange}
        />
        <CustomTextInput
          name='commAddress3'
          label='Address 3'
          value={personDetails.commAddress3}
          onChange={handleFormChange}
        />
        <CustomTextInput
          name='commCity'
          label='Suburb'
          value={personDetails.commCity}
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
            value={personDetails.commCountry}
            onChange={handleChangeCountry}
          >
            <option
              aria-label='Country'
              selected={personDetails.commCountry === ''}
              disabled
              style={{ display: 'none' }}
              value=''
            />
            {countries.map((country, index) => (
              <option
                key={country.id}
                value={index}
                selected={personDetails.commCountry === country.id}
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
            name='commState'
            value={personDetails.commState}
            onChange={handleFormChange}
          >
            <option
              aria-label='State'
              selected={personDetails.commState === ''}
              disabled
              style={{ display: 'none' }}
              value=''
            />
            {commStates.map((state) => (
              <option
                key={state.id}
                value={state.id}
                selected={personDetails.commState === state.id}
              >
                {state.stateName}
              </option>
            ))}
          </Select>
        </FormControl>

        <CustomTextInput
          name='commPostCode'
          label='Zip'
          value={personDetails.commPostCode}
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
          type='checkbox'
          onClick={handleMailingAddress}
        />
        <label>Same as Communication Address</label>
      </div>
      <div className='inputtDiv'>
        <CustomTextInput
          name='mailingAddress1'
          label='Address 1'
          value={personDetails.mailingAddress1}
          onChange={handleFormChange}
        />
        <CustomTextInput
          name='mailingAddress2'
          label='Address 2'
          value={personDetails.mailingAddress2}
          onChange={handleFormChange}
        />
        <CustomTextInput
          name='mailingAddress3'
          label='Address 3'
          value={personDetails.mailingAddress3}
          onChange={handleFormChange}
        />
        <CustomTextInput
          name='mailingCity'
          label='Suburb'
          value={personDetails.mailingCity}
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
            value={personDetails.mailingCountry}
            onChange={handleChangeMailCountry}
          >
            <option
              aria-label='Country'
              selected={personDetails.mailingCountry === ''}
              disabled
              style={{ display: 'none' }}
              value=''
            />
            {countries.map((country, index) => (
              <option
                key={country.id}
                value={index}
                selected={personDetails.mailingCountry === country.id}
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
            value={personDetails.mailingState}
            onChange={handleFormChange}
          >
            <option
              aria-label='State'
              selected={personDetails.mailingState === ''}
              disabled
              style={{ display: 'none' }}
              value=''
            />
            {mailStates.length > 0 &&
              mailStates.map((state) => (
                <option
                  selected={personDetails.mailingState === state.id}
                  key={state.id}
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
          value={personDetails.mailingPostCode}
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

export default AddPerson;
