import react from 'react';
import styles from '../../stylesheets/safeCustody.css';

function File(props) {
  const { packet } = props;
  return (
    <div>
      <div className='row safeSelectHeads'>
        <div className='col-1'>
          <input type='checkbox' />
        </div>
        <div className='col-2'>
          <h6>{packet.siteName}</h6>
        </div>
        <div className='col-2'>
          <h6>{packet.packetNumber}</h6>
        </div>
        <div className='col-2'>
          <h6>{packet.companyName}</h6>
        </div>
        <div className='col-2'>
          <h6>{packet.status}</h6>
        </div>
        <div className='col-3'>
          <h6>{'comments'}</h6>
        </div>
      </div>
    </div>
  );
}

export default File;
