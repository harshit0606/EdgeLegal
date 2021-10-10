import react, { useEffect, useState } from 'react';
import axios from 'axios';
import url from '../../config.js';
import { useCookies } from 'react-cookie';

import upArrow from '../../images/upArrow.svg';
import downArrow from '../../images/downArrow.svg';
import downArrowColoured from '../../images/downArrowColoured.svg';
import upArrowColoured from '../../images/upArrowColoured.svg';

import styles from '../../stylesheets/property.css';

import PopupFormR from './popupformR.js';
import PopupFormUnR from './popupformUnR.js';
import RegisteredLot from './registeredLot.js';
import UnregisteredLot from './unregisteredLot.js';
import RelatedMattersLot from './relatedMatters.js';
import AddNewProperty from './addNewProperty.js';

const filterRegisterFields = {
  depositedPlanNumber: '',
  description: '',
  lotNumber: '',
  strataPlanNumber: '',
  titleReference: '',
  section: '',
};

const filterUnregisterFields = {
  partOfLot: '',
  description: '',
  lot: '',
  plan: '',
  section: '',
};

function RenderProperty() {
  const [cookies, setCookie, removeCookie] = useCookies(['token']);
  const loggedInToken = cookies.token;

  const [allProperties, setAllProperties] = useState([]);
  const [titleRef, setTitleRef] = useState(null);
  const [address, setAddress] = useState(null);
  const [filteredData, setFilteredData] = useState([]);
  const [filterRegisterInput, setFilterRegisterInput] =
    useState(filterRegisterFields);
  const [filteredRegisterLot, setFilteredRegisterLot] = useState([]);
  const [filterUnregisterInput, setFilterUnregisterInput] = useState(
    filterUnregisterFields
  );
  const [filteredUnregisterLot, setFilteredUnregisterLot] = useState([]);
  const [specificProperty, setSpecificProperty] = useState([]);
  const [registeredLots, setRegisteredLots] = useState([]);
  const [unregisteredLots, setUnregisteredLots] = useState([]);

  // to delete property
  const [selected, setSelected] = useState([]);

  const [isEditTrue, setIsEditTrue] = useState(false);
  const [isAddTrue, setIsAddTrue] = useState(false);
  const [boolVal, setBoolVal] = useState(false);
  const [sortOrder, setSortOrder] = useState('');
  const [sortField, setSortField] = useState('');

  console.log('length', filteredData.length);

  useEffect(() => {
    const propertyData = (data) => {
      // console.log('data', data);
      var dataArray = [];
      data.forEach((d) => {
        const propertyAddress = `${d.unit}/${d.streetNo}/${d.street}/${d.suburb}/${d.state}/${d.postCode}/${d.country}`;
        let titleRefs = '';
        if (d.registeredProperties.length > 0) {
          d.registeredProperties.forEach((r) => {
            if (titleRefs === '') {
              titleRefs += `${r.titleReference}`;
            } else {
              titleRefs += `/${r.titleReference}`;
            }
          });
        }
        dataArray.push({
          titleRef: d.registeredProperties.length === 0 ? '' : titleRefs,
          address: propertyAddress,
          id: d.id,
          details: d,
        });
      });
      setAllProperties(dataArray);
      setFilteredData(dataArray);
      setBoolVal(true);
    };
    if (!boolVal) {
      axios
        .get(
          `${url}/api/property?requestId=1234567`,
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
          // setAllProperties(response.data.data.properties);
          propertyData(response.data.data.properties);
          // setFilteredData(response.data.data.properties);
          console.log('in axios then', response.data.data);
        });
    }
  }, [boolVal, filteredData]);

  const filterData = (prop, val) => {
    const newData = allProperties.filter((data) => {
      return data[prop]?.toLowerCase().includes(val.toLowerCase());
    });
    setFilteredData(newData);
  };

  const handleFilter = (e) => {
    const { name } = e.target;
    if (e.target.value === '') {
      setFilteredData(allProperties);
    } else {
      filterData(name, e.target.value);
    }
  };

  const filterRegisterData = (obj) => {
    const newData = registeredLots?.filter(
      (data) =>
        (data['description']
          ? data['description']
              ?.toLowerCase()
              .includes(obj['description']?.toLowerCase())
          : true) &&
        data['depositedPlanNumber'].includes(obj['depositedPlanNumber']) &&
        data['lotNumber']
          .toLowerCase()
          .includes(obj['lotNumber'].toLowerCase()) &&
        data['strataPlanNumber']
          .toLowerCase()
          .includes(obj['strataPlanNumber'].toLowerCase()) &&
        data['titleReference']
          .toLowerCase()
          .includes(obj['titleReference'].toLowerCase()) &&
        data['section'].toLowerCase().includes(obj['section'].toLowerCase())
    );
    // console.log(newData);
    setFilteredRegisterLot(newData);
  };

  const handleFilterRegister = (e) => {
    const { name } = e.target;
    setFilterRegisterInput({ ...filterRegisterInput, [name]: e.target.value });
    filterRegisterData({ ...filterRegisterInput, [name]: e.target.value });
  };

  const filterUnregisterData = (obj) => {
    // console.log(obj);
    const newData = unregisteredLots?.filter(
      (data) =>
        (data['description']
          ? data['description']
              ?.toLowerCase()
              .includes(obj['description']?.toLowerCase())
          : true) &&
        (data['lot']
          ? data['lot']?.toLowerCase().includes(obj['lot']?.toLowerCase())
          : true) &&
        (data['plan']
          ? data['plan']?.toLowerCase().includes(obj['plan']?.toLowerCase())
          : true) &&
        data['partOfLot']
          .toLowerCase()
          .includes(obj['partOfLot'].toLowerCase()) &&
        data['section'].toLowerCase().includes(obj['section'].toLowerCase())
    );
    // console.log(newData);
    setFilteredUnregisterLot(newData);
  };

  const handleFilterUnregister = (e) => {
    const { name } = e.target;
    setFilterUnregisterInput({
      ...filterUnregisterInput,
      [name]: e.target.value,
    });
    filterUnregisterData({ ...filterUnregisterInput, [name]: e.target.value });
  };

  const handleSort = (field, order) => {
    if (sortOrder === order && sortField === field) {
      setSortOrder('');
      setSortField('');
      setFilteredData(allProperties);
    } else {
      setSortOrder(order);
      setSortField(field);
      let sortedData = filteredData.sort((a, b) => {
        if (order === 'asc') {
          return a[field] < b[field] ? -1 : 1;
        } else {
          return a[field] < b[field] ? 1 : -1;
        }
      });
      setFilteredData(sortedData);
    }
  };

  const handleRegisterSort = (field, order) => {
    if (sortOrder === order && sortField === field) {
      setSortOrder('');
      setSortField('');
      setFilteredRegisterLot(registeredLots);
    } else {
      setSortOrder(order);
      setSortField(field);
      let sortedData = filteredRegisterLot.sort((a, b) => {
        if (order === 'asc') {
          return a[field] < b[field] ? -1 : 1;
        } else {
          return a[field] < b[field] ? 1 : -1;
        }
      });
      setFilteredRegisterLot(sortedData);
    }
  };

  const handleUnregisterSort = (field, order) => {
    if (sortOrder === order && sortField === field) {
      setSortOrder('');
      setSortField('');
      setFilteredUnregisterLot(unregisteredLots);
    } else {
      setSortOrder(order);
      setSortField(field);
      let sortedData = filteredUnregisterLot.sort((a, b) => {
        if (order === 'asc') {
          return a[field] < b[field] ? -1 : 1;
        } else {
          return a[field] < b[field] ? 1 : -1;
        }
      });
      setFilteredUnregisterLot(sortedData);
    }
  };

  function deleteProperty() {
    const id = specificProperty.id;
    console.log('delete', id);
    axios
      .delete(
        `${url}/api/property/${id}?requestId=1234567`,
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
        setBoolVal(false);
        // console.log(response.data);
        window.location.reload();
      });
  }

  const deletePropertyOnMain = async () => {
    let str = selected.join(',');
    // console.log('str', str);
    if (selected.length === 1) {
      try {
        const res = await axios.delete(
          `${url}/api/property/${str}?requestId=1234567`,
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
        // console.log('single delete', res);
        window.reload();
      } catch (err) {
        console.log(err);
      }
    } else {
      try {
        const res = await axios.delete(
          `${url}/api/property/m/${str}?requestId=1234567`,
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
        // console.log('bulk delete', res);
        window.reload();
      } catch (err) {
        console.log(err);
      }
    }
  };

  const handleSelectToDelete = (id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = filteredData?.map((row) => row.details.id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  // to check whether the property is selected or not
  const isSelected = (id) => selected.indexOf(id) !== -1;

  function renderAllProperties() {
    return filteredData?.map((property, index) => {
      return (
        <div
          className={`row ${
            index % 2 === 0 ? 'contacttdatadiv' : 'lightcontacttdatadiv'
          }`}
          key={property.details.id}
        >
          <input
            className='col-1'
            style={{ padding: '5px' }}
            type='checkbox'
            checked={isSelected(property.details.id)}
            onChange={() => handleSelectToDelete(property.details.id)}
          />
          <h6
            style={{ padding: '0 15px' }}
            onClick={() => {
              fetchPropertyData(property.details);
            }}
            className='col-4'
          >
            {property.titleRef}
          </h6>
          <h6
            style={{ padding: '0 15px' }}
            onClick={() => {
              fetchPropertyData(property.details);
            }}
            className='col-6'
          >
            {property.address}
          </h6>
        </div>
      );
    });
  }

  function fetchPropertyData(details) {
    console.log('details', details);
    setSpecificProperty(details);
    setRegisteredLots(details.registeredProperties);
    setFilteredRegisterLot(details.registeredProperties);
    setUnregisteredLots(details.unregisteredProperties);
    setFilteredUnregisterLot(details.unregisteredProperties);

    document.getElementById('searchPropertyDiv').classList.add('hideSection');
    document.getElementById('mainPropertyDiv').classList.remove('hideSection');
  }

  function backToSearch() {
    setSpecificProperty(null);
    document
      .getElementById('searchPropertyDiv')
      .classList.remove('hideSection');
    document.getElementById('mainPropertyDiv').classList.add('hideSection');
  }

  function renderRegisteredLots() {
    return filteredRegisterLot?.map((registeredLot, idx) => {
      return (
        <RegisteredLot
          modal={1}
          registeredLot={registeredLot}
          handleFilter={handleFilterRegister}
          specifiedDetails={specificProperty}
          idx={idx}
        />
      );
    });
  }

  function renderUnregisteredLots() {
    return filteredUnregisterLot?.map((unregisteredLot) => {
      return (
        <UnregisteredLot
          modal={2}
          unregisteredLot={unregisteredLot}
          isEditTrue={isEditTrue}
          setIsEditTrue={setIsEditTrue}
        />
      );
    });
  }

  function updateProperty() {
    const dataToBeSent = {
      ...specificProperty,
      registeredProperties: registeredLots,
      unregisteredProperties: unregisteredLots,
    };
    axios
      .post(
        `${url}/api/property`,
        {
          requestId: '1123445',
          data: dataToBeSent,
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
        // console.log('property update response', response.data);
        // setSpecificProperty(dataToBeSent);
        window.location.reload();
      });
    // console.log('update property', dataToBeSent);
    //console.log("update property", specificProperty);
  }

  return (
    <div>
      <div className='row propertyDiv'>
        <div id='searchPropertyDiv'>
          <div>
            <div className='propertyPageHeadings'>
              <h6 className='propertyPageHeads'>Property</h6>
              <div className='propertyButton-div'>
                <button
                  className='propertyPageBtns'
                  data-bs-toggle='modal'
                  data-bs-target='#staticBackdrop3'
                >
                  <span className='plusdiv'>+</span>Add New
                </button>
                {selected.length > 0 && (
                  <button
                    className='propertyButton-delete'
                    onClick={deletePropertyOnMain}
                  >
                    Delete
                  </button>
                )}
                <AddNewProperty
                  isEditTrue={isEditTrue}
                  setIsEditTrue={setIsEditTrue}
                  setBoolVal={setBoolVal}
                  numberOfRegisteredLots={registeredLots.length}
                />
              </div>
            </div>
            <div className='leftPropertyDiv'>
              <div className='row'>
                <div className='col-1' style={{ textAlign: 'center' }}>
                  <input
                    type='checkbox'
                    checked={
                      filteredData.length > 0 &&
                      selected.length === filteredData.length
                    }
                    onChange={handleSelectAllClick}
                  />
                </div>
                <div className='col-4'>
                  <p className='associatedContacts-label'>
                    Title Ref.
                    <div className='associatedContacts-label-btn'>
                      {sortOrder === 'asc' && sortField === 'titleRef' ? (
                        <img
                          src={upArrowColoured}
                          alt='asc'
                          className='label-btn-img-1'
                          onClick={() => handleSort('titleRef', 'asc')}
                        />
                      ) : (
                        <img
                          src={upArrow}
                          alt='asc'
                          className='label-btn-img-1'
                          onClick={() => handleSort('titleRef', 'asc')}
                        />
                      )}
                      {sortOrder === 'desc' && sortField === 'titleRef' ? (
                        <img
                          src={downArrowColoured}
                          alt='desc'
                          className='label-btn-img-2'
                          onClick={() => handleSort('titleRef', 'desc')}
                        />
                      ) : (
                        <img
                          src={downArrow}
                          alt='desc'
                          className='label-btn-img-2'
                          onClick={() => handleSort('titleRef', 'desc')}
                        />
                      )}
                    </div>
                  </p>
                  {/*<p>Title Ref.</p>*/}
                </div>
                <div className='col-6'>
                  <p className='associatedContacts-label'>
                    Address
                    <div className='associatedContacts-label-btn'>
                      {sortOrder === 'asc' && sortField === 'address' ? (
                        <img
                          src={upArrowColoured}
                          alt='asc'
                          className='label-btn-img-1'
                          onClick={() => handleSort('address', 'asc')}
                        />
                      ) : (
                        <img
                          src={upArrow}
                          alt='asc'
                          className='label-btn-img-1'
                          onClick={() => handleSort('address', 'asc')}
                        />
                      )}
                      {sortOrder === 'desc' && sortField === 'address' ? (
                        <img
                          src={downArrowColoured}
                          alt='desc'
                          className='label-btn-img-2'
                          onClick={() => handleSort('address', 'desc')}
                        />
                      ) : (
                        <img
                          src={downArrow}
                          alt='desc'
                          className='label-btn-img-2'
                          onClick={() => handleSort('address', 'desc')}
                        />
                      )}
                    </div>
                  </p>
                </div>
              </div>
              <div className='row'>
                <div className='col-1'></div>
                <div className='col-4'>
                  <input
                    style={{
                      width: '100%',
                      marginTop: '10px',
                      marginBottom: '10px',
                    }}
                    id='titleReference'
                    name='titleRef'
                    onChange={handleFilter}
                    type='text'
                  />
                </div>
                <div className='col-6'>
                  <input
                    style={{
                      width: '90%',
                      marginTop: '10px',
                      marginBottom: '10px',
                    }}
                    id='address'
                    name='address'
                    onChange={handleFilter}
                    type='text'
                  />
                </div>
              </div>
              {/*<button
                className="propertyPageBtns searchBtn"
                onClick={() => {
                  getAllProperties();
                }}
              >
                Search
              </button>*/}
              <br />
              <div className='row'></div>
              {renderAllProperties()}
            </div>
          </div>
        </div>
        <div className='col-12 hideSection' id='mainPropertyDiv'>
          <div>
            <div>
              <div className='propertyPageHeadings'>
                <h6 className='propertyPageHeads'>Property</h6>
                <div style={{ width: '350px', display: 'flex' }}>
                  <button
                    className='propertyPageBtns'
                    onClick={() => {
                      updateProperty();
                    }}
                  >
                    Save
                  </button>
                  <button
                    className='propertyPageBtns'
                    onClick={() => {
                      deleteProperty();
                    }}
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => {
                      backToSearch();
                    }}
                    className='propertyPageBtns'
                  >
                    Cancel
                  </button>
                </div>
              </div>
              <div className='propertyPagesubHeads propertyPageFirstDiv'>
                <div className='row'>
                  <div className='col-3'>
                    <label>Building Name</label>
                    <input
                      type='text'
                      onChange={(e) => {
                        setSpecificProperty({
                          ...specificProperty,
                          buildingName: e.target.value,
                        });
                      }}
                      value={specificProperty?.buildingName}
                    />
                  </div>
                  <div className='col-3'>
                    <label>Unit</label>
                    <input
                      type='text'
                      value={specificProperty?.unit}
                      onChange={(e) => {
                        setSpecificProperty({
                          ...specificProperty,
                          unit: e.target.value,
                        });
                      }}
                    />
                  </div>
                  <div className='col-3'>
                    <label>Street No.</label>
                    <input
                      type='text'
                      value={specificProperty?.streetNo}
                      onChange={(e) => {
                        setSpecificProperty({
                          ...specificProperty,
                          streetNo: e.target.value,
                        });
                      }}
                    />
                  </div>
                  <div className='col-3'>
                    <label>Street</label>
                    <input
                      type='text'
                      value={specificProperty?.street}
                      onChange={(e) => {
                        setSpecificProperty({
                          ...specificProperty,
                          street: e.target.value,
                        });
                      }}
                    />
                  </div>
                </div>
                <div className='row'>
                  <div className='col-3'>
                    <label>Suburb</label>
                    <input
                      type='text'
                      value={specificProperty?.suburb}
                      onChange={(e) => {
                        setSpecificProperty({
                          ...specificProperty,
                          suburb: e.target.value,
                        });
                      }}
                    />
                  </div>
                  <div className='col-3'>
                    <label>State</label>
                    <input
                      type='text'
                      value={specificProperty?.state}
                      onChange={(e) => {
                        setSpecificProperty({
                          ...specificProperty,
                          state: e.target.value,
                        });
                      }}
                    />
                  </div>
                  <div className='col-3'>
                    <label>Post Code</label>
                    <input
                      type='text'
                      value={specificProperty?.postCode}
                      onChange={(e) => {
                        setSpecificProperty({
                          ...specificProperty,
                          postCode: e.target.value,
                        });
                      }}
                    />
                  </div>
                  <div className='col-3'>
                    <label>County</label>
                    <input
                      type='text'
                      value={specificProperty?.county}
                      onChange={(e) => {
                        setSpecificProperty({
                          ...specificProperty,
                          county: e.target.value,
                        });
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className='2'>
              <div className='propertyPageHeadings'>
                <h6 className='propertyPageHeads'>Add/Edit Registered Lots</h6>
                <button
                  className='propertyPageBtns'
                  data-bs-toggle='modal'
                  data-bs-target='#staticBackdrop1'
                  onClick={() => {
                    setIsAddTrue(false);
                  }}
                >
                  + Add
                </button>
                <PopupFormR
                  modalId={1}
                  addBtn={1}
                  tempRegistered={registeredLots}
                  specifiedDetails={specificProperty}
                  setTempRegistered={setRegisteredLots}
                  isAddTrue={isAddTrue}
                />
              </div>
              <div className='propertyPagesubHeads'>
                <div className='row'>
                  <div className='col-1'>
                    <h6>Edit</h6>
                  </div>
                  <div className='col-2'>
                    <label className='associatedContacts-label'>
                      Title Reference
                      <div className='associatedContacts-label-btn'>
                        {sortOrder === 'asc' &&
                        sortField === 'titleReference' ? (
                          <img
                            src={upArrowColoured}
                            alt='asc'
                            className='label-btn-img-1'
                            onClick={() =>
                              handleRegisterSort('titleReference', 'asc')
                            }
                          />
                        ) : (
                          <img
                            src={upArrow}
                            alt='asc'
                            className='label-btn-img-1'
                            onClick={() =>
                              handleRegisterSort('titleReference', 'asc')
                            }
                          />
                        )}
                        {sortOrder === 'desc' &&
                        sortField === 'titleReference' ? (
                          <img
                            src={downArrowColoured}
                            alt='desc'
                            className='label-btn-img-2'
                            onClick={() =>
                              handleRegisterSort('titleReference', 'desc')
                            }
                          />
                        ) : (
                          <img
                            src={downArrow}
                            alt='desc'
                            className='label-btn-img-2'
                            onClick={() =>
                              handleRegisterSort('titleReference', 'desc')
                            }
                          />
                        )}
                      </div>
                    </label>
                    <input
                      type='text'
                      name='titleReference'
                      onChange={handleFilterRegister}
                    ></input>
                  </div>
                  <div className='col-1'>
                    <label className='associatedContacts-label'>
                      Lot No.
                      <div className='associatedContacts-label-btn'>
                        {sortOrder === 'asc' && sortField === 'lotNumber' ? (
                          <img
                            src={upArrowColoured}
                            alt='asc'
                            className='label-btn-img-1'
                            onClick={() =>
                              handleRegisterSort('lotNumber', 'asc')
                            }
                          />
                        ) : (
                          <img
                            src={upArrow}
                            alt='asc'
                            className='label-btn-img-1'
                            onClick={() =>
                              handleRegisterSort('lotNumber', 'asc')
                            }
                          />
                        )}
                        {sortOrder === 'desc' && sortField === 'lotNumber' ? (
                          <img
                            src={downArrowColoured}
                            alt='desc'
                            className='label-btn-img-2'
                            onClick={() =>
                              handleRegisterSort('lotNumber', 'desc')
                            }
                          />
                        ) : (
                          <img
                            src={downArrow}
                            alt='desc'
                            className='label-btn-img-2'
                            onClick={() =>
                              handleRegisterSort('lotNumber', 'desc')
                            }
                          />
                        )}
                      </div>
                    </label>
                    <input
                      type='text'
                      name='lotNumber'
                      onChange={handleFilterRegister}
                    ></input>
                  </div>
                  <div className='col-1'>
                    <label className='associatedContacts-label'>
                      Section
                      <div className='associatedContacts-label-btn'>
                        {sortOrder === 'asc' && sortField === 'section' ? (
                          <img
                            src={upArrowColoured}
                            alt='asc'
                            className='label-btn-img-1'
                            onClick={() => handleRegisterSort('section', 'asc')}
                          />
                        ) : (
                          <img
                            src={upArrow}
                            alt='asc'
                            className='label-btn-img-1'
                            onClick={() => handleRegisterSort('section', 'asc')}
                          />
                        )}
                        {sortOrder === 'desc' && sortField === 'section' ? (
                          <img
                            src={downArrowColoured}
                            alt='desc'
                            className='label-btn-img-2'
                            onClick={() =>
                              handleRegisterSort('section', 'desc')
                            }
                          />
                        ) : (
                          <img
                            src={downArrow}
                            alt='desc'
                            className='label-btn-img-2'
                            onClick={() =>
                              handleRegisterSort('section', 'desc')
                            }
                          />
                        )}
                      </div>
                    </label>
                    <input
                      type='text'
                      name='section'
                      onChange={handleFilterRegister}
                    ></input>
                  </div>
                  <div className='col-3'>
                    <label className='associatedContacts-label'>
                      Deposited Plan No.
                      <div className='associatedContacts-label-btn'>
                        {sortOrder === 'asc' &&
                        sortField === 'depositedPlanNumber' ? (
                          <img
                            src={upArrowColoured}
                            alt='asc'
                            className='label-btn-img-1'
                            onClick={() =>
                              handleRegisterSort('depositedPlanNumber', 'asc')
                            }
                          />
                        ) : (
                          <img
                            src={upArrow}
                            alt='asc'
                            className='label-btn-img-1'
                            onClick={() =>
                              handleRegisterSort('depositedPlanNumber', 'asc')
                            }
                          />
                        )}
                        {sortOrder === 'desc' &&
                        sortField === 'depositedPlanNumber' ? (
                          <img
                            src={downArrowColoured}
                            alt='desc'
                            className='label-btn-img-2'
                            onClick={() =>
                              handleRegisterSort('depositedPlanNumber', 'desc')
                            }
                          />
                        ) : (
                          <img
                            src={downArrow}
                            alt='desc'
                            className='label-btn-img-2'
                            onClick={() =>
                              handleRegisterSort('depositedPlanNumber', 'desc')
                            }
                          />
                        )}
                      </div>
                    </label>
                    <input
                      type='text'
                      name='depositedPlanNumber'
                      onChange={handleFilterRegister}
                    ></input>
                  </div>
                  <div className='col-2'>
                    <label className='associatedContacts-label'>
                      Strata Plan No.
                      <div className='associatedContacts-label-btn'>
                        {sortOrder === 'asc' &&
                        sortField === 'strataPlanNumber' ? (
                          <img
                            src={upArrowColoured}
                            alt='asc'
                            className='label-btn-img-1'
                            onClick={() =>
                              handleRegisterSort('strataPlanNumber', 'asc')
                            }
                          />
                        ) : (
                          <img
                            src={upArrow}
                            alt='asc'
                            className='label-btn-img-1'
                            onClick={() =>
                              handleRegisterSort('strataPlanNumber', 'asc')
                            }
                          />
                        )}
                        {sortOrder === 'desc' &&
                        sortField === 'strataPlanNumber' ? (
                          <img
                            src={downArrowColoured}
                            alt='desc'
                            className='label-btn-img-2'
                            onClick={() =>
                              handleRegisterSort('strataPlanNumber', 'desc')
                            }
                          />
                        ) : (
                          <img
                            src={downArrow}
                            alt='desc'
                            className='label-btn-img-2'
                            onClick={() =>
                              handleRegisterSort('strataPlanNumber', 'desc')
                            }
                          />
                        )}
                      </div>
                    </label>
                    <input
                      type='text'
                      name='strataPlanNumber'
                      onChange={handleFilterRegister}
                    ></input>
                  </div>
                  <div className='col-2'>
                    <label className='associatedContacts-label'>
                      Description
                      <div className='associatedContacts-label-btn'>
                        {sortOrder === 'asc' && sortField === 'description' ? (
                          <img
                            src={upArrowColoured}
                            alt='asc'
                            className='label-btn-img-1'
                            onClick={() =>
                              handleRegisterSort('description', 'asc')
                            }
                          />
                        ) : (
                          <img
                            src={upArrow}
                            alt='asc'
                            className='label-btn-img-1'
                            onClick={() =>
                              handleRegisterSort('description', 'asc')
                            }
                          />
                        )}
                        {sortOrder === 'desc' && sortField === 'description' ? (
                          <img
                            src={downArrowColoured}
                            alt='desc'
                            className='label-btn-img-2'
                            onClick={() =>
                              handleRegisterSort('description', 'desc')
                            }
                          />
                        ) : (
                          <img
                            src={downArrow}
                            alt='desc'
                            className='label-btn-img-2'
                            onClick={() =>
                              handleRegisterSort('description', 'desc')
                            }
                          />
                        )}
                      </div>
                    </label>
                    <input
                      type='text'
                      name='description'
                      onChange={handleFilterRegister}
                    ></input>
                  </div>
                </div>
                <div className='lotsScrollDiv'>{renderRegisteredLots()}</div>
              </div>
            </div>
            <div className='3'>
              <div className='propertyPageHeadings'>
                <h6 className='propertyPageHeads'>
                  Add/Edit Unregistered Lots
                </h6>
                <button
                  className='propertyPageBtns'
                  data-bs-toggle='modal'
                  data-bs-target='#staticBackdrop2'
                  onClick={() => {
                    setIsAddTrue(false);
                  }}
                >
                  + Add
                </button>

                <PopupFormUnR
                  modalId={2}
                  addBtn={1}
                  tempUnregistered={unregisteredLots}
                  specifiedDetails={specificProperty}
                  setTempUnregistered={setUnregisteredLots}
                  isAddTrue={isAddTrue}
                />
              </div>
              <div className='propertyPagesubHeads'>
                <div className='row'>
                  <div className='col-1'>
                    <h6>Edit</h6>
                  </div>
                  <div className='col-2'>
                    <label className='associatedContacts-label'>
                      Lot No.
                      <div className='associatedContacts-label-btn'>
                        {sortOrder === 'asc' && sortField === 'lot' ? (
                          <img
                            src={upArrowColoured}
                            alt='asc'
                            className='label-btn-img-1'
                            onClick={() => handleUnregisterSort('lot', 'asc')}
                          />
                        ) : (
                          <img
                            src={upArrow}
                            alt='asc'
                            className='label-btn-img-1'
                            onClick={() => handleUnregisterSort('lot', 'asc')}
                          />
                        )}
                        {sortOrder === 'desc' && sortField === 'lot' ? (
                          <img
                            src={downArrowColoured}
                            alt='desc'
                            className='label-btn-img-2'
                            onClick={() => handleUnregisterSort('lot', 'desc')}
                          />
                        ) : (
                          <img
                            src={downArrow}
                            alt='desc'
                            className='label-btn-img-2'
                            onClick={() => handleUnregisterSort('lot', 'desc')}
                          />
                        )}
                      </div>
                    </label>
                    <input
                      type='text'
                      name='lot'
                      onChange={handleFilterUnregister}
                    ></input>
                  </div>
                  <div className='col-2'>
                    <label className='associatedContacts-label'>
                      Part of lot
                      <div className='associatedContacts-label-btn'>
                        {sortOrder === 'asc' && sortField === 'partOfLot' ? (
                          <img
                            src={upArrowColoured}
                            alt='asc'
                            className='label-btn-img-1'
                            onClick={() =>
                              handleUnregisterSort('partOfLot', 'asc')
                            }
                          />
                        ) : (
                          <img
                            src={upArrow}
                            alt='asc'
                            className='label-btn-img-1'
                            onClick={() =>
                              handleUnregisterSort('partOfLot', 'asc')
                            }
                          />
                        )}
                        {sortOrder === 'desc' && sortField === 'partOfLot' ? (
                          <img
                            src={downArrowColoured}
                            alt='desc'
                            className='label-btn-img-2'
                            onClick={() =>
                              handleUnregisterSort('partOfLot', 'desc')
                            }
                          />
                        ) : (
                          <img
                            src={downArrow}
                            alt='desc'
                            className='label-btn-img-2'
                            onClick={() =>
                              handleUnregisterSort('partOfLot', 'desc')
                            }
                          />
                        )}
                      </div>
                    </label>
                    <input
                      type='text'
                      name='partOfLot'
                      onChange={handleFilterUnregister}
                    ></input>
                  </div>
                  <div className='col-1'>
                    <label className='associatedContacts-label'>
                      Section
                      <div className='associatedContacts-label-btn'>
                        {sortOrder === 'asc' && sortField === 'section' ? (
                          <img
                            src={upArrowColoured}
                            alt='asc'
                            className='label-btn-img-1'
                            onClick={() =>
                              handleUnregisterSort('section', 'asc')
                            }
                          />
                        ) : (
                          <img
                            src={upArrow}
                            alt='asc'
                            className='label-btn-img-1'
                            onClick={() =>
                              handleUnregisterSort('section', 'asc')
                            }
                          />
                        )}
                        {sortOrder === 'desc' && sortField === 'section' ? (
                          <img
                            src={downArrowColoured}
                            alt='desc'
                            className='label-btn-img-2'
                            onClick={() =>
                              handleUnregisterSort('section', 'desc')
                            }
                          />
                        ) : (
                          <img
                            src={downArrow}
                            alt='desc'
                            className='label-btn-img-2'
                            onClick={() =>
                              handleUnregisterSort('section', 'desc')
                            }
                          />
                        )}
                      </div>
                    </label>
                    <input
                      type='text'
                      name='section'
                      onChange={handleFilterUnregister}
                    ></input>
                  </div>
                  <div className='col-3'>
                    <label className='associatedContacts-label'>
                      Plan Number
                      <div className='associatedContacts-label-btn'>
                        {sortOrder === 'asc' && sortField === 'plan' ? (
                          <img
                            src={upArrowColoured}
                            alt='asc'
                            className='label-btn-img-1'
                            onClick={() => handleUnregisterSort('plan', 'asc')}
                          />
                        ) : (
                          <img
                            src={upArrow}
                            alt='asc'
                            className='label-btn-img-1'
                            onClick={() => handleUnregisterSort('plan', 'asc')}
                          />
                        )}
                        {sortOrder === 'desc' && sortField === 'plan' ? (
                          <img
                            src={downArrowColoured}
                            alt='desc'
                            className='label-btn-img-2'
                            onClick={() => handleUnregisterSort('plan', 'desc')}
                          />
                        ) : (
                          <img
                            src={downArrow}
                            alt='desc'
                            className='label-btn-img-2'
                            onClick={() => handleUnregisterSort('plan', 'desc')}
                          />
                        )}
                      </div>
                    </label>
                    <input
                      type='text'
                      name='plan'
                      onChange={handleFilterUnregister}
                    ></input>
                  </div>
                  <div className='col-3'>
                    <label className='associatedContacts-label'>
                      Description
                      <div className='associatedContacts-label-btn'>
                        {sortOrder === 'asc' && sortField === 'description' ? (
                          <img
                            src={upArrowColoured}
                            alt='asc'
                            className='label-btn-img-1'
                            onClick={() =>
                              handleUnregisterSort('description', 'asc')
                            }
                          />
                        ) : (
                          <img
                            src={upArrow}
                            alt='asc'
                            className='label-btn-img-1'
                            onClick={() =>
                              handleUnregisterSort('description', 'asc')
                            }
                          />
                        )}
                        {sortOrder === 'desc' && sortField === 'description' ? (
                          <img
                            src={downArrowColoured}
                            alt='desc'
                            className='label-btn-img-2'
                            onClick={() =>
                              handleUnregisterSort('description', 'desc')
                            }
                          />
                        ) : (
                          <img
                            src={downArrow}
                            alt='desc'
                            className='label-btn-img-2'
                            onClick={() =>
                              handleUnregisterSort('description', 'desc')
                            }
                          />
                        )}
                      </div>
                    </label>
                    <input
                      type='text'
                      name='description'
                      onChange={handleFilterUnregister}
                    ></input>
                  </div>
                </div>
                <div className='lotsScrollDiv'>{renderUnregisteredLots()}</div>
              </div>
            </div>
            <div className='4'>
              <div className='propertyPageHeadings'>
                <h6 className='propertyPageHeads'>Related Matters</h6>
              </div>
              <div className='propertyPagesubHeads'>
                <div className='row relatedMattersDiv'>
                  <div className='col-1'>
                    <h6>Matter</h6>
                    <input type='text'></input>
                  </div>
                  <div className='col-2'>
                    <h6>Client Name</h6>
                    <input type='text'></input>
                  </div>
                  <div className='col-2'>
                    <h6>Responsible Person</h6>
                    <input type='text'></input>
                  </div>
                  <div className='col-1'>
                    <h6>Status</h6>
                    <input type='text'></input>
                  </div>
                  <div className='col-1'>
                    <h6>Sub type</h6>
                    <input type='text'></input>
                  </div>
                  <div className='col-1'>
                    <h6>Total Amount Due</h6>
                    <input type='text'></input>
                  </div>
                  <div className='col-2'>
                    <h6>Start Date</h6>
                    <input type='text'></input>
                  </div>
                  <div className='col-2'>
                    <h6>End Date</h6>
                    <input type='text'></input>
                  </div>
                </div>
                <div className='lotsScrollDiv'>
                  {/* <RelatedMattersLot />
                  <RelatedMattersLot />
                  <RelatedMattersLot />
                  <RelatedMattersLot />
                  <RelatedMattersLot /> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RenderProperty;
