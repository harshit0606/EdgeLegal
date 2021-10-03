import react, { useEffect, useState } from 'react';
import axios from 'axios';
import url from '../../config.js';
import { useCookies } from 'react-cookie';

import styles from '../../stylesheets/property.css';

import PopupFormR from './popupformR.js';
import PopupFormUnR from './popupformUnR.js';
import RegisteredLot from './registeredLot.js';
import UnregisteredLot from './unregisteredLot.js';
import RelatedMattersLot from './relatedMatters.js';
import AddNewProperty from './addNewProperty.js';

function RenderProperty() {
  const [cookies, setCookie, removeCookie] = useCookies(['token']);
  const loggedInToken = cookies.token;

  const [allProperties, setAllProperties] = useState([]);
  const [titleRef, setTitleRef] = useState(null);
  const [address, setAddress] = useState(null);
  const [filteredData, setFilteredData] = useState([]);
  const [specificProperty, setSpecificProperty] = useState(null);
  const [registeredLots, setRegisteredLots] = useState(null);
  const [unregisteredLots, setUnregisteredLots] = useState(null);
  const [isEditTrue, setIsEditTrue] = useState(false);
  const [boolVal, setBoolVal] = useState(false);

  useEffect(() => {
    const propertyData = (data) => {
      console.log('data', data);
      var dataArray = [];
      data.forEach((d) => {
        const propertyAddress = `${d.unit}/ ${d.streetNo}/ ${d.street}/ ${d.suburb}/ ${d.state}/ ${d.postCode}/ ${d.country}`;
        dataArray.push({
          titleRef: d.registeredProperties.length === 0 ? '' : 'title',
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
  // useEffect(() => {
  //   getAllProperties();
  // }, []);
  // function getAllProperties() {
  //   axios
  //     .get(
  //       `${url}/api/property?requestId=1234567&titleRef=${titleRef}&address=${address}`,
  //       {
  //         headers: {
  //           'Content-Type': 'application/json',
  //           Authorization: `Bearer ${loggedInToken}`,
  //         },
  //       },
  //       {
  //         withCredentials: true,
  //       }
  //     )
  //     .then((response) => {
  //       setAllProperties(response.data.data.properties);
  //       console.log('in axios then', response.data.data);
  //     });
  // }

  const filterData = (prop, val) => {
    const newData = allProperties.filter((data) => {
      // if (val === ' ' || val === '/') {
      //   return data;
      // } else {
      //   return (
      //     data['unit']?.toLowerCase().includes(val.toLowerCase()) ||
      //     data['streetNo']?.toLowerCase().includes(val.toLowerCase()) ||
      //     data['street']?.toLowerCase().includes(val.toLowerCase()) ||
      //     data['suburb']?.toLowerCase().includes(val.toLowerCase()) ||
      //     data['state']?.toLowerCase().includes(val.toLowerCase()) ||
      //     data['postCode']?.toLowerCase().includes(val.toLowerCase()) ||
      //     data['country']?.toLowerCase().includes(val.toLowerCase())
      //   );
      // }
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
        console.log(response.data);
        window.location.reload();
      });
  }

  function renderAllProperties() {
    // console.log('all properties', allProperties);
    return filteredData?.map((property, index) => {
      // const propertyAddress =
      //   '' +
      //   property.unit +
      //   '/ ' +
      //   property.streetNo +
      //   '/ ' +
      //   property.street +
      //   '/ ' +
      //   property.suburb +
      //   '/ ' +
      //   property.state +
      //   '/ ' +
      //   property.postCode +
      //   '/ ' +
      //   property.country;
      // console.log(property.details);
      return (
        <div
          className={`row ${
            index % 2 === 0 ? 'contacttdatadiv' : 'lightcontacttdatadiv'
          }`}
          onClick={() => {
            fetchPropertyData(property.details);
          }}
        >
          <h6 className='col-4'>{property.titleRef}</h6>
          <h6 className='col-8'>{property.address}</h6>
        </div>
      );
    });
  }

  function fetchPropertyData(details) {
    console.log('details', details);
    setSpecificProperty(details);
    setRegisteredLots(details.registeredProperties);
    setUnregisteredLots(details.unregisteredProperties);

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
    return registeredLots?.map((registeredLot, idx) => {
      return (
        <RegisteredLot
          modal={1}
          registeredLot={registeredLot}
          isEditTrue={isEditTrue}
          setIsEditTrue={setIsEditTrue}
          idx={idx}
        />
      );
    });
  }

  function renderUnregisteredLots() {
    return unregisteredLots?.map((unregisteredLot) => {
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
              <div>
                <button
                  className='propertyPageBtns'
                  data-bs-toggle='modal'
                  data-bs-target='#staticBackdrop3'
                >
                  <span className='plusdiv'>+</span>Add New
                </button>
                <AddNewProperty
                  isEditTrue={isEditTrue}
                  setIsEditTrue={setIsEditTrue}
                  setBoolVal={setBoolVal}
                />
              </div>
            </div>
            <div className='leftPropertyDiv'>
              <div className='row'>
                <div className='col-4'>
                  <p>Title Ref.</p>
                </div>
                <div className='col-8'>
                  <p>Address</p>
                </div>
              </div>
              <div className='row'>
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
                <div className='col-8'>
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
                <div style={{ width: '350px',display:"flex" }}>
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
                    setIsEditTrue(false);
                  }}
                >
                  + Add
                </button>
                <PopupFormR
                  modalId={1}
                  addBtn={1}
                  tempRegistered={registeredLots}
                  setTempRegistered={setRegisteredLots}
                  isEditTrue={isEditTrue}
                />
              </div>
              <div className='propertyPagesubHeads'>
                <div className='row'>
                  <div className='col-1'>
                    <h6>Edit</h6>
                  </div>
                  <div className='col-2'>
                    <h6>Title Reference</h6>
                    <input type='text'></input>
                  </div>
                  <div className='col-1'>
                    <h6>LotNo.</h6>
                    <input type='text'></input>
                  </div>
                  <div className='col-1'>
                    <h6>Section</h6>
                    <input type='text'></input>
                  </div>
                  <div className='col-3'>
                    <h6>Deposited Plan No.</h6>
                    <input type='text'></input>
                  </div>
                  <div className='col-2'>
                    <h6>Strata Plan No.</h6>
                    <input type='text'></input>
                  </div>
                  <div className='col-2'>
                    <h6>Description</h6>
                    <input type='text'></input>
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
                    setIsEditTrue(false);
                  }}
                >
                  + Add
                </button>

                <PopupFormUnR
                  modalId={2}
                  addBtn={1}
                  tempUnregistered={unregisteredLots}
                  setTempUnregistered={setUnregisteredLots}
                  isEditTrue={isEditTrue}
                />
              </div>
              <div className='propertyPagesubHeads'>
                <div className='row'>
                  <div className='col-1'>
                    <h6>Edit</h6>
                  </div>
                  <div className='col-2'>
                    <h6>Lot No.</h6>
                    <input type='text'></input>
                  </div>
                  <div className='col-2'>
                    <h6>Part of Lot</h6>
                    <input type='text'></input>
                  </div>
                  <div className='col-1'>
                    <h6>Section</h6>
                    <input type='text'></input>
                  </div>
                  <div className='col-3'>
                    <h6>Plan Number</h6>
                    <input type='text'></input>
                  </div>
                  <div className='col-3'>
                    <h6>Description</h6>
                    <input type='text'></input>
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
