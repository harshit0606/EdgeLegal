import React, { useState } from 'react';
import closeBtn from '../../images/close-white-btn.svg';
import url from '../../config.js';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import '../../stylesheets/AddNewSafeCustodyForm.css';

const initialData = {
  name: '',
  contactId: '',
  contactType: '',
};

const AttachIDForm = (props) => {
  const { closeForm, details, changeBool } = props;
  const [cookies, setCookie, removeCookie] = useCookies(['token']);
  const loggedInToken = cookies.token;
  const [formData, setFormData] = useState(initialData);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [fileName, setFileName] = useState('');

  // const handleFormChange = (e) => {
  //   const { name } = e.target;
  //   setFormData({ ...formData, [name]: e.target.value });
  // };

  const handleUploadFile = (e) => {
    setUploadedFile(e.target.files[0]);
    setFileName(e.target.files[0].name);
    // console.log(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    var inputData = new FormData();
    if (uploadedFile) {
      const newData = {
        requestId: 11223,
        data: {
          ...formData,
          name: fileName,
          contactId: details.contactId,
          contactType: details.contactType,
        },
      };
      // console.log(data);
      inputData.append('custodyAttachment', JSON.stringify(newData));
      inputData.append('attachment', uploadedFile);
      try {
        const { data } = await axios.post(
          `${url}/api/contact-attachment`,
          inputData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: `Bearer ${loggedInToken}`,
            },
          },
          {
            withCredentials: true,
          }
        );
        // console.log(data);
        changeBool(false);
        closeForm();
      } catch (err) {
        console.log(err);
      }
    } else {
      alert('Please upload file');
    }
  };

  return (
    <div className='addNewCustody-popup-container'>
      <div className='addNewCustody-popup-grid'>
        <div className='addNewCustody-header'>
          <h2 className='addNewCustody-heading'>Attach ID</h2>
          <button onClick={closeForm} className='close-form-btn'>
            {' '}
            <img src={closeBtn} alt='close-btn' />
          </button>
        </div>
        <div className='addNewCustody-form-div'>
          <div>
            <input type='file' onChange={handleUploadFile} />
          </div>
        </div>
        <div className='addNewCustody-buttonDiv'>
          <button className='cancelButton' onClick={closeForm}>
            Cancel
          </button>
          <button className='addButton' onClick={handleSubmit}>
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default AttachIDForm;
