import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../stylesheets/safeCustody.css';
import url from '../../config.js';
import Document from './document.js';
import AddCustodyPopup from './addCustodyPopup.js';
import AssociatedContacts from './associatedContacts.js';
import File from './file.js';
import { useCookies } from 'react-cookie';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
} from '@material-ui/core';
import SafeStripe from '../topStripes/SafeStripe';

import { Link } from 'react-router-dom';
import AddCustodyForm from './AddCustodyForm';

const filterFields = {
  contactCode: '',
  firstName: '',
  lastName: '',
  companyName: '',
  contactType: '',
  emailAddress: '',
  telephoneNumber: '',
};

function RenderSafeCustody(props) {
  const [cookies, setCookie, removeCookie] = useCookies(['token']);
  const loggedInToken = cookies.token;
  const { id } = props.match.params;
  const [safeCustodyPackets, setSafeCustodyPackets] = useState(null);
  const [custodyPacketContacts, setCustodyPacketContacts] = useState([]);
  const [custodyPacket, setCustodyPacket] = useState({});
  const [filteredData, setFilteredData] = useState([]);
  const [filterInput, setFilterInput] = useState(filterFields);
  const [safeCustodyStatus, setSafeCustodyStatus] = useState(null);
  const [isAddCustodyOpen, setIsAddCustoduOpen] = useState(false);

  useEffect(() => {
    axios
      .get(
        `${url}/api/safecustody/${id}?requestId=1124455`,
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
        console.log('all data', response.data.data);
        setCustodyPacketContacts(response.data?.data?.custodyPacketContacts);
        setCustodyPacket(response.data?.data);
        setFilteredData(response.data?.data?.custodyPacketContacts);
      });
  }, []);

  const handleAddCustody = () => {
    setIsAddCustoduOpen(true);
  };

  const handleShowContacts = () => {
    axios
      .get(
        `${url}/api/safecustody/1?requestId=1124455`,
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
        console.log(response.data.data);
        setCustodyPacketContacts(response.data?.data?.custodyPacketContacts);
        setFilteredData(response.data?.data?.custodyPacketContacts);
        setCurrentSafe('contacts');
      });
  };

  // const filterData = (prop, val) => {
  //   const newData = filteredData.filter((data) =>
  //     data.contactDetails[prop].toLowerCase().includes(val.toLowerCase())
  //   );
  //   setFilteredData(newData);
  // };

  // // const filterDataByType = (prop, val) => {
  // //   const newData = custodyPacketContacts.filter((data) => data[prop].includes(val));
  // //   setFilteredData(newData);
  // // };

  // const handleFilter = (e) => {
  //   const { name } = e.target;
  //   // setFormData({ ...formData, [name]: e.target.value });
  //   // if(name==='contactType'){
  //   //   filterDataByType(name, e.target.value);
  //   // }

  //   if (e.target.value === '') {
  //     setFilteredData(custodyPacketContacts);
  //   } else {
  //     filterData(name, e.target.value);
  //   }
  // };

  const filterData = (obj) => {
    // console.log(obj);
    const newData = custodyPacketContacts.filter(
      (data) =>
        data.contactDetails['contactCode']
          .toLowerCase()
          .includes(obj['contactCode'].toLowerCase()) &&
        data.contactDetails['firstName']
          .toLowerCase()
          .includes(obj['firstName'].toLowerCase()) &&
        data.contactDetails['lastName']
          .toLowerCase()
          .includes(obj['lastName'].toLowerCase()) &&
        data.contactDetails['companyName']
          .toLowerCase()
          .includes(obj['companyName'].toLowerCase()) &&
        data.contactDetails['emailAddress']
          .toLowerCase()
          .includes(obj['emailAddress'].toLowerCase()) &&
        data.contactDetails['telephoneNumber']
          .toLowerCase()
          .includes(obj['telephoneNumber'].toLowerCase())
    );
    setFilteredData(newData);
  };

  const handleFilter = (e) => {
    const { name } = e.target;
    setFilterInput({ ...filterInput, [name]: e.target.value });
    filterData({ ...filterInput, [name]: e.target.value });
    // console.log(filteredData);
    // if (e.target.value === '') {
    //   setFilteredData(contactLists);
    // } else {

    // }
  };

  function renderSafeSelectTop() {
    return (
      <div>
        <div>
          <SafeStripe />
        </div>
        <div className='selectsFileDiv'>
          <div className='d-flex'>
            <h6 style={{ paddingTop: '12%' }}>Status</h6>
            <Box sx={{ minWidth: 120 }} style={{ marginLeft: '25%' }}>
              <FormControl fullWidth>
                <InputLabel id='demo-simple-select-label'>Files</InputLabel>
                <Select
                  labelId='demo-simple-select-label'
                  id='demo-simple-select'
                  value={safeCustodyStatus}
                  label='Files'
                  onChange={(e) => {
                    getSafeCustody(e);
                  }}
                >
                  <MenuItem value={'ALL'}>All</MenuItem>
                  <MenuItem value={'ACTIVE'}>Active</MenuItem>
                  <MenuItem value={'INACTIVE'}>Inactive</MenuItem>
                  <MenuItem value={'UPLIFTED'}>Uplifted</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </div>
          <input
            style={{ width: '40%' }}
            placeholder='Search by packet no., Contact name, Address, Document name'
          ></input>
          <div className='custodyPageBtns' style={{ width: '22%' }}>
            <button>Filter </button>
            <button>Clear</button>
            <button>More</button>
          </div>
        </div>
      </div>
    );
  }

  function renderSafeContactsTop() {
    return (
      <div>
        <div className='safeContacts'>
          <div>
            
            <h5 style={{ fontWeight: 'bold' }}>Associated Contacts</h5>
          </div>
          <div className='custodyPageBtns' style={{ paddingTop: '2%' }}>
            <button>Save </button>

            <Link to='/home/safecustody'>
              <button>Cancel</button>
            </Link>

            <button>Delete</button>
          </div>
        </div>
      </div>
    );
  }

  function renderSafeContentsTop() {
    return (
      <div>
        <div className='safeContentsTop'>
          <h5 style={{ fontWeight: 'bold' }}>Details for packet no.1</h5>
          <div className='custodyPageBtns'>
            <Link to='/home/safecustody'>
              <button>Cancel</button>
            </Link>

            <button>Delete</button>
          </div>
        </div>
      </div>
    );
  }

  function renderSafeReceiptsTop() {
    return (
      <div>
        <div className='safeContentsTop'>
          <h5 style={{ fontWeight: 'bold' }}>Receipts for packet no.1</h5>
          <div className='recepientsTop'>
            <button className="custodyAddbtn">Download </button>
            <button
            className="custodyAddbtn"
              onClick={() => {
                window.print();
              }}
            >
              Prepare Receipt
            </button>
          </div>
        </div>
      </div>
    );
  }

  function getSafeCustody(e) {
    const currentStatus = e.target.value;

    setSafeCustodyStatus(currentStatus);
    axios
      .get(
        `${url}/api/safecustody?requestId=1124455&status=${currentStatus}`,
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
        console.log(response.data.data.safeCustodyPackets);
        setSafeCustodyPackets(response.data.data.safeCustodyPackets);
      });
  }

  function renderSafeSelect() {
    return (
      <div>
        <div className='row safeSelectHeads'>
          <div className='col-2'>
            <label>Location</label>
            <input type='text'></input>
          </div>
          <div className='col-2'>
            <label>Packet No.</label>
            <input type='text'></input>
          </div>
          <div className='col-2'>
            <label>Contacts</label>
            <input type='text'></input>
          </div>
          <div className='col-2'>
            <label>Status</label>
            <input type='text'></input>
          </div>
          <div className='col-3'>
            <label>Comments</label>
            <input type='text'></input>
          </div>
        </div>
        <div>
          {/** */}
          {safeCustodyPackets?.map((packet, index) => {
            if (index % 2 == 0)
              return (
                <div className='contacttdatadiv'>
                  <div className='row '>
                    <div className='col-1'>
                      <input type='checkbox' />
                    </div>
                    <div className='col-2'>
                      <h6>{packet.siteName}</h6>
                    </div>
                    <div className='col-2'>
                      <h6>{packet.packetNumber}</h6>
                    </div>
                    <div className='col-2'>
                      <h6>{packet.companyName}</h6>
                    </div>
                    <div className='col-2'>
                      <h6>{packet.status}</h6>
                    </div>
                    <div className='col-3'>
                      <h6>{'comments'}</h6>
                    </div>
                  </div>
                </div>
              );
            else {
              return (
                <div className='lightcontacttdatadiv'>
                  <div className='row '>
                    <div className='col-1'>
                      <input type='checkbox' />
                    </div>
                    <div className='col-2'>
                      <h6>{packet.siteName}</h6>
                    </div>
                    <div className='col-2'>
                      <h6>{packet.packetNumber}</h6>
                    </div>
                    <div className='col-2'>
                      <h6>{packet.companyName}</h6>
                    </div>
                    <div className='col-2'>
                      <h6>{packet.status}</h6>
                    </div>
                    <div className='col-3'>
                      <h6>{'comments'}</h6>
                    </div>
                  </div>
                </div>
              );
            }
          })}
        </div>
      </div>
    );
  }

  function renderSafeContacts() {
    return (
      <div>
        <div>
          <div className='row associatedContacts'>
            
            <div className='col-2'>
              <label> Code</label>
              <input
                type='text'
                name='contactCode'
                onChange={handleFilter}
              ></input>
            </div>
            <div className='col-1'>
              <label>F.Name</label>
              <input
                type='text'
                name='firstName'
                onChange={handleFilter}
              ></input>
            </div>
            <div className='col-1'>
              <label>L.Name</label>
              <input
                type='text'
                name='lastName'
                onChange={handleFilter}
              ></input>
            </div>
            <div className='col-2'>
              <label>Company</label>
              <input
                type='text'
                name='companyName'
                onChange={handleFilter}
              ></input>
            </div>
            <div className='col-1'>
              <label> Type</label>
              <input
                type='text'
                // name='contactType'
                // onChange={handleFilter}
              ></input>
            </div>
            <div className='col-2'>
              <label>Email Address</label>
              <input
                type='text'
                name='emailAddress'
                onChange={handleFilter}
              ></input>
            </div>
            <div className='col-2'>
              <label>Phone Number</label>
              <input
                type='text'
                name='telephoneNumber'
                onChange={handleFilter}
              ></input>
            </div>
          </div>
          <div style={{ marginTop: '3%' }}>
            <AssociatedContacts contacts={filteredData} />
          </div>
        </div>
      </div>
    );
  }
  function renderSafeContents() {
    var x = 'client';
    return (
      <div>
        <div>
          <div style={{ padding: '2.5%' }} className='row'>
            <div className='col-4'>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <label
                  for='contents'
                  style={{ marginRight: '5%', color: '#A0A5AA' }}
                >
                  Contents
                </label>
                <textarea rows='2' cols='25' id='contents'></textarea>
              </div>
            </div>
            <div className='col-8 contentsInfo'>
              <div className='d-flex'>
                <label>First Name:</label>
                <input value='hello' type='text' />
                <label>Last Name:</label>
                <input value='hello' type='text' />
                <label>Contact Type:</label>
                <input value='hello' type='text' />
              </div>
              <div className='row'>
                <div>
                  <label style={{ width: '10%' }}>Address:</label>
                  <input value='hello' type='text' />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='associatedDocs'>
          <h6 style={{ fontWeight: 'bold' }}>Associated documents</h6>
          <div className='custodyPageBtns' style={{ width: '48%' }}>
            <button onClick={handleAddCustody}>ADD</button>
            <button>DELETE</button>
            <button>DOWNLOAD</button>
            <button
              onClick={() => {
                window.print();
              }}
            >
              PREPARE RECEIPT
            </button>
          </div>
        </div>
        {isAddCustodyOpen && (
          <AddCustodyForm closeForm={() => setIsAddCustoduOpen(false)} />
        )}
        <div className='row associatedDocsHead'>
          <div className='col-1'></div>
          <div className='col-2'>
            <label>Document Name</label>
          </div>
          <div className='col-2'>
            <label>Date Received</label>
          </div>
          <div className='col-1'>
            <label>Status</label>
          </div>
          <div className='col-2'>
            <label>Data Uplifted</label>
          </div>
          <div className='col-2'>
            <label>Uplifted By</label>
          </div>
          <div className='col-2'>
            <label>Comments</label>
          </div>
        </div>
        <div>
          <Document data={custodyPacket} />

          {/*
//         <div className="contacttdatadiv">
//         <div className='row' >
//         <div className='col-1'>
//           <input style={{ marginLeft: '50%' }} type='checkbox' />
//         </div>
//         <div className='col-2'>
//           <label>Document Name</label>
//         </div>
//         <div className='col-2'>
//           <label>Date Received</label>
//         </div>
//         <div className='col-1'>
//           <label>Status</label>
//         </div>
//         <div className='col-2'>
//           <label>Data Uplifted</label>
//         </div>
//         <div className='col-2'>
//           <label>Uplifted By</label>
//         </div>
//         <div className='col-2'>
//           <label>Comments</label>
//         </div>
//       </div>
//       </div>
//       <div className="lightcontacttdatadiv">
//       <div className='row' >
//       <div className='col-1'>
//         <input style={{ marginLeft: '50%' }} type='checkbox' />
//       </div>
//       <div className='col-2'>
//         <label>Document Name</label>
//       </div>
//       <div className='col-2'>
//         <label>Date Received</label>
//       </div>
//       <div className='col-1'>
//         <label>Status</label>
//       </div>
//       <div className='col-2'>
//         <label>Data Uplifted</label>
//       </div>
//       <div className='col-2'>
//         <label>Uplifted By</label>
//       </div>
//       <div className='col-2'>
//         <label>Comments</label>
//       </div>
//     </div>
//     </div>
//           <div className="contacttdatadiv">
//         <div className='row' >
//         <div className='col-1'>
//           <input style={{ marginLeft: '50%' }} type='checkbox' />
//         </div>
//         <div className='col-2'>
//           <label>Document Name</label>
//         </div>
//         <div className='col-2'>
//           <label>Date Received</label>
//         </div>
//         <div className='col-1'>
//           <label>Status</label>
//         </div>
//         <div className='col-2'>
//           <label>Data Uplifted</label>
//         </div>
//         <div className='col-2'>
//           <label>Uplifted By</label>
//         </div>
//         <div className='col-2'>
//           <label>Comments</label>
//         </div>
//       </div>
//       </div>
//       <div className="lightcontacttdatadiv">
//       <div className='row' >
//       <div className='col-1'>
//         <input style={{ marginLeft: '50%' }} type='checkbox' />
//       </div>
//       <div className='col-2'>
//         <label>Document Name</label>
//       </div>
//       <div className='col-2'>
//         <label>Date Received</label>
//       </div>
//       <div className='col-1'>
//         <label>Status</label>
//       </div>
//       <div className='col-2'>
//         <label>Data Uplifted</label>
//       </div>
//       <div className='col-2'>
//         <label>Uplifted By</label>
//       </div>
//       <div className='col-2'>
//         <label>Comments</label>
//       </div>
//     </div>
            //     </div>*/}
        </div>
      </div>
    );
  }

  function renderSafeReceipts() {
    return (
      <div>
        <div className='row associatedDocsHead'>
          <div className='col-1'></div>
          <div className='col-2'>
            <label>Document Name</label>
          </div>
          <div className='col-2'>
            <label>Data Received</label>
          </div>
          <div className='col-1'>
            <label>Status</label>
          </div>
          <div className='col-2'>
            <label>Data Uplifted</label>
          </div>
          <div className='col-2'>
            <label>Uplifted By</label>
          </div>
          <div className='col-2'>
            <label>Comments</label>
          </div>
        </div>
        <div>
          <Document data={custodyPacket} />
        </div>
      </div>
    );
  }

  const [currentSafe, setCurrentSafe] = useState('contacts');
  const [a, setA] = useState(null);
  const [b, setB] = useState(null);
  const [c, setC] = useState(null);
  const [d, setD] = useState(null);

  return (
    <div>
      <div className='safe-custody-stripe'></div>
      <div className='safe-custody-div'>
        {currentSafe === 'select' && renderSafeSelectTop()}
        {currentSafe === 'contacts' && renderSafeContactsTop()}
        {currentSafe === 'contents' && renderSafeContentsTop()}
        {currentSafe === 'recepients' && renderSafeReceiptsTop()}

        <div className='safe-custody-btns-div'>
          <button
            className={
              currentSafe === 'contacts'
                ? 'safe-custody-btns safe-custody-btns-clicked'
                : 'safe-custody-btns'
            }
            onClick={handleShowContacts}
          >
            {' '}
            Contacts
          </button>
          <br />
          <button
            className={
              currentSafe === 'contents'
                ? 'safe-custody-btns safe-custody-btns-clicked'
                : 'safe-custody-btns'
            }
            onClick={() => {
              setCurrentSafe('contents');
            }}
          >
            {' '}
            Contents
          </button>
          <br />
          <button
            className={
              currentSafe === 'recepients'
                ? 'safe-custody-btns safe-custody-btns-clicked'
                : 'safe-custody-btns'
            }
            onClick={() => {
              setCurrentSafe('recepients');
            }}
          >
            {' '}
            Receipts
          </button>
          <br />
        </div>

        {currentSafe === 'select' && renderSafeSelect()}
        {currentSafe === 'contacts' && renderSafeContacts()}
        {currentSafe === 'contents' && renderSafeContents()}
        {currentSafe === 'recepients' && renderSafeReceipts()}
      </div>
    </div>
  );
}

export default RenderSafeCustody;
