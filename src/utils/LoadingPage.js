import React from 'react';
// import loaderPage from '../images/loaderPage.gif';
import loaderGif from '../images/loaderGif.gif';

const LoadingPage = () => {
  return (
    <div
      style={{
        position: 'fixed',
        top: '0',
        left: '0',
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          position: 'relative',
          // top: 0%;
          left: '5%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          // backgroundColor: '#fff',
          borderRadius: '5px',
          width: '150px',
          height: '150px',
          marginTop: '1rem',
          // textAlign: 'center',
        }}
      >
        <img
          src={loaderGif}
          alt='loader'
          style={{
            height: '7rem',
            width: '7rem',
            // backgroundColor: 'rgba(0, 0, 0, 0.2)',
          }}
        />
      </div>
    </div>
  );
};

export default LoadingPage;
