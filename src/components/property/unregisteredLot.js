import React, { useState } from 'react';
import '../../stylesheets/property.css';
import { FiEdit2 } from 'react-icons/fi';

import EditUnRegFormPopup from './EditUnRegFormPopup';

function UnregisteredLot(props) {
  const { unregisteredLot, specifiedDetails, setBoolVal, index } = props;
  const [isEditTrue, setIsEditTrue] = useState(false);
  // console.log('modal', modal);

  return (
    <div style={{ paddingLeft: '10px' }}>
      <div
        className={`row ${
          index % 2 === 0 ? 'contacttdatadiv' : 'lightcontacttdatadiv'
        }`}
      >
        <div className='col-1'>
          <button
            className='editBtn'
            onClick={() => {
              setIsEditTrue(true);
            }}
          >
            <FiEdit2 />
          </button>
          {isEditTrue && (
            <EditUnRegFormPopup
              setIsEditTrue={setIsEditTrue}
              unregDetails={unregisteredLot}
              specifiedDetails={specifiedDetails}
              setBoolVal={setBoolVal}
            />
          )}
        </div>
        <div className='col-2'>
          <h6 style={{ padding: '0 15px' }}>{unregisteredLot?.lot}</h6>
          {/**<input value={unregisteredLot?.lot} disabled type='text' /> */}
        </div>
        <div className='col-2'>
          <h6 style={{ padding: '0 15px' }}>{unregisteredLot?.partOfLot}</h6>
          {/**<input value={unregisteredLot?.partOfLot} disabled type='text' /> */}
        </div>
        <div className='col-1'>
          <h6 style={{ padding: '0 15px' }}>{unregisteredLot?.section}</h6>
          {/**<input value={unregisteredLot?.section} disabled type='text' /> */}
        </div>
        <div className='col-3'>
          <h6 style={{ padding: '0 15px' }}>{unregisteredLot?.plan}</h6>
          {/**<input value={unregisteredLot?.plan} disabled type='text' /> */}
        </div>
        <div className='col-3'>
          <h6 style={{ padding: '0 15px' }}>{unregisteredLot?.description}</h6>
          {/**<input type='text' value={unregisteredLot?.description} disabled /> */}
        </div>
      </div>
    </div>
  );
}

export default UnregisteredLot;
