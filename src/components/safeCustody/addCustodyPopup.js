import react from 'react';
import styles from '../../stylesheets/safeCustody.css';

function AddCustodyPopup() {
  return (
    <div>
      <div
        className='modal fade'
        id='staticBackdrop'
        data-bs-backdrop='static'
        data-bs-keyboard='false'
        tabindex='-1'
        aria-labelledby='staticBackdropLabel'
        aria-hidden='true'
      >
        <div className='modal-dialog modal-dialog-centered'>
          <div className='modal-content'>
            <div
              className='modal-header'
              style={{ backgroundColor: '#002B5C', color: 'white' }}
            >
              <h5 className='modal-title' id='staticBackdropLabel'>
                Add Safe Custody Item
              </h5>
              <button
                type='button'
                className='btn-close'
                data-bs-dismiss='modal'
                aria-label='Close'
                style={{ backgroundColor: 'white' }}
              ></button>
            </div>
            <div className='modal-body'>
              <div className='col-12'>
                <input type='file'></input>
              </div>
              <div
                className='row'
                style={{ marginTop: '5%', marginBottom: '5%' }}
              >
                <div className='col-6'>
                  <label>Date Received</label>
                  <input type='date'></input>
                </div>
                <div className='col-6'>
                  <label>Date of Document</label>
                  <input type='date'></input>
                </div>
              </div>
              <div className='row'>
                <div className='col-4' style={{ marginRight: '8%' }}>
                  <label>Document Name</label>
                  <input style={{ width: '120%' }} type='text'></input>
                </div>
                <div className='col-7' style={{ paddingLeft: '11%' }}>
                  <label>Comments</label>
                  <br />
                  <textarea rows='2' cols='25' />
                </div>
              </div>
            </div>
            <div className='modal-footer'>
              <button
                className='popupAddContents'
                style={{ backgroundColor: 'grey' }}
                type='button'
                data-bs-dismiss='modal'
              >
                CANCEL
              </button>
              <button className='popupAddContents' type='button'>
                ADD
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddCustodyPopup;
