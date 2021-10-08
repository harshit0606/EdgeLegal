import React, { useState } from 'react';
import moment from 'moment';
import axios from 'axios';
import Dropzone from 'react-dropzone';
import closeBtn from '../../images/close-white-btn.svg';
import '../../stylesheets/AddNewSafeCustodyForm.css';
import url from '../../config.js';
import { useCookies } from 'react-cookie';

const initialData = {
  name: '',
  safeCustodyPacketId: 1, // will make it dynamic later because now it is coming in custodyPacketContact
  dateOfDocument: '',
  dateReceived: '',
  comments: '',
};

const AddNewSafeCustodyForm = (props) => {
  const { closeForm } = props;
  const [cookies, setCookie, removeCookie] = useCookies(['token']);
  const loggedInToken = cookies.token;
  const [formData, setFormData] = useState(initialData);
  // const [uploadedFile, setUploadedFile] = useState(null);
  // const [fileName, setFileName] = useState('');

  const handleFormChange = (e) => {
    const { name } = e.target;
    setFormData({ ...formData, [name]: e.target.value });
  };

  // const handleUploadFile = (acceptedFile) => {
  //   setUploadedFile(acceptedFile[0]);
  //   setFileName(acceptedFile[0].name);
  //   setFormData({
  //     ...formData,
  //     dateReceived: moment(new Date()).format('YYYY-MM-DD'),
  //   });
  //   // console.log(acceptedFile[0]);
  // };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   var inputData = new FormData();
  //   if (uploadedFile) {
  //     const data = {
  //       requestId: 11223,
  //       data: {
  //         ...formData,
  //       },
  //     };
  //     inputData.append('custodyAttachment', data);
  //     inputData.append('attachment', uploadedFile);
  //     try {
  //       const { data } = await axios.post(
  //         `${url}/api/safecustody/attachment`,
  //         inputData,
  //         {
  //           headers: {
  //             'Content-Type': 'multipart/form-data',
  //             Authorization: `Bearer ${loggedInToken}`,
  //           },
  //         },
  //         {
  //           withCredentials: true,
  //         }
  //       );
  //       // console.log(data);
  //       setFormData(initialData);
  //       setUploadedFile(null);
  //       setFileName('');
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   } else {
  //     alert('Please upload file');
  //   }
  // };

  return (
    <div className='addNewCustody-popup-container'>
      <div className='addNewCustody-popup-grid'>
        <div className='addNewCustody-header'>
          <h2 className='addNewCustody-heading'>Add Safe Custody Item</h2>
          <button onClick={closeForm} className='close-form-btn'>
            {' '}
            <img src={closeBtn} alt='close-btn' />
          </button>
        </div>
        <div className='addNewCustody-form-div'>
          <div className='addNewCustody-input-div'>
            <input placeholder='Location' type='text' name='siteName'/>
            <input placeholder='Packet No.' type='text' name='packetNumber'/>
            
          </div>
          <div className='addNewCustody-input-div'>
            <input placeholder='Contacts' type='text' name='companyName'/>
            <input placeholder='Status' type='text' name='status'/>
          </div>
          <div className='addNewCustody-input-div'>
            <textArea className='addNewCustody-textArea' placeholder='Comment' name='comment' rows='3' cols='20'/>
          </div>
        </div>
        <div className='addNewCustody-buttonDiv'>
            <button className='cancelButton' onClick={closeForm}>
              Cancel
            </button>
            <button className='addButton' >
              Add
            </button>
          </div>
      </div>
    </div>
  );
};

export default AddNewSafeCustodyForm;
