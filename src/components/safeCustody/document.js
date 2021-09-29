import React, { Fragment } from 'react';
import moment from 'moment';
import '../../stylesheets/safeCustody.css';

const Document = (props) => {
  // console.log(props?.data);
  const { data } = props;
  return (
    <Fragment>
      {data?.custodyPacketAttachments?.map((d) => (
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
            <label>{d.name ? d.name : 'name'}</label>
          </div>
          <div className='col-2'>
            <label>{d.dateReceived ? d.dateReceived : 'date'}</label>
          </div>
          <div className='col-1'>
            <label>{data.status}</label>
          </div>
          <div className='col-2'>
            <label>{moment(d.uploadDate).format('Do MMM, YYYY')}</label>
          </div>
          <div className='col-2'>
            <label>{d.uploadedBy}</label>
          </div>
          <div className='col-2'>
            <label>{d.comment ? d.comment : 'comment'}</label>
          </div>
        </div>
      ))}
    </Fragment>
  );
};

export default Document;
