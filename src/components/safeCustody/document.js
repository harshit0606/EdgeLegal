import React, { Fragment } from 'react';
import '../../stylesheets/safeCustody.css';

const Document = (props) => {
  console.log(props?.reciepts);
  const { reciepts } = props;
  return (
    <Fragment>
      {reciepts.map((reciept) => (
        <div
          className='row'
          style={{
            marginTop: '2%',
            borderBottom: '1px solid lightgray',
            paddingBottom: '10px',
          }}
        >
          <div className='col-1'>
            <input style={{ marginLeft: '50%' }} type='checkbox' />
          </div>
          <div className='col-2'>
            <label>Document Name</label>
          </div>
          <div className='col-2'>
            <label>Date Received</label>
          </div>
          <div className='col-1'>
            <label>Status</label>
          </div>
          <div className='col-2'>
            <label>Data Uplifted</label>
          </div>
          <div className='col-2'>
            <label>Uplifted By</label>
          </div>
          <div className='col-2'>
            <label>Comments</label>
          </div>
        </div>
      ))}
    </Fragment>
  );
};

export default Document;
