import React, { useEffect, useState } from 'react';
import '../../stylesheets/contacts.css';

import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import axios from 'axios';
import url from '../../config.js';
import { useCookies } from 'react-cookie';
import upArrow from '../../images/upArrow.svg';
import downArrow from '../../images/downArrow.svg';
import downArrowColoured from '../../images/downArrowColoured.svg';
import upArrowColoured from '../../images/upArrowColoured.svg';

import AssociatedContacts from '../safeCustody/associatedContacts';
import ContactStripe from '../topStripes/ContactStripe';
import { Link } from 'react-router-dom';

const filterFields = {
  contactCode: '',
  firstName: '',
  lastName: '',
  companyName: '',
  contactType: '',
  emailAddress: '',
  telephoneNumber: '',
};

function Contacts() {
  const [cookies, setCookie, removeCookie] = useCookies(['token']);
  const loggedInToken = cookies.token;
  const [contactLists, setContactLists] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [filterInput, setFilterInput] = useState(filterFields);
  const [sortOrder, setSortOrder] = useState('');
  const [sortField, setSortField] = useState('');
  const [originalData, setOriginalData] = useState(false);

  useEffect(() => {
    axios
      .get(
        `${url}/api/contacts?requestId=1124455&textField=&type=`,
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
        // console.log(response.data.data);
        setContactLists(response.data.data.contactLists);
        setFilteredData(response.data.data.contactLists);
        // setSafeCustodyPackets(response.data.data.safeCustodyPackets);
      });
  }, []);

  useEffect(() => {
    if (originalData) {
      // console.log('changed');
      setFilteredData(contactLists);
      setOriginalData(false);
    }
  }, [originalData]);

  const filterData = (obj) => {
    // console.log(obj);
    const newData = contactLists.filter(
      (data) =>
        data['contactCode']
          .toLowerCase()
          .includes(obj['contactCode'].toLowerCase()) &&
        data['firstName']
          .toLowerCase()
          .includes(obj['firstName'].toLowerCase()) &&
        data['lastName']
          .toLowerCase()
          .includes(obj['lastName'].toLowerCase()) &&
        data['companyName']
          .toLowerCase()
          .includes(obj['companyName'].toLowerCase()) &&
        data['contactType']
          .toLowerCase()
          .includes(obj['contactType'].toLowerCase()) &&
        data['emailAddress']
          .toLowerCase()
          .includes(obj['emailAddress'].toLowerCase()) &&
        data['telephoneNumber']
          .toLowerCase()
          .includes(obj['telephoneNumber'].toLowerCase())
    );
    setFilteredData(newData);
  };

  const handleFilter = (e) => {
    const { name } = e.target;
    setFilterInput({ ...filterInput, [name]: e.target.value });
    filterData({ ...filterInput, [name]: e.target.value });
    // if (e.target.value === '') {
    //   setFilteredData(contactLists);
    // } else {

    // }
  };

  const handleSort = (field, order) => {
    if (sortOrder === order && sortField === field) {
      setSortOrder('');
      setSortField('');
      setOriginalData(true);
    } else {
      setSortOrder(order);
      setSortField(field);
      // console.log()
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

  return (
    <div
      style={{
        backgroundColor: 'white',
        marginLeft: '30px',
        marginRight: '30px',
        paddingBottom: '30px',
        overflow: 'hidden',
      }}
    >
      <div>
        <ContactStripe />
      </div>

      <div className='row associatedContacts'>
        <div className='col-2'>
          <label className='associatedContacts-label'>
            Contact Code
            <div className='associatedContacts-label-btn'>
              {sortOrder === 'asc' && sortField === 'contactCode' ? (
                <img
                  src={upArrowColoured}
                  alt='asc'
                  className='label-btn-img-1'
                  onClick={() => handleSort('contactCode', 'asc')}
                />
              ) : (
                <img
                  src={upArrow}
                  alt='asc'
                  className='label-btn-img-1'
                  onClick={() => handleSort('contactCode', 'asc')}
                />
              )}
              {sortOrder === 'desc' && sortField === 'contactCode' ? (
                <img
                  src={downArrowColoured}
                  alt='desc'
                  className='label-btn-img-2'
                  onClick={() => handleSort('contactCode', 'desc')}
                />
              ) : (
                <img
                  src={downArrow}
                  alt='desc'
                  className='label-btn-img-2'
                  onClick={() => handleSort('contactCode', 'desc')}
                />
              )}
            </div>
          </label>
          <input type='text' name='contactCode' onChange={handleFilter}></input>
        </div>
        <div className='col-1'>
          <label className='associatedContacts-label'>
            First Name
            <div className='associatedContacts-label-btn'>
              {sortOrder === 'asc' && sortField === 'firstName' ? (
                <img
                  src={upArrowColoured}
                  alt='asc'
                  className='label-btn-img-1'
                  onClick={() => handleSort('firstName', 'asc')}
                />
              ) : (
                <img
                  src={upArrow}
                  alt='asc'
                  className='label-btn-img-1'
                  onClick={() => handleSort('firstName', 'asc')}
                />
              )}
              {sortOrder === 'desc' && sortField === 'firstName' ? (
                <img
                  src={downArrowColoured}
                  alt='desc'
                  className='label-btn-img-2'
                  onClick={() => handleSort('firstName', 'desc')}
                />
              ) : (
                <img
                  src={downArrow}
                  alt='desc'
                  className='label-btn-img-2'
                  onClick={() => handleSort('firstName', 'desc')}
                />
              )}
            </div>
          </label>
          <input type='text' name='firstName' onChange={handleFilter}></input>
        </div>
        <div className='col-1'>
          <label className='associatedContacts-label'>
            Last Name
            <div className='associatedContacts-label-btn'>
              {sortOrder === 'asc' && sortField === 'lastName' ? (
                <img
                  src={upArrowColoured}
                  alt='asc'
                  className='label-btn-img-1'
                  onClick={() => handleSort('lastName', 'asc')}
                />
              ) : (
                <img
                  src={upArrow}
                  alt='asc'
                  className='label-btn-img-1'
                  onClick={() => handleSort('lastName', 'asc')}
                />
              )}
              {sortOrder === 'desc' && sortField === 'lastName' ? (
                <img
                  src={downArrowColoured}
                  alt='desc'
                  className='label-btn-img-2'
                  onClick={() => handleSort('lastName', 'desc')}
                />
              ) : (
                <img
                  src={downArrow}
                  alt='desc'
                  className='label-btn-img-2'
                  onClick={() => handleSort('lastName', 'desc')}
                />
              )}
            </div>
          </label>
          <input type='text' name='lastName' onChange={handleFilter}></input>
        </div>
        <div className='col-2'>
          <label className='associatedContacts-label'>
            Company
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
          <input type='text' name='companyName' onChange={handleFilter}></input>
        </div>
        <div className='col-1'>
          <label className='associatedContacts-label'>
            Type
            <div className='associatedContacts-label-btn'>
              {sortOrder === 'asc' && sortField === 'contactType' ? (
                <img
                  src={upArrowColoured}
                  alt='asc'
                  className='label-btn-img-1'
                  onClick={() => handleSort('contactType', 'asc')}
                />
              ) : (
                <img
                  src={upArrow}
                  alt='asc'
                  className='label-btn-img-1'
                  onClick={() => handleSort('contactType', 'asc')}
                />
              )}
              {sortOrder === 'desc' && sortField === 'contactType' ? (
                <img
                  src={downArrowColoured}
                  alt='desc'
                  className='label-btn-img-2'
                  onClick={() => handleSort('contactType', 'desc')}
                />
              ) : (
                <img
                  src={downArrow}
                  alt='desc'
                  className='label-btn-img-2'
                  onClick={() => handleSort('contactType', 'desc')}
                />
              )}
            </div>
          </label>
          <input type='text' name='contactType' onChange={handleFilter}></input>
        </div>
        <div className='col-2'>
          <label className='associatedContacts-label'>
            Email Address
            <div className='associatedContacts-label-btn'>
              {sortOrder === 'asc' && sortField === 'emailAddress' ? (
                <img
                  src={upArrowColoured}
                  alt='asc'
                  className='label-btn-img-1'
                  onClick={() => handleSort('emailAddress', 'asc')}
                />
              ) : (
                <img
                  src={upArrow}
                  alt='asc'
                  className='label-btn-img-1'
                  onClick={() => handleSort('emailAddress', 'asc')}
                />
              )}
              {sortOrder === 'desc' && sortField === 'emailAddress' ? (
                <img
                  src={downArrowColoured}
                  alt='desc'
                  className='label-btn-img-2'
                  onClick={() => handleSort('emailAddress', 'desc')}
                />
              ) : (
                <img
                  src={downArrow}
                  alt='desc'
                  className='label-btn-img-2'
                  onClick={() => handleSort('emailAddress', 'desc')}
                />
              )}
            </div>
          </label>
          <input
            type='text'
            name='emailAddress'
            onChange={handleFilter}
          ></input>
        </div>
        <div className='col-2'>
          <label className='associatedContacts-label'>
            Phone Number
            <div className='associatedContacts-label-btn'>
              {sortOrder === 'asc' && sortField === 'telephoneNumber' ? (
                <img
                  src={upArrowColoured}
                  alt='asc'
                  className='label-btn-img-1'
                  onClick={() => handleSort('telephoneNumber', 'asc')}
                />
              ) : (
                <img
                  src={upArrow}
                  alt='asc'
                  className='label-btn-img-1'
                  onClick={() => handleSort('telephoneNumber', 'asc')}
                />
              )}
              {sortOrder === 'desc' && sortField === 'telephoneNumber' ? (
                <img
                  src={downArrowColoured}
                  alt='desc'
                  className='label-btn-img-2'
                  onClick={() => handleSort('telephoneNumber', 'desc')}
                />
              ) : (
                <img
                  src={downArrow}
                  alt='desc'
                  className='label-btn-img-2'
                  onClick={() => handleSort('telephoneNumber', 'desc')}
                />
              )}
            </div>
          </label>
          <input
            type='text'
            name='telephoneNumber'
            onChange={handleFilter}
          ></input>
        </div>
      </div>
      <div>
        {filteredData.map((contact, index) => {
          if (index % 2 == 0)
            return (
              <div className='contacttdatadiv'>
                <div className='row'>
                  <div style={{ flex: '.5 0 0%' }}>
                    <input
                      type='checkbox'
                      style={{ marginLeft: '50%' }}
                    ></input>
                  </div>
                  <div className='col-2'>
                    <p>{contact.contactCode}</p>
                  </div>
                  <div className='col-1'>
                    <Link
                      style={{ textDecoration: 'none', color: 'black' }}
                      to='/home/singlecontact'
                    >
                      <p>{contact.firstName}</p>
                    </Link>
                  </div>
                  <div className='col-1'>
                    <Link
                      style={{ textDecoration: 'none', color: 'black' }}
                      to='/home/singlecontact'
                    >
                      <p>{contact.lastName}</p>
                    </Link>
                  </div>
                  <div className='col-2'>
                    <Link
                      style={{ textDecoration: 'none', color: 'black' }}
                      to='/home/singlecontact'
                    >
                      <p>{contact.companyName}</p>
                    </Link>
                  </div>
                  <div className='col-1'>
                    <Link
                      style={{ textDecoration: 'none', color: 'black' }}
                      to='/home/singlecontact'
                    >
                      <p>{contact.contactType}</p>
                    </Link>
                  </div>
                  <div className='col-2'>
                    <OverlayTrigger
                      key='bottom'
                      placement='bottom'
                      overlay={
                        <Tooltip id={`tooltip-bottom`}>
                          {contact.emailAddress}.
                        </Tooltip>
                      }
                    >
                      <Link
                        style={{ textDecoration: 'none', color: 'black' }}
                        to='/home/singlecontact'
                      >
                        <p>{contact.emailAddress}</p>
                      </Link>
                    </OverlayTrigger>
                  </div>
                  <div className='col-2'>
                    <Link
                      style={{ textDecoration: 'none', color: 'black' }}
                      to='/home/singlecontact'
                    >
                      <p>{contact.telephoneNumber}</p>
                    </Link>
                  </div>
                </div>
              </div>
            );
          else {
            return (
              <div className='lightcontacttdatadiv'>
                <div className='row'>
                  <div style={{ flex: '.5 0 0%' }}>
                    <input
                      type='checkbox'
                      style={{ marginLeft: '50%' }}
                    ></input>
                  </div>
                  <div className='col-2'>
                    <Link
                      style={{ textDecoration: 'none', color: 'black' }}
                      to='/home/singlecontact'
                    >
                      <p>{contact.contactCode}</p>
                    </Link>
                  </div>
                  <div className='col-1'>
                    <Link
                      style={{ textDecoration: 'none', color: 'black' }}
                      to='/home/singlecontact'
                    >
                      <p>{contact.firstName}</p>
                    </Link>
                  </div>
                  <div className='col-1'>
                    <Link
                      style={{ textDecoration: 'none', color: 'black' }}
                      to='/home/singlecontact'
                    >
                      <p>{contact.lastName}</p>
                    </Link>
                  </div>
                  <div className='col-2'>
                    <Link
                      style={{ textDecoration: 'none', color: 'black' }}
                      to='/home/singlecontact'
                    >
                      <p>{contact.companyName}</p>
                    </Link>
                  </div>
                  <div className='col-1'>
                    <Link
                      style={{ textDecoration: 'none', color: 'black' }}
                      to='/home/singlecontact'
                    >
                      <p>{contact.contactType}</p>
                    </Link>
                  </div>
                  <div className='col-2'>
                    <OverlayTrigger
                      key='bottom'
                      placement='bottom'
                      overlay={
                        <Tooltip id={`tooltip-bottom`}>
                          {contact.emailAddress}.
                        </Tooltip>
                      }
                    >
                      <Link
                        style={{ textDecoration: 'none', color: 'black' }}
                        to='/home/singlecontact'
                      >
                        {' '}
                        <p>{contact.emailAddress}</p>
                      </Link>
                    </OverlayTrigger>
                  </div>
                  <div className='col-2'>
                    <Link
                      style={{ textDecoration: 'none', color: 'black' }}
                      to='/home/singlecontact'
                    >
                      <p>{contact.telephoneNumber}</p>
                    </Link>
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

export default Contacts;
