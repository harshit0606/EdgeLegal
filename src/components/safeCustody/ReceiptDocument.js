import React, { Fragment, useState } from 'react';
import moment from 'moment';
import '../../stylesheets/safeCustody.css';

const ReceiptDocument = (props) => {
  // console.log(props?.data);
  const { data } = props;
  const [selected, setSelected] = useState('');
  // const handleContentSelect = (id) => {
  //   const selectedIndex = selectedContent.indexOf(id);
  //   let newSelected = [];
  //   if (selectedIndex === -1) {
  //     newSelected = newSelected.concat(selectedContent, id);
  //   } else if (selectedIndex === 0) {
  //     newSelected = newSelected.concat(selectedContent.slice(1));
  //   } else if (selectedIndex === selectedContent.length - 1) {
  //     newSelected = newSelected.concat(selectedContent.slice(0, -1));
  //   } else if (selectedIndex > 0) {
  //     newSelected = newSelected.concat(
  //       selectedContent.slice(0, selectedIndex),
  //       selectedContent.slice(selectedIndex + 1)
  //     );
  //   }
  //   setSelectedContent(newSelected);
  // };

  // const handleContentSelect = (id) => {
  //   if (id === selectedContent) {
  //     setSelectedContent('');
  //   } else {
  //     setSelectedContent(id);
  //   }
  // };

  // const handleSelectAllContent = (event) => {
  //   if (event.target.checked) {
  //     const newSelecteds = custodyPacket?.custodyPacketAttachments?.map(
  //       (row) => row.id
  //     );
  //     // console.log(newSelecteds);
  //     setSelectPrepare(newSelecteds);
  //     return;
  //   }
  //   setSelectPrepare([]);
  // };

  // to check whether the property is selected or not
  // const isContentSelected = (id) => selectedContent.indexOf(id) !== -1;

  return (
    <Fragment>
      {data?.custodyPacketAttachments?.map((d) => {
        if (d.dateOut !== null) {
          return (
            <div
              className='row'
              style={{
                marginTop: '2%',
                borderBottom: '1px solid lightgray',
                paddingBottom: '10px',
              }}
            >
              <div className='col-1'>
                <input
                  style={{ marginLeft: '50%' }}
                  type='checkbox'
                  checked={d.id === selected}
                  onChange={() => setSelected(d.id)}
                />
              </div>
              <div className='col-2'>
                <label>{d.name ? d.name : 'name'}</label>
              </div>
              <div className='col-2'>
                <label>
                  {d.dateReceived
                    ? moment(d.dateReceived).format('DD-MM-YYYY')
                    : 'date'}
                </label>
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
          );
        }
      })}
    </Fragment>
  );
};

export default ReceiptDocument;
