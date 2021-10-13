import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import AttachIDForm from './AttachIDForm';
import '../../stylesheets/attach.css';
import { FiDownload } from 'react-icons/fi';

const Attachid = (props) => {
  const { details, changeBool } = props;
  const [showForm, setShowForm] = useState(false);
  return (
    <div className='attach-id-main'>
      <div>
        <button className='attachid-btn' onClick={() => setShowForm(true)}>
          Add Attachment
        </button>
      </div>
      <div className='attach-main-table'>
        <div className='attach-main-table-row'>
          <div className='attach-div1'>Type</div>
          <div className='attach-div2'>Name</div>
          <div className='attach-div3'>Creation Date</div>
          <div className='attach-div4'>Uploaded By</div>
          <div className='attach-div5'>Actions</div>
          <div className='attach-div6'></div>
        </div>
        <div className='attach-table-row'>
          <div className='attach-div1'>Other</div>
          <div className='attach-div2'>something.jpg</div>
          <div className='attach-div3'>07-10-2021</div>
          <div className='attach-div4'>someone@gmail.com</div>
          <div className='attach-div5'>Actions</div>
          <div className='attach-div6'>
            <div className='download-icon-div'>
              <FiDownload />
            </div>
          </div>
        </div>
        <div className='attach-table-row'>
          <div className='attach-div1'>Other</div>
          <div className='attach-div2'>something.jpg</div>
          <div className='attach-div3'>07-10-2021</div>
          <div className='attach-div4'>someone@gmail.com</div>
          <div className='attach-div5'>Actions</div>
          <div className='attach-div6'>
            <div className='download-icon-div'>
              <FiDownload />
            </div>
          </div>
        </div>
        <div className='attach-table-row'>
          <div className='attach-div1'>Other</div>
          <div className='attach-div2'>something.jpg</div>
          <div className='attach-div3'>07-10-2021</div>
          <div className='attach-div4'>someone@gmail.com</div>
          <div className='attach-div5'>Actions</div>
          <div className='attach-div6'>
            <div className='download-icon-div'>
              <FiDownload />
            </div>
          </div>
        </div>
        {showForm && (
          <AttachIDForm
            closeForm={() => setShowForm(false)}
            details={details}
          />
        )}
      </div>
    </div>
  );
};

export default Attachid;
