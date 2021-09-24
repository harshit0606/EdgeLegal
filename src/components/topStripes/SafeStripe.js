import React from 'react';
import '../../stylesheets/stripes.css';
function SafeStripe(props) {
  return (
    <div className='safeStripe'>
      <p>Safe Custody</p>
      <button className='custodyAddbtn' onClick={props.addCustody}>
        Add
      </button>
    </div>
  );
}

export default SafeStripe;
