import React, { useState, useEffect } from 'react';
import '../../stylesheets/property.css';
import axios from 'axios';
import NewRegisteredLots from './NewRegisteredLots.js';
import NewUnregisteredLots from './NewUnregisteredLots';

import url from '../../config.js';

import { useCookies } from 'react-cookie';
import AddRegisteredLots from './AddRegisteredLots';
import AddUnregisteredLots from './AddUnregisteredLots';
import { FormControl, InputLabel, Select, TextField } from '@material-ui/core';

const initialRegLot = {
  depositedPlanNumber: '',
  description: '',
  lotNumber: '',
  section: '',
  strataPlanNumber: '',
  titleReference: '',
};

const initialUnRegLot = {
  description: '',
  lot: '',
  partOfLot: '',
  plan: '',
  section: '',
};

const CustomTextInput = (props) => {
  return (
    <TextField
      {...props}
      style={{
        width: 200,
        height: 40,
        marginRight: 7,
        marginLeft: 9,
        // marginBottom: 10,
        marginTop: '1rem',
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

function AddNewProperty(props) {
  const { modalId, isEditTrue, setIsEditTrue, setBoolVal, allCountries } =
    props;
  const [buildingName, setBuildingName] = useState('');
  const [unit, setUnit] = useState('');
  const [streetNo, setStreetNo] = useState('');
  const [street, setStreet] = useState('');
  const [suburb, setSuburb] = useState('');
  const [state, setState] = useState('');
  const [postCode, setPostCode] = useState('');
  const [country, setCountry] = useState('');
  const [current, setCurrent] = useState('general');
  const [tempRegistered, setTempRegistered] = useState([]);
  const [tempUnregistered, setTempUnregistered] = useState([]);

  const [cookies, setCookie, removeCookie] = useCookies(['token']);
  const loggedInToken = cookies.token;
  const [isBool, setIsBool] = useState(false);
  // const [countries, setCountries] = useState(allCountries);
  const [states, setStates] = useState([]);

  // console.log(allCountries);

  useEffect(async () => {
    if (!isBool && allCountries.length !== 0) {
      setCountry(allCountries[0].id);
      setStates(allCountries[0].states);
      setState(allCountries[0].states[0].id);
      setIsBool(true);
    }
  }, [isBool, loggedInToken, allCountries]);

  const handleSetInitial = () => {
    setBuildingName('');
    setUnit('');
    setStreetNo('');
    setStreet('');
    setSuburb('');
    setState('');
    setPostCode('');
    setCountry('');
    setCurrent('general');
    setTempRegistered([]);
    setTempUnregistered([]);
    setIsBool(false);
  };

  const handleChangeCountry = (e) => {
    const index = e.target.value;
    const selectedCountry = allCountries[index];
    setCountry(selectedCountry.id);
    setStates(selectedCountry.states);
  };

  // const handleRegInputChange = (e, index) => {
  //   const { name, value } = e.target;
  //   const list = [...tempRegistered];
  //   list[index][name] = value;
  //   setTempRegistered(list);
  // };

  // // handle click event of the Remove button
  // const handleRemoveReg = (index) => {
  //   const list = [...tempRegistered];
  //   list.splice(index, 1);
  //   setTempRegistered(list);
  // };

  //   handle click event of the Add button
  //   const handleAddReg = () => {
  //   setTempRegistered([...tempRegistered, { ...initialRegLot }]);
  // };

  // const handleUnRegInputChange = (e, index) => {
  //   const { name, value } = e.target;
  //   const list = [...tempUnregistered];
  //   list[index][name] = value;
  //   setTempUnregistered(list);
  // };

  // // handle click event of the Remove button
  // const handleRemoveUnReg = (index) => {
  //   const list = [...tempUnregistered];
  //   list.splice(index, 1);
  //   setTempUnregistered(list);
  // };

  // handle click event of the Add button
  // const handleAddUnReg = () => {
  //   setTempUnregistered([...tempUnregistered, { ...initialUnRegLot }]);
  // };

  function renderRegisteredLots() {
    return tempRegistered?.map((registeredLot, ind) => {
      return (
        <NewRegisteredLots
          modal={9}
          registeredLot={registeredLot}
          setTempRegistered={setTempRegistered}
          tempRegistered={tempRegistered}
          index={ind}
        />
      );
    });
  }

  function renderUnregisteredLots() {
    return tempUnregistered?.map((unregisteredLot, ind) => {
      return (
        <NewUnregisteredLots
          modal={10}
          unregisteredLot={unregisteredLot}
          setTempUnregistered={setTempUnregistered}
          tempUnregistered={tempUnregistered}
          index={ind}
        />
      );
    });
  }

  function renderGeneral() {
    return (
      <div className='generalDiv'>
        <div
          // style={{ marginTop: "10%" }}
          className='row '
        >
          <div className='col-4'>
            <CustomTextInput
              name='buildingName'
              label='Building Name'
              value={buildingName}
              onChange={(e) => {
                setBuildingName(e.target.value);
              }}
            />
          </div>
          <div className='col-4'>
            <CustomTextInput
              name='unit'
              label='Unit'
              value={unit}
              onChange={(e) => {
                setUnit(e.target.value);
              }}
            />
          </div>
          <div className='col-4'>
            <CustomTextInput
              name='streetNo'
              label='Street No'
              value={streetNo}
              onChange={(e) => {
                setStreetNo(e.target.value);
              }}
            />
          </div>
          <div className='col-4'>
            <CustomTextInput
              name='street'
              label='Street'
              value={street}
              onChange={(e) => {
                setStreet(e.target.value);
              }}
            />
          </div>
          <div className='col-4'>
            <CustomTextInput
              name='suburb'
              label='Suburb'
              value={suburb}
              onChange={(e) => {
                setSuburb(e.target.value);
              }}
            />
          </div>
          <div className='col-4'>
            <CustomTextInput
              name='postCode'
              label='Post Code'
              value={postCode}
              onChange={(e) => {
                setPostCode(e.target.value);
              }}
            />
          </div>
          <div className='col-4 rowWise'>
            <FormControl
              style={{
                width: 200,
                height: 50,
                marginRight: 7,
                marginLeft: 9,
                marginBottom: 10,
                marginTop: '1.2rem',
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
                name='country'
                value={country}
                onChange={handleChangeCountry}
              >
                <option
                  aria-label='Country'
                  selected
                  disabled
                  style={{ display: 'none' }}
                  value=''
                />
                {allCountries.map((c, index) => (
                  <option value={index} key={c.id} selected={country === c.id}>
                    {c.countryName}
                  </option>
                ))}
              </Select>
            </FormControl>
            {/**<input
              type='text'
              value={country}
              onChange={(e) => {
                setCountry(e.target.value);
              }}
            /> */}
          </div>
          <div className='col-4 rowWise'>
            <FormControl
              style={{
                width: 200,
                height: 50,
                marginRight: 7,
                marginLeft: 9,
                marginBottom: 10,
                marginTop: '1.2rem',
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
                name='state'
                value={state}
                onChange={(e) => setState(e.target.value)}
              >
                <option
                  aria-label='State'
                  selected
                  disabled
                  style={{ display: 'none' }}
                  value=''
                />
                {states.map((s) => (
                  <option value={s.id} key={s.id} selected={state === s.id}>
                    {s.stateName}
                  </option>
                ))}
              </Select>
            </FormControl>
            {/**<input
              type='text'
              value={state}
              onChange={(e) => {
                setState(e.target.value);
              }}
            /> */}
          </div>
        </div>
      </div>
    );
  }

  function renderAttachedLots() {
    return (
      <div>
        <div className='2'>
          <div className='propertyPageHeadings'>
            <h6 className='propertyPageHeads'>Add/Edit Registered Lots</h6>
            <button
              className='propertyPageBtns'
              data-bs-toggle='modal'
              data-bs-target='#staticBackdrop4'
              onClick={() => {
                setIsEditTrue(false);
              }}
            >
              + Add
            </button>
            <AddRegisteredLots
              modalId={4}
              tempRegistered={tempRegistered}
              setTempRegistered={setTempRegistered}
            />
          </div>
          <div className='propertyPagesubHeads'>
            <div className='row'>
              <div className='col-1'>
                <h6>Edit</h6>
              </div>
              <div className='col-2'>
                <h6>Title Ref</h6>
                {/*<input type='text'></input> */}
              </div>
              <div className='col-1'>
                <h6>LotNo.</h6>
                {/*<input type='text'></input> */}
              </div>
              <div className='col-1'>
                <h6>Section</h6>
                {/*<input type='text'></input> */}
              </div>
              <div className='col-3'>
                <h6>Deposited Plan No.</h6>
                {/*<input type='text'></input> */}
              </div>
              <div className='col-2'>
                <h6>Strata Plan</h6>
                {/*<input type='text'></input> */}
              </div>
              <div className='col-2'>
                <h6>Description</h6>
                {/*<input type='text'></input> */}
              </div>
            </div>
            <div className='lotsScrollDiv'>{renderRegisteredLots()}</div>
          </div>
        </div>
        <div className='3'>
          <div className='propertyPageHeadings'>
            <h6 className='propertyPageHeads'>Add/Edit Unregistered Lots</h6>
            <button
              className='propertyPageBtns'
              data-bs-toggle='modal'
              data-bs-target='#staticBackdrop5'
            >
              + Add
            </button>
            <AddUnregisteredLots
              modalId={5}
              tempUnregistered={tempUnregistered}
              setTempUnregistered={setTempUnregistered}
            />
          </div>
          <div className='propertyPagesubHeads'>
            <div className='row'>
              <div className='col-1'>
                <h6>Edit</h6>
              </div>
              <div className='col-2'>
                <h6>LotNo.</h6>
                {/*<input type='text'></input> */}
              </div>
              <div className='col-2'>
                <h6>Part of Lot</h6>
                {/*<input type='text'></input> */}
              </div>
              <div className='col-1'>
                <h6>Section</h6>
                {/*<input type='text'></input> */}
              </div>
              <div className='col-3'>
                <h6>Plan Number</h6>
                {/*<input type='text'></input> */}
              </div>
              <div className='col-3'>
                <h6>Description</h6>
                {/*<input type='text'></input> */}
              </div>
            </div>
            <div className='lotsScrollDiv'>{renderUnregisteredLots()}</div>
          </div>
        </div>
      </div>
    );
  }

  function onSave() {
    const data = {
      buildingName: buildingName,
      unit: unit,
      streetNo: streetNo,
      street: street,
      suburb: suburb,
      state: state,
      postCode: postCode,
      country: country,
      registeredProperties: tempRegistered,
      unregisteredProperties: tempUnregistered,
    };
    // console.log(data);

    axios
      .post(
        `${url}/api/property`,
        {
          requestId: '1123445',
          data: data,
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
      )
      .then((response) => {
        // console.log('adding new property', response.data);
        handleSetInitial();
        // window.location.reload();
        setBoolVal(false);
      });
  }

  return (
    <div
      className='modal fade'
      id='staticBackdrop3'
      data-bs-backdrop='static'
      data-bs-keyboard='false'
      tabIndex='-1'
      aria-labelledby='staticBackdropLabel'
      aria-hidden='true'
    >
      <div className='modal-dialog modal-dialog-centered modal-lg'>
        <div
          // style={{ height: "32rem" }}
          className='modal-content popupNewProperty'
        >
          <div className='modal-header'>
            <h5 className='modal-title white' id='staticBackdropLabel'>
              Add New Property
            </h5>
            <p
              style={{ cursor: 'pointer' }}
              data-bs-dismiss='modal'
              onClick={handleSetInitial}
            >
              &#10006;
            </p>
          </div>
          <div className='newPropertyBtnTray'>
            <div>
              <button
                className={
                  current === 'general'
                    ? 'newPropertyMainBtns newPropertyMainBtnsClicked'
                    : 'newPropertyMainBtns'
                }
                onClick={() => {
                  setCurrent('general');
                }}
              >
                General
              </button>
              <button
                disabled={
                  !buildingName ||
                  !unit ||
                  !streetNo ||
                  !street ||
                  !suburb ||
                  !postCode
                }
                className={
                  current === 'attached'
                    ? 'newPropertyMainBtns newPropertyMainBtnsClicked'
                    : 'newPropertyMainBtns'
                }
                onClick={() => {
                  setCurrent('attached');
                }}
              >
                Attached Lots
              </button>
            </div>
            <div
              style={{
                width: '180px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-evenly',
              }}
            >
              {current === 'general' ? (
                <button
                  disabled={
                    !buildingName ||
                    !unit ||
                    !streetNo ||
                    !street ||
                    !suburb ||
                    !postCode
                  }
                  onClick={() => {
                    setCurrent('attached');
                    // console.log(buildingName);
                    // console.log(unit);
                    // console.log(streetNo);
                    // console.log(street);
                    // console.log(suburb);
                    // console.log(postCode);
                    // console.log(country);
                    // console.log(state);
                  }}
                  className='propertyPageBtns'
                >
                  Next
                </button>
              ) : (
                <button
                  data-bs-dismiss='modal'
                  className='propertyPageBtns'
                  onClick={() => {
                    onSave();
                  }}
                >
                  Save
                </button>
              )}
              <button
                className='propertyPageBtns'
                data-bs-dismiss='modal'
                onClick={handleSetInitial}
              >
                Cancel
              </button>
            </div>
          </div>
          <div className='modal-body'>
            {current === 'general' ? renderGeneral() : renderAttachedLots()}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddNewProperty;
