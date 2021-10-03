import React, { useState } from 'react';
import axios from 'axios';
import closeBtn from '../../images/close-white-btn.svg';
import '../../stylesheets/LinkContactForm.css';
import url from '../../config.js';
import { useCookies } from 'react-cookie';

// const initialData = {
//   safeCustodyPacketId: 1, // will make it dynamic later because now it is coming in custodyPacketContact
//   contactId: '',
//   contactRole: '',
//   contactType: '',
//   primaryContact: false,
// };

const LinkContactForm = (props) => {
  const { closeForm, contactLists, safeCustodyPacketId } = props;
  const [cookies, setCookie, removeCookie] = useCookies(['token']);
  const loggedInToken = cookies.token;
  // const [formData, setFormData] = useState(initialData);
  const [selected, setSelected] = useState({});
  const [selectedIndex, setSelectedIndex] = useState('');

  console.log(contactLists);

  // const handleFormChange = (e) => {
  //   const { name } = e.target;
  //   setFormData({ ...formData, [name]: e.target.value });
  // };

  const handleClick = (data, ind) => {
    setSelected(data);
    setSelectedIndex(ind);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let formData = {
      safeCustodyPacketId: '1',
      contactId: selected?.contactId ? selected?.contactId : 5,
      contactType: selected.contactType,
      contactRole: selected?.contactRole ? selected?.contactRole : 'client',
      primaryContact: false,
    };

    // console.log(formData);

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
            <span className='linkContact-list-code'>Code</span>
            <span className='linkContact-list-fName'>F. name</span>
            <span className='linkContact-list-lName'>L. name</span>
            <span className='linkContact-list-company'>Company name</span>
          </div>
          <div className='linkContact-list-container'>
            {contactLists?.map((contact, ind) => (
              <div className='linkContact-list' key={ind}>
                <input
                  type='checkbox'
                  checked={selectedIndex === ind}
                  className='linkContact-list-inputSpan'
                  onClick={() => handleClick(contact, ind)}
                />
                <span className='linkContact-list-code'>
                  {contact.contactCode}
                </span>
                <span className='linkContact-list-fName'>
                  {contact.firstName}
                </span>
                <span className='linkContact-list-lName'>
                  {contact.lastName}
                </span>
                <span className='linkContact-list-company'>
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
