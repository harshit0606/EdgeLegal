import React from 'react';
import '../../stylesheets/stripes.css';
function SafeStripe(props) {
  return (
    <div className='safeStripe'>
      <p
        style={{
          fontSize: '16px',
          marginBottom: '0px',
          color: '#0c244c',
          fontWeight: '600',
          fontFamily: "'Poppins', 'Mulish', sans-serif !important",
        }}
      >
        Safe Custody
      </p>
      <button className='custodyAddbtn' onClick={props.addCustody}>
        <span className='plusdiv'>+</span>
        Add
      </button>
    </div>
  );
}

export default SafeStripe;
