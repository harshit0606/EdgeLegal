import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../stylesheets/safeCustody.css';
import url from '../../config.js';
import Document from './document.js';
import AddCustodyForm from './AddCustodyForm';
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

import upArrow from '../../images/upArrow.svg';
import downArrow from '../../images/downArrow.svg';
import downArrowColoured from '../../images/downArrowColoured.svg';
import upArrowColoured from '../../images/upArrowColoured.svg';

import SafeStripe from '../topStripes/SafeStripe';
import { Link } from 'react-router-dom';

function AllSafeCustody() {
  const [cookies, setCookie, removeCookie] = useCookies(['token']);
  const loggedInToken = cookies.token;
  const [currentSafe, setCurrentSafe] = useState('select');
  const [safeCustodyPackets, setSafeCustodyPackets] = useState(null);
  const [custodyPacketContacts, setCustodyPacketContacts] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [safeCustodyStatus, setSafeCustodyStatus] = useState(null);
  const [isAddCustodyOpen, setIsAddCustoduOpen] = useState(false);
  const [sortOrder, setSortOrder] = useState('');
  const [sortField, setSortField] = useState('');

  useEffect(() => {
    axios
      .get(
        `${url}/api/safecustody?requestId=1124455&status=ALL`,
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
        console.log(response.data?.data?.safeCustodyPackets);
        setSafeCustodyPackets(response.data?.data?.safeCustodyPackets);
      });
  }, []);

  const handleAddCustody = () => {
    setIsAddCustoduOpen(true);
    console.log('add');
  };

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
        console.log(response.data?.data?.safeCustodyPackets);
        setSafeCustodyPackets(response.data?.data?.safeCustodyPackets);
      });
  }

  function renderSafeSelectTop() {
    return (
      <div>
        <div>
          <SafeStripe addCustody={handleAddCustody} />
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
        {isAddCustodyOpen && (
          <AddCustodyForm closeForm={() => setIsAddCustoduOpen(false)} />
        )}
      </div>
    );
  }

  const filterData = (prop, val) => {
    const newData = custodyPacketContacts.filter((data) =>
      data.contactDetails[prop].includes(val)
    );
    setFilteredData(newData);
  };

  // const filterDataByType = (prop, val) => {
  //   const newData = custodyPacketContacts.filter((data) => data[prop].includes(val));
  //   setFilteredData(newData);
  // };

  const handleFilter = (e) => {
    const { name } = e.target;
    // setFormData({ ...formData, [name]: e.target.value });
    // if(name==='contactType'){
    //   filterDataByType(name, e.target.value);
    // }

    if (e.target.value === '') {
      setFilteredData(custodyPacketContacts);
    } else {
      filterData(name, e.target.value);
    }
  };

  const handleSort = (field, order) => {
    if (sortOrder === order && sortField === field) {
      setSortOrder('');
      setSortField('');
      setFilteredData(custodyPacketContacts);
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

  function renderSafeSelect() {
    return (
      <div>
        <div className='row safeSelectHeads'>
          <div className='col-2'>
            <label className='associatedContacts-label'>
              Location
              <div className='associatedContacts-label-btn'>
                {sortOrder === 'asc' && sortField === 'siteName' ? (
                  <img
                    src={upArrowColoured}
                    alt='asc'
                    className='label-btn-img-1'
                    onClick={() => handleSort('siteName', 'asc')}
                  />
                ) : (
                  <img
                    src={upArrow}
                    alt='asc'
                    className='label-btn-img-1'
                    onClick={() => handleSort('siteName', 'asc')}
                  />
                )}
                {sortOrder === 'desc' && sortField === 'siteName' ? (
                  <img
                    src={downArrowColoured}
                    alt='desc'
                    className='label-btn-img-2'
                    onClick={() => handleSort('siteName', 'desc')}
                  />
                ) : (
                  <img
                    src={downArrow}
                    alt='desc'
                    className='label-btn-img-2'
                    onClick={() => handleSort('siteName', 'desc')}
                  />
                )}
              </div>
            </label>
            <input type='text'></input>
          </div>
          <div className='col-2'>
            <label className='associatedContacts-label'>
              Packet No.
              <div className='associatedContacts-label-btn'>
                {sortOrder === 'asc' && sortField === 'packetNumber' ? (
                  <img
                    src={upArrowColoured}
                    alt='asc'
                    className='label-btn-img-1'
                    onClick={() => handleSort('packetNumber', 'asc')}
                  />
                ) : (
                  <img
                    src={upArrow}
                    alt='asc'
                    className='label-btn-img-1'
                    onClick={() => handleSort('packetNumber', 'asc')}
                  />
                )}
                {sortOrder === 'desc' && sortField === 'packetNumber' ? (
                  <img
                    src={downArrowColoured}
                    alt='desc'
                    className='label-btn-img-2'
                    onClick={() => handleSort('packetNumber', 'desc')}
                  />
                ) : (
                  <img
                    src={downArrow}
                    alt='desc'
                    className='label-btn-img-2'
                    onClick={() => handleSort('packetNumber', 'desc')}
                  />
                )}
              </div>
            </label>
            <input type='text'></input>
          </div>
          <div className='col-2'>
            <label className='associatedContacts-label'>
              Contacts
              <div className='associatedContacts-label-btn'>
                {sortOrder === 'asc' && sortField === 'companyName' ? (
                  <img
                    src={upArrowColoured}
                    alt='asc'
                    className='label-btn-img-1'
                    onClick={() => handleSort('companyName', 'asc')}
                  />
                ) : (
                  <img
                    src={upArrow}
                    alt='asc'
                    className='label-btn-img-1'
                    onClick={() => handleSort('companyName', 'asc')}
                  />
                )}
                {sortOrder === 'desc' && sortField === 'companyName' ? (
                  <img
                    src={downArrowColoured}
                    alt='desc'
                    className='label-btn-img-2'
                    onClick={() => handleSort('companyName', 'desc')}
                  />
                ) : (
                  <img
                    src={downArrow}
                    alt='desc'
                    className='label-btn-img-2'
                    onClick={() => handleSort('companyName', 'desc')}
                  />
                )}
              </div>
            </label>
            <input type='text'></input>
          </div>
          <div className='col-2'>
            <label className='associatedContacts-label'>
              Status
              <div className='associatedContacts-label-btn'>
                {sortOrder === 'asc' && sortField === 'status' ? (
                  <img
                    src={upArrowColoured}
                    alt='asc'
                    className='label-btn-img-1'
                    onClick={() => handleSort('status', 'asc')}
                  />
                ) : (
                  <img
                    src={upArrow}
                    alt='asc'
                    className='label-btn-img-1'
                    onClick={() => handleSort('status', 'asc')}
                  />
                )}
                {sortOrder === 'desc' && sortField === 'status' ? (
                  <img
                    src={downArrowColoured}
                    alt='desc'
                    className='label-btn-img-2'
                    onClick={() => handleSort('status', 'desc')}
                  />
                ) : (
                  <img
                    src={downArrow}
                    alt='desc'
                    className='label-btn-img-2'
                    onClick={() => handleSort('status', 'desc')}
                  />
                )}
              </div>
            </label>
            <input type='text'></input>
          </div>
          <div className='col-3'>
            <label className='associatedContacts-label'>
              Comment
              <div className='associatedContacts-label-btn'>
                {sortOrder === 'asc' && sortField === 'comment' ? (
                  <img
                    src={upArrowColoured}
                    alt='asc'
                    className='label-btn-img-1'
                    onClick={() => handleSort('comment', 'asc')}
                  />
                ) : (
                  <img
                    src={upArrow}
                    alt='asc'
                    className='label-btn-img-1'
                    onClick={() => handleSort('comment', 'asc')}
                  />
                )}
                {sortOrder === 'desc' && sortField === 'comment' ? (
                  <img
                    src={downArrowColoured}
                    alt='desc'
                    className='label-btn-img-2'
                    onClick={() => handleSort('comment', 'desc')}
                  />
                ) : (
                  <img
                    src={downArrow}
                    alt='desc'
                    className='label-btn-img-2'
                    onClick={() => handleSort('comment', 'desc')}
                  />
                )}
              </div>
            </label>
            <input type='text'></input>
          </div>
        </div>
        <div>
          {safeCustodyPackets?.map((packet, index) => {
            if (index % 2 == 0)
              return (
                <Link
                  style={{ textDecoration: 'none' }}
                  to={`/home/safecustody/${packet.id}`}
                >
                  <div className='contacttdatadiv'>
                    <div className='row '>
                      <div className='col-1'>
                        <input style={{ marginLeft: '20px' }} type='checkbox' />
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
                </Link>
              );
            else {
              return (
                <Link
                  style={{ textDecoration: 'none' }}
                  to={`/home/safecustody/${packet.id}`}
                >
                  <div className='lightcontacttdatadiv'>
                    <div className='row '>
                      <div className='col-1'>
                        <input style={{ marginLeft: '20px' }} type='checkbox' />
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
                </Link>
              );
            }
          })}
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className='safe-custody-stripe'></div>
      <div className='safe-custody-div'>
        {currentSafe === 'select' && renderSafeSelectTop()}

        {currentSafe === 'select' && renderSafeSelect()}
      </div>
    </div>
  );
}

export default AllSafeCustody;
