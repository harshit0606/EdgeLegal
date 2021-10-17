import React, { useState } from 'react';
import '../../stylesheets/property.css';
import { FiEdit2 } from 'react-icons/fi';

import EditUnRegFormPopup from './EditUnRegFormPopup';

function UnregisteredLot(props) {
  const { unregisteredLot, specifiedDetails, setBoolVal } = props;
  const [isEditTrue, setIsEditTrue] = useState(false);
  // console.log('modal', modal);

  return (
    <div>
      <div className='row'>
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
          <input value={unregisteredLot?.lot} disabled type='text' />
        </div>
        <div className='col-2'>
          <input value={unregisteredLot?.partOfLot} disabled type='text' />
        </div>
        <div className='col-1'>
          <input value={unregisteredLot?.section} disabled type='text' />
        </div>
        <div className='col-3'>
          <input value={unregisteredLot?.plan} disabled type='text' />
        </div>
        <div className='col-3'>
          <input type='text' value={unregisteredLot?.description} disabled />
        </div>
      </div>
    </div>
  );
}

export default UnregisteredLot;
