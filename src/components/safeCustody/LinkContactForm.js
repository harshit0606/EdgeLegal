import React, { useState } from 'react';
import axios from 'axios';
import closeBtn from '../../images/close-white-btn.svg';
import upArrow from '../../images/upArrow.svg';
import downArrow from '../../images/downArrow.svg';
import downArrowColoured from '../../images/downArrowColoured.svg';
import upArrowColoured from '../../images/upArrowColoured.svg';
import '../../stylesheets/LinkContactForm.css';
import url from '../../config.js';
import { useCookies } from 'react-cookie';

// const initialData = {
//   safeCustodyPacketId: '', // will make it dynamic later because now it is coming in custodyPacketContact
//   contactId: '',
//   contactRole: '',
//   contactType: '',
//   primaryContact: false,
// };

const filterFields = {
  contactCode: '',
  firstName: '',
  lastName: '',
  companyName: '',
};

const LinkContactForm = (props) => {
  const { closeForm, contactLists, safeCustodyPacketId } = props;
  const [cookies, setCookie, removeCookie] = useCookies(['token']);
  const loggedInToken = cookies.token;
  // const [formData, setFormData] = useState(initialData);
  const [selected, setSelected] = useState({});
  const [selectedIndex, setSelectedIndex] = useState('');
  const [filteredData, setFilteredData] = useState(contactLists);
  const [filterInput, setFilterInput] = useState(filterFields);
  const [sortOrder, setSortOrder] = useState('');
  const [sortField, setSortField] = useState('');
  // console.log(contactLists);

  // const handleFormChange = (e) => {
  //   const { name } = e.target;
  //   setFormData({ ...formData, [name]: e.target.value });
  // };

  const filterData = (obj) => {
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
          .includes(obj['companyName'].toLowerCase())
    );
    setFilteredData(newData);
  };

  const handleFilter = (e) => {
    const { name } = e.target;
    setFilterInput({ ...filterInput, [name]: e.target.value });
    filterData({ ...filterInput, [name]: e.target.value });
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
          return (a[field] ? a[field].toLowerCase() : '') <
            (b[field] ? b[field].toLowerCase() : '')
            ? -1
            : 1;
        } else {
          return (a[field] ? a[field].toLowerCase() : '') <
            (b[field] ? b[field].toLowerCase() : '')
            ? 1
            : -1;
        }
      });
      setFilteredData(sortedData);
    }
  };

  const handleClick = (data, ind) => {
    setSelected(data);
    setSelectedIndex(ind);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let formData = {
      safeCustodyPacketId: safeCustodyPacketId,
      contactId: selected?.contactId,
      contactType: selected.contactType,
      contactRole: selected?.role,
      primaryContact: false,
    };

    // console.log(selected);

    await axios
      .post(
        `${url}/api/safecustody/contact`,
        {
          requestId: 11223,
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
      )
      .then((res) => window.location.reload())
      .catch((e) => console.log(e));
  };

  return (
    <div className='linkContact-popup-container'>
      <div className='linkContact-popup-grid'>
        <div className='linkContact-header'>
          <h2 className='linkContact-heading'>Add Contacts</h2>
          <button onClick={closeForm} className='linkContact-close-form-btn'>
            {' '}
            <img src={closeBtn} alt='linkContact-close-btn' />
          </button>
        </div>
        <div className='linkContact-list-div'>
          <div className='linkContact-list-head'>
            <span className='linkContact-list-inputSpan'> </span>
            <div className='linkContact-list-column linkContact-list-code'>
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
              <input type='text' name='contactCode' onChange={handleFilter} />
            </div>
            <div className='linkContact-list-column linkContact-list-fName'>
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
              <input type='text' name='firstName' onChange={handleFilter} />
            </div>
            <div className='linkContact-list-column linkContact-list-lName'>
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
              <input type='text' name='lastName' onChange={handleFilter} />
            </div>
            <div className='linkContact-list-column linkContact-list-company'>
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
              <input type='text' name='companyName' onChange={handleFilter} />
            </div>
          </div>
          <div className='linkContact-list-container'>
            {filteredData?.map((contact, ind) => (
              <div className='linkContact-list' key={ind}>
                <input
                  type='checkbox'
                  checked={selectedIndex === ind}
                  className='linkContact-list-inputSpan'
                  onClick={() => handleClick(contact, ind)}
                />
                <span className='linkContact-list-code linkContact-list-values'>
                  {contact.contactCode}
                </span>
                <span className='linkContact-list-fName linkContact-list-values'>
                  {contact.firstName}
                </span>
                <span className='linkContact-list-lName linkContact-list-values'>
                  {contact.lastName}
                </span>
                <span className='linkContact-list-company linkContact-list-values'>
                  {contact.companyName}
                </span>
              </div>
            ))}
          </div>
          <div className='linkContact-buttonDiv'>
            <button className='linkContact-addButton' onClick={handleSubmit}>
              Add
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LinkContactForm;
