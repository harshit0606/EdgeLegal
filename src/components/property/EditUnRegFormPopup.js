import React, { useState } from 'react';
import axios from 'axios';
import url from '../../config.js';
import { useCookies } from 'react-cookie';
import closeBtn from '../../images/close-white-btn.svg';
import { FormControl, InputLabel, Select, TextField } from '@material-ui/core';
import '../../stylesheets/property.css';

const CustomTextInput = (props) => {
  const unregistered = JSON.parse(
    window.localStorage.getItem('metaData')
  ).unregistered_property;
  return (
    <TextField
      {...props}
      style={{
        width: 180,
        height: 40,
        marginRight: 7,
        marginLeft: 9,
        marginBottom: 10,
        // marginTop: '1rem',
        outline: 'none',
      }}
      InputLabelProps={{
        style: {
          fontSize: 14,
          fontFamily: 'inherit',
          color: 'rgb(94, 94, 94)',
          marginLeft: 10,
        },
      }}
      inputProps={{
        style: {
          fontSize: 14,
          fontFamily: 'inherit',
          color: 'rgb(94, 94, 94)',
          marginLeft: 10,
        },
      }}
      type='text'
      required={unregistered.fields.filter((f) => {
        if (f.fieldName === props.name) {
          return !f.allowNull;
        }
      })}
    />
  );
};

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

  const unrequiredFields = JSON.parse(
    window.localStorage.getItem('metaData')
  ).unregistered_property.fields.filter((f) => {
    if (!f.allowNull) {
      return f.fieldName;
    }
  });

  function chotaSave(e) {
    e.preventDefault();
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
        setIsEditTrue(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div className='propertyPopup-container'>
      <div className='propertyPopup-grid'>
        <form onSubmit={chotaSave}>
          <div className='modal-content'>
            <div className='modal-header'>
              <h5
                style={{ marginRight: '10%' }}
                className='modal-title'
                id='staticBackdropLabel'
              >
                Unregistered Lots
              </h5>
              <div className='editProperty-btnDiv'>
                <button type='submit' className='propertyPageBtns'>
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
            </div>
            <div className='modal-body'>
              <div style={{ padding: '12px' }}>
                <div className='row'>
                  <div className='col-4'>
                    <CustomTextInput
                      name='lot'
                      label='Lot No.'
                      value={chotaFormUn?.lot}
                      onChange={(e) => {
                        setChotaFormUn({
                          ...chotaFormUn,
                          lot: e.target.value,
                        });
                      }}
                    />
                  </div>
                  <div className='col-4'>
                    <CustomTextInput
                      name='partOfLot'
                      label='Part of lot'
                      value={chotaFormUn?.partOfLot}
                      onChange={(e) => {
                        setChotaFormUn({
                          ...chotaFormUn,
                          partOfLot: e.target.value,
                        });
                      }}
                    />
                  </div>
                  <div className='col-4'>
                    <CustomTextInput
                      name='section'
                      label='Section'
                      value={chotaFormUn?.section}
                      onChange={(e) => {
                        setChotaFormUn({
                          ...chotaFormUn,
                          section: e.target.value,
                        });
                      }}
                    />
                  </div>
                  <div className='col-4' style={{ marginTop: '15px' }}>
                    <CustomTextInput
                      name='plan'
                      label='Plan No.'
                      value={chotaFormUn.plan}
                      onChange={(e) => {
                        setChotaFormUn({
                          ...chotaFormUn,
                          plan: e.target.value,
                        });
                      }}
                    />
                  </div>
                </div>
                <div
                  style={{
                    marginTop: '15px',
                    marginBottom: '0.5rem',
                    padding: '0 10px',
                  }}
                >
                  <textarea
                    className='addNewCustody-textArea'
                    value={chotaFormUn.description}
                    placeholder={`Description ${
                      unrequiredFields.indexOf('description') >= 0 ? '*' : ''
                    }`}
                    onChange={(e) => {
                      setChotaFormUn({
                        ...chotaFormUn,
                        description: e.target.value,
                      });
                    }}
                    required={
                      unrequiredFields.indexOf('description') >= 0
                        ? true
                        : false
                    }
                    rows='2'
                    cols='55'
                  />
                </div>
              </div>
            </div>
          </div>
        </form>
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
