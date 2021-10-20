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
import ContactStripe from '../topStripes/ContactStripe';
import closeBtn from '../../images/close-white-btn.svg';
import LoadingPage from '../../utils/LoadingPage';
import { Link } from 'react-router-dom';

const filterFields = {
  contactCode: '',
  firstName: '',
  lastName: '',
  companyName: '',
  role: '',
  emailAddress: '',
  telephoneNumber: '',
};

const ConfirmationPopup = (props) => {
  const { ids, types, closeForm, loggedInToken, setBoolVal } = props;
  const contactIds = ids.join(',');
  const contactTypes = types.join(',');

  // console.log(contactIds);
  // console.log(contactTypes);

  const handleDeleteContact = async () => {
    await axios
      .delete(
        `${url}/api/contacts/${contactIds}?requestId=111223&type=${contactTypes}`,
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
      .then((res) => {
        setBoolVal(false);
        closeForm();
        // window.location.reload()
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className='confirmation-popup-container'>
      <div className='confirmation-popup-grid'>
        <div className='confirmation-header'>
          <h2 className='confirmation-heading'>Confirm Your Action</h2>
          <button className='close-form-btn' onClick={closeForm}>
            {' '}
            <img src={closeBtn} alt='close-btn' />
          </button>
        </div>
        <div className='confirmation-para'>
          <p>Are you sure you want to delete the record?</p>
        </div>
        <div className='confirmation-buttonDiv'>
          <button className='cancelButton' onClick={closeForm}>
            No
          </button>
          <button className='addButton' onClick={handleDeleteContact}>
            Yes
          </button>
        </div>
      </div>
    </div>
  );
};

function Contacts() {
  const [cookies, setCookie, removeCookie] = useCookies(['token']);
  const loggedInToken = cookies.token;
  const [contactLists, setContactLists] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [filterInput, setFilterInput] = useState(filterFields);
  const [sortOrder, setSortOrder] = useState('');
  const [sortField, setSortField] = useState('');
  const [selectedContactType, setSelectedContactType] = useState([]);
  const [selectedContactId, setSelectedContactId] = useState([]);
  const [selectedContactInd, setSelectedContactInd] = useState([]);
  const [boolVal, setBoolVal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [confirmScreen, setConfirmScreen] = useState(false);

  useEffect(() => {
    if (!boolVal) {
      setIsLoading(true);
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
          setIsLoading(false);
          setBoolVal(true);
          // setSafeCustodyPackets(response.data.data.safeCustodyPackets);
        })
        .catch((err) => {
          console.log(err);
          setIsLoading(false);
        });
    }
  }, [boolVal, loggedInToken]);

  const filterData = (obj) => {
    // console.log(contactLists);
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
        (data['role']
          ? data['role'].toLowerCase().includes(obj['role'].toLowerCase())
          : true) &&
        (data['emailAddress']
          ? data['emailAddress']
              .toLowerCase()
              .includes(obj['emailAddress'].toLowerCase())
          : true) &&
        (data['telephoneNumber']
          ? data['telephoneNumber']
              .toLowerCase()
              .includes(obj['telephoneNumber'].toLowerCase())
          : true)
    );
    setFilteredData(newData);
    // console.log(obj);
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
      setSortOrder(order);
      setSortField(field);
    } else {
      setSortOrder(order);
      setSortField(field);
      // console.log()
      let sortedData = filteredData.sort((a, b) => {
        if (order === 'asc') {
          return a[field].toLowerCase() < b[field].toLowerCase() ? -1 : 1;
        } else {
          return a[field].toLowerCase() < b[field].toLowerCase() ? 1 : -1;
        }
      });
      setFilteredData(sortedData);
    }
  };

  const handleSelectContact = (data, index) => {
    const selectedIndex = selectedContactInd.indexOf(index);
    let newSelectedId = [];
    let newSelectedContactType = [];
    let newSelectedInd = [];

    if (selectedIndex === -1) {
      newSelectedInd = newSelectedInd.concat(selectedContactInd, index);
      newSelectedId = newSelectedId.concat(selectedContactId, data.contactId);
      newSelectedContactType = newSelectedContactType.concat(
        selectedContactType,
        data.contactType
      );
    } else if (selectedIndex === 0) {
      newSelectedInd = newSelectedInd.concat(selectedContactInd.slice(1));
      newSelectedId = newSelectedId.concat(selectedContactId.slice(1));
      newSelectedContactType = newSelectedContactType.concat(
        selectedContactType.slice(1)
      );
    } else if (selectedIndex === selectedContactId.length - 1) {
      newSelectedInd = newSelectedInd.concat(selectedContactInd.slice(0, -1));
      newSelectedId = newSelectedId.concat(selectedContactId.slice(0, -1));
      newSelectedContactType = newSelectedContactType.concat(
        selectedContactType.slice(0, -1)
      );
    } else if (selectedIndex > 0) {
      newSelectedInd = newSelectedInd.concat(
        selectedContactInd.slice(0, selectedIndex),
        selectedContactInd.slice(selectedIndex + 1)
      );
      newSelectedId = newSelectedId.concat(
        selectedContactId.slice(0, selectedIndex),
        selectedContactId.slice(selectedIndex + 1)
      );
      newSelectedContactType = newSelectedContactType.concat(
        selectedContactType.slice(0, selectedIndex),
        selectedContactType.slice(selectedIndex + 1)
      );
    }
    setSelectedContactInd(newSelectedInd);
    setSelectedContactId(newSelectedId);
    setSelectedContactType(newSelectedContactType);
    // console.log(data);
  };

  const handleSelectAllContact = (event) => {
    if (event.target.checked) {
      const newSelectedInd = filteredData?.map((row, index) => index);
      const newSelectedId = filteredData?.map((row) => row.contactId);
      const newSelectedContactType = filteredData?.map(
        (row) => row.contactType
      );
      // console.log('new select id', newSelectedId);
      // console.log('new select', newSelectedContactType);
      setSelectedContactInd(newSelectedInd);
      setSelectedContactId(newSelectedId);
      setSelectedContactType(newSelectedContactType);
      return;
    }
    setSelectedContactInd([]);
    setSelectedContactId([]);
    setSelectedContactType([]);
  };

  const isContactSelected = (ind) => selectedContactInd.indexOf(ind) !== -1;

  const handleDeleteSeletedContact = () => {
    if (selectedContactInd.length !== 0) {
      setConfirmScreen(true);
    } else {
      alert(
        'One or more contacts need to be selected before you can Delete contacts'
      );
    }
  };

  const handleSetInitial = () => {
    setSelectedContactInd([]);
    setSelectedContactId([]);
    setSelectedContactType([]);
  };

  return (
    <div
      style={{
        backgroundColor: 'white',
        // marginLeft: '20px',
        // marginRight: '20px',
        paddingBottom: '20px',
        overflow: 'hidden',
      }}
    >
      <div>
        <ContactStripe handleDelete={handleDeleteSeletedContact} />
      </div>

      <div className='row associatedContacts'>
        <div style={{ flex: '.5 0 0%' }}>
          <input
            type='checkbox'
            onChange={handleSelectAllContact}
            checked={
              filteredData.length > 0 &&
              selectedContactInd.length === filteredData.length
            }
          ></input>
        </div>
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
            F. Name
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
            L. Name
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
            Role
            <div className='associatedContacts-label-btn'>
              {sortOrder === 'asc' && sortField === 'role' ? (
                <img
                  src={upArrowColoured}
                  alt='asc'
                  className='label-btn-img-1'
                  onClick={() => handleSort('role', 'asc')}
                />
              ) : (
                <img
                  src={upArrow}
                  alt='asc'
                  className='label-btn-img-1'
                  onClick={() => handleSort('role', 'asc')}
                />
              )}
              {sortOrder === 'desc' && sortField === 'role' ? (
                <img
                  src={downArrowColoured}
                  alt='desc'
                  className='label-btn-img-2'
                  onClick={() => handleSort('role', 'desc')}
                />
              ) : (
                <img
                  src={downArrow}
                  alt='desc'
                  className='label-btn-img-2'
                  onClick={() => handleSort('role', 'desc')}
                />
              )}
            </div>
          </label>
          <input type='text' name='role' onChange={handleFilter}></input>
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
              <div className='contacttdatadiv' key={index}>
                <div className='row'>
                  <div style={{ flex: '.5 0 0%' }}>
                    <input
                      type='checkbox'
                      style={{ marginLeft: '50%' }}
                      onChange={() => handleSelectContact(contact, index)}
                      checked={isContactSelected(index)}
                    ></input>
                  </div>
                  <div className='col-2'>
                    <Link
                      style={{ textDecoration: 'none', color: 'black' }}
                      to={{
                        pathname: '/home/singlecontact',
                        aboutProps: contact,
                      }}
                    >
                      <p>{contact.contactCode}</p>
                    </Link>
                  </div>
                  <div className='col-1'>
                    <Link
                      style={{ textDecoration: 'none', color: 'black' }}
                      to={{
                        pathname: '/home/singlecontact',
                        aboutProps: contact,
                      }}
                    >
                      <p>{contact.firstName}</p>
                    </Link>
                  </div>
                  <div className='col-1'>
                    <Link
                      style={{ textDecoration: 'none', color: 'black' }}
                      to={{
                        pathname: '/home/singlecontact',
                        aboutProps: contact,
                      }}
                    >
                      <p>{contact.lastName}</p>
                    </Link>
                  </div>
                  <div className='col-2'>
                    <Link
                      style={{ textDecoration: 'none', color: 'black' }}
                      to={{
                        pathname: '/home/singlecontact',
                        aboutProps: contact,
                      }}
                    >
                      <p>{contact.companyName}</p>
                    </Link>
                  </div>
                  <div className='col-1'>
                    <Link
                      style={{ textDecoration: 'none', color: 'black' }}
                      to={{
                        pathname: '/home/singlecontact',
                        aboutProps: contact,
                      }}
                    >
                      <p>
                        {contact.role
                          ? `${contact.role.substring(0, 9)}...`
                          : ''}
                      </p>
                    </Link>
                  </div>
                  <div className='col-2'>
                    <OverlayTrigger
                      key='bottom'
                      placement='bottom'
                      overlay={
                        <Tooltip id={`tooltip-bottom`}>
                          {contact.emailAddress}
                        </Tooltip>
                      }
                    >
                      <Link
                        style={{ textDecoration: 'none', color: 'black' }}
                        to={{
                          pathname: '/home/singlecontact',
                          aboutProps: contact,
                        }}
                      >
                        <p style={{ textAlign: 'center', paddingLeft: '8px' }}>
                          {contact.emailAddress}
                        </p>
                      </Link>
                    </OverlayTrigger>
                  </div>
                  <div className='col-2'>
                    <Link
                      style={{ textDecoration: 'none', color: 'black' }}
                      to={{
                        pathname: '/home/singlecontact',
                        aboutProps: contact,
                      }}
                    >
                      <p style={{ textAlign: 'center' }}>
                        {contact.telephoneNumber}
                      </p>
                    </Link>
                  </div>
                </div>
              </div>
            );
          else {
            return (
              <div className='lightcontacttdatadiv' key={index}>
                <div className='row'>
                  <div style={{ flex: '.5 0 0%' }}>
                    <input
                      type='checkbox'
                      style={{ marginLeft: '50%' }}
                      onChange={() => handleSelectContact(contact, index)}
                      checked={isContactSelected(index)}
                    ></input>
                  </div>
                  <div className='col-2'>
                    <Link
                      style={{ textDecoration: 'none', color: 'black' }}
                      to={{
                        pathname: '/home/singlecontact',
                        aboutProps: contact,
                      }}
                    >
                      <p>{contact.contactCode}</p>
                    </Link>
                  </div>
                  <div className='col-1'>
                    <Link
                      style={{ textDecoration: 'none', color: 'black' }}
                      to={{
                        pathname: '/home/singlecontact',
                        aboutProps: contact,
                      }}
                    >
                      <p>{contact.firstName}</p>
                    </Link>
                  </div>
                  <div className='col-1'>
                    <Link
                      style={{ textDecoration: 'none', color: 'black' }}
                      to={{
                        pathname: '/home/singlecontact',
                        aboutProps: contact,
                      }}
                    >
                      <p>{contact.lastName}</p>
                    </Link>
                  </div>
                  <div className='col-2'>
                    <Link
                      style={{ textDecoration: 'none', color: 'black' }}
                      to={{
                        pathname: '/home/singlecontact',
                        aboutProps: contact,
                      }}
                    >
                      <p>{contact.companyName}</p>
                    </Link>
                  </div>
                  <div className='col-1'>
                    <Link
                      style={{ textDecoration: 'none', color: 'black' }}
                      to={{
                        pathname: '/home/singlecontact',
                        aboutProps: contact,
                      }}
                    >
                      <p>
                        {contact.role
                          ? `${contact.role.substring(0, 9)}...`
                          : ''}
                      </p>
                    </Link>
                  </div>
                  <div className='col-2'>
                    <OverlayTrigger
                      key='bottom'
                      placement='bottom'
                      overlay={
                        <Tooltip id={`tooltip-bottom`}>
                          {contact.emailAddress}
                        </Tooltip>
                      }
                    >
                      <Link
                        style={{ textDecoration: 'none', color: 'black' }}
                        to={{
                          pathname: '/home/singlecontact',
                          aboutProps: contact,
                        }}
                      >
                        {' '}
                        <p style={{ textAlign: 'center', paddingLeft: '8px' }}>
                          {contact.emailAddress}
                        </p>
                      </Link>
                    </OverlayTrigger>
                  </div>
                  <div className='col-2'>
                    <Link
                      style={{ textDecoration: 'none', color: 'black' }}
                      to={{
                        pathname: '/home/singlecontact',
                        aboutProps: contact,
                      }}
                    >
                      <p style={{ textAlign: 'center' }}>
                        {contact.telephoneNumber}
                      </p>
                    </Link>
                  </div>
                </div>
              </div>
            );
          }
        })}
      </div>
      {confirmScreen && (
        <ConfirmationPopup
          closeForm={() => setConfirmScreen(false)}
          loggedInToken={loggedInToken}
          setBoolVal={setBoolVal}
          ids={selectedContactId}
          types={selectedContactType}
          setAllInitial={handleSetInitial}
        />
      )}
      {isLoading && <LoadingPage />}
    </div>
  );
}

export default Contacts;
