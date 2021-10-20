import React, { useState } from 'react';
import closeBtn from '../../images/close-white-btn.svg';
import url from '../../config.js';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import Dropzone from 'react-dropzone';
import '../../stylesheets/AddNewSafeCustodyForm.css';

const initialData = {
  name: '',
  contactId: '',
  contactType: '',
};

const AttachIDForm = (props) => {
  const { closeForm, details, handleContactAttachments } = props;
  const [cookies, setCookie, removeCookie] = useCookies(['token']);
  const loggedInToken = cookies.token;
  const [formData, setFormData] = useState(initialData);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [fileName, setFileName] = useState('');

  // const handleFormChange = (e) => {
  //   const { name } = e.target;
  //   setFormData({ ...formData, [name]: e.target.value });
  // };

  const handleUploadFile = (acceptedFile) => {
    setUploadedFile(acceptedFile[0]);
    setFileName(acceptedFile[0].name);
    // console.log(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    var inputData = new FormData();
    if (uploadedFile) {
      const newData = {
        requestId: '11223',
        data: {
          ...formData,
          name: fileName,
          contactId: details.contactId,
          contactType: details.contactType,
          // type: 'email',
          // comments: 'sample',
        },
      };
      // console.log(data);
      inputData.append('contactAttachment', JSON.stringify(newData));
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
        handleContactAttachments();
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
        <div
          className='addCustody-dropzone-div'
          style={{ textAlign: 'center' }}
        >
          <Dropzone onDrop={handleUploadFile}>
            {({ getRootProps, getInputProps }) => (
              <div {...getRootProps({ className: 'addCustody-dropzone' })}>
                <input {...getInputProps()} />
                <p style={{ paddingTop: '10px' }}>
                  Drag and drop to upload or browse for files
                </p>
                <span style={{ color: '#555', paddingTop: '10px' }}>
                  {fileName}
                </span>
              </div>
            )}
          </Dropzone>
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
