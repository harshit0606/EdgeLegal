import React, { useState } from 'react';
import moment from 'moment';
import axios from 'axios';
import Dropzone from 'react-dropzone';
import closeBtn from '../../images/close-white-btn.svg';
import '../../stylesheets/AddCustodyForm.css';
import url from '../../config.js';
import { useCookies } from 'react-cookie';

const initialData = {
  name: '',
  safeCustodyPacketId: '',
  dateOfDocument: '',
  dateReceived: '',
  comments: '',
};

const AddCustodyForm = (props) => {
  const { closeForm, safeCustodyPacketId } = props;
  const [cookies, setCookie, removeCookie] = useCookies(['token']);
  const loggedInToken = cookies.token;
  const [formData, setFormData] = useState(initialData);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [fileName, setFileName] = useState('');

  const handleFormChange = (e) => {
    const { name } = e.target;
    setFormData({ ...formData, [name]: e.target.value });
  };

  const handleUploadFile = (acceptedFile) => {
    setUploadedFile(acceptedFile[0]);
    setFileName(acceptedFile[0].name);
    setFormData({
      ...formData,
      dateReceived: moment(new Date()).format('YYYY-MM-DD'),
    });
    // console.log(acceptedFile[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    var inputData = new FormData();
    if (uploadedFile) {
      const data = {
        requestId: 11223,
        data: {
          ...formData,
          name: fileName,
          safeCustodyPacketId,
        },
      };
      inputData.append('custodyAttachment', JSON.stringify(data));
      inputData.append('attachment', uploadedFile);
      try {
        const { data } = await axios.post(
          `${url}/api/safecustody/attachment`,
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
        closeForm();
        window.location.reload();
      } catch (err) {
        console.log(err);
      }
    } else {
      alert('Please upload file');
    }
  };

  return (
    <div className='addCustody-popup-container'>
      <div className='addCustody-popup-grid'>
        <div className='addCustody-header'>
          <h2 className='addCustody-heading'>Add Safe Custody Item</h2>
          <button onClick={closeForm} className='close-form-btn'>
            {' '}
            <img src={closeBtn} alt='close-btn' />
          </button>
        </div>
        <div className='addCustody-dropzone-div'>
          <Dropzone onDrop={handleUploadFile}>
            {({ getRootProps, getInputProps }) => (
              <div {...getRootProps({ className: 'addCustody-dropzone' })}>
                <input {...getInputProps()} />
                <p>Drag and drop to upload or browse for files</p>
              </div>
            )}
          </Dropzone>
          <span>{fileName}</span>
        </div>
        <div className='addCustody-datePicker'>
          <div className='date-input-div'>
            <label htmlFor='date-received'>Date Received</label>
            <input
              type='date'
              name='dateReceived'
              disabled
              value={formData.dateReceived}
              onChange={handleFormChange}
              className='date-input'
            />
          </div>
          <div className='date-input-div'>
            <label htmlFor='date-of-document'>Date of document</label>
            <input
              type='date'
              name='dateOfDocument'
              className='date-input'
              value={formData.dateOfDocument}
              onChange={handleFormChange}
            />
          </div>
        </div>
        <div className='addCustody-filename-div'>
          <label htmlFor='document-name'>Document name</label>
          <input
            type='text'
            name='name'
            className='document-name'
            value={fileName}
            onChange={handleFormChange}
          />
        </div>
        <div className='addCustody-endDiv'>
          <div className='addCustody-comment-div'>
            <label htmlFor='comments'>Comments</label>
            <textarea
              rows='4'
              cols='50'
              name='comments'
              className='comment'
              value={formData.comments}
              onChange={handleFormChange}
            />
          </div>
          <div className='addCustody-buttonDiv'>
            <button className='cancelButton' onClick={closeForm}>
              Cancel
            </button>
            <button className='addButton' onClick={handleSubmit}>
              Add
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCustodyForm;
