import React, { useState } from 'react';
import axios from 'axios';
import url from '../../config.js';
import { useCookies } from 'react-cookie';
import closeBtn from '../../images/close-white-btn.svg';
import '../../stylesheets/property.css';

const ConfirmationPopup = (props) => {
  const { regDetails, closePopup, loggedInToken } = props;
  const handleDelete = () => {
    axios
      .delete(
        `${url}/api/property/deletereglot/${regDetails.id}?requestId=1234567`,
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
  };

  return (
    <div className='confirmation-popup-container'>
      <div className='confirmation-popup-grid'>
        <div className='confirmation-header'>
          <h2 className='confirmation-heading'>Confirm Your Action</h2>
          <button className='close-form-btn' onClick={closePopup}>
            {' '}
            <img src={closeBtn} alt='close-btn' />
          </button>
        </div>
        <div className='confirmation-para'>
          <p>Are you sure you want to delete the record?</p>
        </div>
        <div className='confirmation-buttonDiv'>
          <button className='cancelButton' onClick={closePopup}>
            No
          </button>
          <button className='addButton' onClick={handleDelete}>
            Yes
          </button>
        </div>
      </div>
    </div>
  );
};

function EditRegFormPopup(props) {
  const { regDetails, setIsEditTrue, specifiedDetails } = props;
  const [chotaForm, setChotaForm] = useState(regDetails);
  const [openConfirm, setOpenConfirm] = useState(false);
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
            <button
              className='propertyPageBtns'
              onClick={() => setOpenConfirm(true)}
            >
              Delete
            </button>
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
                value={chotaForm.description}
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
      {openConfirm && (
        <ConfirmationPopup
          closePopup={() => setOpenConfirm(false)}
          regDetails={regDetails}
          loggedInToken={loggedInToken}
        />
      )}
    </div>
  );
}

export default EditRegFormPopup;
