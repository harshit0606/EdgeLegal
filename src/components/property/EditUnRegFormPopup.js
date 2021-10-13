import React, { useState } from 'react';
import axios from 'axios';
import url from '../../config.js';
import { useCookies } from 'react-cookie';
import closeBtn from '../../images/close-white-btn.svg';
import '../../stylesheets/property.css';

const ConfirmationPopup = (props) => {
  const { unregDetails, closePopup, loggedInToken, setBoolVal, setIsEditTrue } =
    props;

  const handleDelete = () => {
    // console.log(unregDetails);
    axios
      .delete(
        `${url}/api/property/deleteunreglot/${unregDetails.id}?requestId=1234567`,
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
        // window.location.reload();
        setBoolVal(false);
        setIsEditTrue(false);
        closePopup();
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

function EditUnRegFormPopup(props) {
  const { setIsEditTrue, unregDetails, specifiedDetails, setBoolVal } = props;
  const [chotaFormUn, setChotaFormUn] = useState(unregDetails);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies(['token']);
  const loggedInToken = cookies.token;

  function chotaSave() {
    const dataToBeSent = {
      ...specifiedDetails,
      unregisteredProperties: [{ id: unregDetails.id, ...chotaFormUn }],
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
        // window.location.reload();
        setBoolVal(false);
      })
      .catch((err) => {
        console.log(err);
      });
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
          <div class='modal-body'>
            <div style={{ padding: '12px' }}>
              <div className='row'>
                <div className='col-4'>
                  <h6>Lot No.</h6>
                  <input
                    className='popupFormInputs'
                    value={chotaFormUn.lot}
                    onChange={(e) => {
                      setChotaFormUn({
                        ...chotaFormUn,
                        lot: e.target.value,
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
                    value={chotaFormUn.plan}
                    onChange={(e) => {
                      setChotaFormUn({
                        ...chotaFormUn,
                        plan: e.target.value,
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
      {openConfirm && (
        <ConfirmationPopup
          closePopup={() => setOpenConfirm(false)}
          unregDetails={unregDetails}
          loggedInToken={loggedInToken}
          setBoolVal={setBoolVal}
          setIsEditTrue={setIsEditTrue}
        />
      )}
    </div>
  );
}

export default EditUnRegFormPopup;
