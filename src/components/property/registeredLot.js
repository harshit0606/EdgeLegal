import React, { useState } from 'react';
import '../../stylesheets/property.css';

import { FiEdit2 } from 'react-icons/fi';
import EditRegFormPopup from './EditRegFormPopup';

function RegisteredLot(props) {
  const { registeredLot, idx } = props;
  const [selectedLot, setSelectedLot] = useState([]);
  const [isEditTrue, setIsEditTrue] = useState(false);
  return (
    <div>
      <div className='row'>
        <div className='col-1'>
          <button
            id={idx}
            className='editBtn'
            onClick={() => {
              // setSelectedLot(registeredLot);
              // console.log('i got clicked');
              setIsEditTrue(true);
            }}
          >
            <FiEdit2 />
          </button>
          {isEditTrue && (
            <EditRegFormPopup
              setIsEditTrue={setIsEditTrue}
              regDetails={registeredLot}
            />
          )}
        </div>
        <div className='col-2'>
          <input value={registeredLot?.titleReference} disabled type='text' />
        </div>
        <div className='col-1'>
          <input value={registeredLot?.lotNumber} disabled type='text' />
        </div>
        <div className='col-1'>
          <input value={registeredLot?.section} disabled type='text' />
        </div>
        <div className='col-3'>
          <input
            value={registeredLot?.depositedPlanNumber}
            disabled
            type='text'
          />
        </div>
        <div className='col-2'>
          <input disabled value={registeredLot?.strataPlanNumber} type='text' />
        </div>
        <div className='col-2'>
          <input disabled type='text' />
        </div>
      </div>
    </div>
  );
}

export default RegisteredLot;
