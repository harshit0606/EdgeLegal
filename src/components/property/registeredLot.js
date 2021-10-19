import React, { useState } from 'react';
import '../../stylesheets/property.css';

import { FiEdit2 } from 'react-icons/fi';
import EditRegFormPopup from './EditRegFormPopup';

function RegisteredLot(props) {
  const { registeredLot, idx, specifiedDetails, setBoolVal } = props;
  const [selectedLot, setSelectedLot] = useState([]);
  const [isEditTrue, setIsEditTrue] = useState(false);
  return (
    <div style={{ paddingLeft: '10px' }}>
      <div
        className={`row ${
          idx % 2 === 0 ? 'contacttdatadiv' : 'lightcontacttdatadiv'
        }`}
      >
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
              specifiedDetails={specifiedDetails}
              setBoolVal={setBoolVal}
            />
          )}
        </div>
        <div className='col-2'>
          <h6 style={{ padding: '0 15px' }}>{registeredLot?.titleReference}</h6>
          {/**<input value={registeredLot?.titleReference} disabled type='text' /> */}
        </div>
        <div className='col-1'>
          <h6 style={{ padding: '0 15px' }}>{registeredLot?.lotNumber}</h6>
          {/**<input value={registeredLot?.lotNumber} disabled type='text' /> */}
        </div>
        <div className='col-1'>
          <h6 style={{ padding: '0 15px' }}>{registeredLot?.section}</h6>
          {/**<input value={registeredLot?.section} disabled type='text' /> */}
        </div>
        <div className='col-3'>
          <h6 style={{ padding: '0 15px' }}>
            {registeredLot?.depositedPlanNumber}
          </h6>
          {/**<input
             value={registeredLot?.depositedPlanNumber}
             disabled
             type='text'
           /> */}
        </div>
        <div className='col-2'>
          <h6 style={{ padding: '0 15px' }}>
            {registeredLot?.strataPlanNumber}
          </h6>
          {/**<input disabled value={registeredLot?.strataPlanNumber} type='text' /> */}
        </div>
        <div className='col-2'>
          <h6 style={{ padding: '0 15px' }}>{registeredLot?.description}</h6>
          {/**<input disabled type='text' value={registeredLot?.description} /> */}
        </div>
      </div>
    </div>
  );
}

export default RegisteredLot;
