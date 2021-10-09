import React, { useState } from 'react';
import '../../stylesheets/property.css';

function EditUnRegFormPopup(props) {
  const { setIsEditTrue, unregDetails } = props;

  const [chotaFormUn, setChotaFormUn] = useState(unregDetails);

  function chotaSave() {
    console.log('chotaFormUn', chotaFormUn);
  }

  return (
    <div className='propertyPopup-container'>
      <div className='propertyPopup-grid'>
        <div className='modal-content'>
          <div class='modal-header'>
            <h5
              style={{ marginRight: '10%' }}
              className='modal-title'
              id='staticBackdropLabel'
            >
              Unregistered Lots
            </h5>
            <button
              onClick={() => {
                chotaSave();
              }}
              className='propertyPageBtns'
            >
              Save
            </button>

            {/* <button className="propertyPageBtns">Delete</button> */}
            {/**isEditTrue == true && (
              <button className='propertyPageBtns'>Delete</button>
            ) */}
            <button
              className='propertyPageBtns'
              onClick={() => setIsEditTrue(false)}
            >
              Cancel
            </button>
          </div>
          <div class='modal-body'>
            <div style={{ padding: '12px' }}>
              <div className='row'>
                <div className='col-4'>
                  <h6>Lot No.</h6>
                  <input
                    className='popupFormInputs'
                    value={chotaFormUn.lotNumber}
                    onChange={(e) => {
                      setChotaFormUn({
                        ...chotaFormUn,
                        lotNumber: e.target.value,
                      });
                    }}
                    type='text'
                  ></input>
                </div>
                <div className='col-4'>
                  <h6>Part of lot</h6>
                  <input
                    className='popupFormInputs'
                    value={chotaFormUn.partOfLot}
                    onChange={(e) => {
                      setChotaFormUn({
                        ...chotaFormUn,
                        partOfLot: e.target.value,
                      });
                    }}
                    type='text'
                  ></input>
                </div>
                <div className='col-4'>
                  <h6>Section</h6>
                  <input
                    className='popupFormInputs'
                    value={chotaFormUn.section}
                    onChange={(e) => {
                      setChotaFormUn({
                        ...chotaFormUn,
                        section: e.target.value,
                      });
                    }}
                    type='text'
                  ></input>
                </div>
                <div className='col-4'>
                  <h6>Plan No.</h6>
                  <input
                    className='popupFormInputs'
                    value={chotaFormUn.planNumber}
                    onChange={(e) => {
                      setChotaFormUn({
                        ...chotaFormUn,
                        planNumber: e.target.value,
                      });
                    }}
                    type='text'
                  ></input>
                </div>
              </div>
              <h6>Description</h6>
              <textarea
                value={chotaFormUn.description}
                onChange={(e) => {
                  setChotaFormUn({
                    ...chotaFormUn,
                    description: e.target.value,
                  });
                }}
                rows='2'
                cols='55'
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditUnRegFormPopup;
