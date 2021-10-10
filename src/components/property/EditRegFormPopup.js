import React, { useState } from 'react';
import axios from 'axios';
import url from '../../config.js';
import { useCookies } from 'react-cookie';
import '../../stylesheets/property.css';

function EditRegFormPopup(props) {
  const { regDetails, setIsEditTrue, specifiedDetails } = props;
  const [chotaForm, setChotaForm] = useState(regDetails);

  const [cookies, setCookie, removeCookie] = useCookies(['token']);
  const loggedInToken = cookies.token;

  function chotaSave() {
    // console.log('regDetails', regDetails);
    // console.log('specifiedDetails', specifiedDetails);

    const dataToBeSent = {
      ...specifiedDetails,
      registeredProperties: [{ id: regDetails.id, ...chotaForm }],
    };
    axios
      .put(
        `${url}/api/property`,
        {
          requestId: '1123445',
          data: dataToBeSent,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${loggedInToken}`,
          },
        },
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // console.log('specific', specifiedDetails);

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
              Registered Lots
            </h5>
            <button
              onClick={() => {
                chotaSave();
              }}
              className='propertyPageBtns'
            >
              Save
            </button>
            {/**isEditTrue === true && (
              <button className='propertyPageBtns'>Delete</button>
            ) */}
            <button
              className='propertyPageBtns'
              onClick={() => setIsEditTrue(false)}
            >
              Cancel
            </button>
          </div>
          <div className='modal-body'>
            <div style={{ padding: '12px' }}>
              <div className='row'>
                <div className='col-4'>
                  <h6>Title Reference</h6>
                  <input
                    className='popupFormInputs'
                    value={chotaForm?.titleReference}
                    onChange={(e) => {
                      setChotaForm({
                        ...chotaForm,
                        titleReference: e.target.value,
                      });
                    }}
                    type='text'
                  ></input>
                </div>
                <div className='col-4'>
                  <h6>Lot No.</h6>
                  <input
                    className='popupFormInputs'
                    value={chotaForm?.lotNumber}
                    onChange={(e) => {
                      setChotaForm({
                        ...chotaForm,
                        lotNumber: e.target.value,
                      });
                    }}
                    type='text'
                  ></input>
                </div>
                <div className='col-4'>
                  <h6>Section</h6>
                  <input
                    className='popupFormInputs'
                    value={chotaForm?.section}
                    onChange={(e) => {
                      setChotaForm({
                        ...chotaForm,
                        section: e.target.value,
                      });
                    }}
                    type='text'
                  ></input>
                </div>
                <div className='col-4'>
                  <h6>Deposited Plan No.</h6>
                  <input
                    className='popupFormInputs'
                    value={chotaForm?.depositedPlanNumber}
                    onChange={(e) => {
                      setChotaForm({
                        ...chotaForm,
                        depositedPlanNumber: e.target.value,
                      });
                    }}
                    type='text'
                  ></input>
                </div>
                <div className='col-4'>
                  <h6>Strata Plan No.</h6>
                  <input
                    className='popupFormInputs'
                    value={chotaForm?.strataPlanNumber}
                    onChange={(e) => {
                      setChotaForm({
                        ...chotaForm,
                        strataPlanNumber: e.target.value,
                      });
                    }}
                    type='text'
                  ></input>
                </div>
              </div>
              <h6>Description</h6>
              <textarea
                rows='2'
                cols='55'
                onChange={(e) => {
                  setChotaForm({
                    ...chotaForm,
                    description: e.target.value,
                  });
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditRegFormPopup;
