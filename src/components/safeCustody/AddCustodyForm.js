import React from 'react';
import Dropzone from 'react-dropzone';
import '../../stylesheets/AddCustodyForm.css';

const AddCustodyForm = (props) => {
  const { closeForm } = props;
  return (
    <div className='addCustody-popup-container'>
      <div className='addCustody-popup-grid'>
        <div className='addCustody-header'>
          <h2 className='addCustody-heading'>Add Safe Custody Item</h2>
          <button onClick={closeForm} className='close-form-btn'>
            {' '}
            Close
          </button>
        </div>
        <div className='addCustody-dropzone-div'>
          <Dropzone>
            {({ getRootProps, getInputProps }) => (
              <div {...getRootProps({ className: 'addCustody-dropzone' })}>
                <input {...getInputProps()} />
                <p>Drag and drop to upload or browse for files</p>
              </div>
            )}
          </Dropzone>
        </div>
        <div className='addCustody-datePicker'>
          <div className='date-input-div'>
            <label htmlFor='date-received'>Date Received</label>
            <input
              type='date'
              name='date-received'
              // value={formData.employer_extract_date}
              // onChange={handleFormChange}
              className='date-input'
            />
          </div>
          <div className='date-input-div'>
            <label htmlFor='date-received'>Date of document</label>
            <input
              type='date'
              name='date-received'
              className='date-input'
              // value={formData.employer_extract_date}
              // onChange={handleFormChange}
            />
          </div>
        </div>
        <div className='addCustody-filename-div'>
          <label htmlFor='document-name'>Document name</label>
          <input
            type='text'
            name='document-name'
            className='document-name'
            // value={formData.employer_extract_date}
            // onChange={handleFormChange}
          />
        </div>
        <div className='addCustody-endDiv'>
          <div className='addCustody-comment-div'>
            <label htmlFor='comments'>Comments</label>
            <textarea
              rows='4'
              cols='50'
              name='comment'
              className='comment'
              // value={formData.employer_extract_date}
              // onChange={handleFormChange}
            />
          </div>
          <div className='addCustody-buttonDiv'>
            <button className='cancelButton'>Cancel</button>
            <button className='addButton'>Add</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCustodyForm;
