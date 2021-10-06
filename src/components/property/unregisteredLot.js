import react from 'react';
import styles from '../../stylesheets/property.css';
import { FiEdit2 } from 'react-icons/fi';
import PopupFormR from './popupformR.js';
import PopupFormUnR from './popupformUnR.js';

function UnregisteredLot(props) {
  const { modal, unregisteredLot, lotType, isEditTrue, setIsEditTrue } = props;
  // console.log('modal', modal);

  return (
    <div>
      <div className='row'>
        <div className='col-1'>
          <button
            className='editBtn'
            data-bs-toggle='modal'
            data-bs-target={`#staticBackdrop${modal}`}
            onClick={() => {
              setIsEditTrue(true);
            }}
          >
            <FiEdit2 />
          </button>
          <PopupFormUnR modalId={modal} addBtn={0} isEditTrue={isEditTrue} />
        </div>
        <div className='col-2'>
          <input value={unregisteredLot?.lotNumber} disabled type='text' />
        </div>
        <div className='col-2'>
          <input value={unregisteredLot?.partOfLot} disabled type='text' />
        </div>
        <div className='col-1'>
          <input value={unregisteredLot?.section} disabled type='text' />
        </div>
        <div className='col-3'>
          <input value={unregisteredLot?.planNumber} disabled type='text' />
        </div>
        <div className='col-3'>
          <input type='text' value={unregisteredLot?.description} disabled />
        </div>
      </div>
    </div>
  );
}

export default UnregisteredLot;
