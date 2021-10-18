import React, { useState, useEffect } from 'react';
import '../../stylesheets/property.css';
import axios from 'axios';
import NewRegisteredLots from './NewRegisteredLots.js';
import NewUnregisteredLots from './NewUnregisteredLots';

import url from '../../config.js';

import { useCookies } from 'react-cookie';
import AddRegisteredLots from './AddRegisteredLots';
import AddUnregisteredLots from './AddUnregisteredLots';

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
            <p>Building Name</p>
          </div>
          <div className='col-4'>
            <p>Unit</p>
          </div>
          <div className='col-4'>
            <p>Street No.</p>
          </div>
          <div className='col-4'>
            <input
              type='text'
              value={buildingName}
              onChange={(e) => {
                setBuildingName(e.target.value);
              }}
            />
          </div>
          <div className='col-4'>
            <input
              type='text'
              value={unit}
              onChange={(e) => {
                setUnit(e.target.value);
              }}
            />
          </div>
          <div className='col-4'>
            <input
              type='text'
              value={streetNo}
              onChange={(e) => {
                setStreetNo(e.target.value);
              }}
            />
          </div>
          <div className='col-4'>
            <p>Street</p>
          </div>
          <div className='col-4'>
            <p>Suburb</p>
          </div>
          <div className='col-4'>
            <p>Post Code</p>
          </div>
          <div className='col-4'>
            <input
              type='text'
              value={street}
              onChange={(e) => {
                setStreet(e.target.value);
              }}
            />
          </div>
          <div className='col-4'>
            <input
              type='text'
              value={suburb}
              onChange={(e) => {
                setSuburb(e.target.value);
              }}
            />
          </div>
          <div className='col-4'>
            <input
              type='text'
              value={postCode}
              onChange={(e) => {
                setPostCode(e.target.value);
              }}
            />
          </div>
          <div className='col-4 rowWise'>
            <label>Country</label>
            <select onChange={handleChangeCountry}>
              <option
                disabled
                selected={country === ''}
                value=''
                className='demo-select'
              >
                Select
              </option>
              {allCountries.map((c, index) => (
                <option
                  id='options'
                  key={c.id}
                  value={index}
                  selected={c.id === country}
                >
                  {c.countryName}
                </option>
              ))}
            </select>
            {/**<input
              type='text'
              value={country}
              onChange={(e) => {
                setCountry(e.target.value);
              }}
            /> */}
          </div>
          <div className='col-4 rowWise'>
            <label>State</label>
            <select onChange={(e) => setState(e.target.value)}>
              <option
                disabled
                selected={state === ''}
                value=''
                className='demo-select'
              >
                Select
              </option>
              {states.map((s) => (
                <option
                  id='options'
                  key={s.id}
                  value={s.id}
                  selected={s.id === state}
                >
                  {s.stateName}
                </option>
              ))}
            </select>
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
              style={{ width: '200px', display: 'flex', alignItems: 'center' }}
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
