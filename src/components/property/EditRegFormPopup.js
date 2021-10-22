import React, { useState } from 'react';
import axios from 'axios';
import url from '../../config.js';
import { useCookies } from 'react-cookie';
import closeBtn from '../../images/close-white-btn.svg';
import { FormControl, InputLabel, Select, TextField } from '@material-ui/core';
import '../../stylesheets/property.css';

const CustomTextInput = (props) => {
  const registered = JSON.parse(
    window.localStorage.getItem('metaData')
  ).registered_property;
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
      required={registered.fields.filter((f) => {
        if (f.fieldName === props.name) {
          return !f.allowNull;
        }
      })}
    />
  );
};

const ConfirmationPopup = (props) => {
  const { regDetails, closePopup, loggedInToken, setBoolVal, setIsEditTrue } =
    props;
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
        // window.location.reload();
        closePopup();
        setIsEditTrue(false);
        setBoolVal(false);
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
  const { regDetails, setIsEditTrue, specifiedDetails, setBoolVal } = props;
  const [chotaForm, setChotaForm] = useState(regDetails);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies(['token']);
  const loggedInToken = cookies.token;

  const requiredFields = JSON.parse(
    window.localStorage.getItem('metaData')
  ).registered_property.fields.filter((f) => {
    if (!f.allowNull) {
      return f.fieldName;
    }
  });

  function chotaSave(e) {
    // console.log('regDetails', regDetails);
    // console.log('specifiedDetails', specifiedDetails);
    e.preventDefault();
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
        // window.location.reload();
        setBoolVal(false);
        setIsEditTrue(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // console.log('specific', specifiedDetails);

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
                Registered Lots
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
                      name='titleReference'
                      label='Title Reference'
                      value={chotaForm?.titleReference}
                      onChange={(e) => {
                        setChotaForm({
                          ...chotaForm,
                          titleReference: e.target.value,
                        });
                      }}
                    />
                  </div>
                  <div className='col-4'>
                    <CustomTextInput
                      name='lotNumber'
                      label='Lot No.'
                      value={chotaForm?.lotNumber}
                      onChange={(e) => {
                        setChotaForm({
                          ...chotaForm,
                          lotNumber: e.target.value,
                        });
                      }}
                    />
                  </div>
                  <div className='col-4'>
                    <CustomTextInput
                      name='section'
                      label='Section'
                      value={chotaForm?.section}
                      onChange={(e) => {
                        setChotaForm({
                          ...chotaForm,
                          section: e.target.value,
                        });
                      }}
                    />
                  </div>
                  <div className='col-4' style={{ marginTop: '15px' }}>
                    <CustomTextInput
                      name='depositedPlanNumber'
                      label='Deposited Plan No.'
                      value={chotaForm?.depositedPlanNumber}
                      onChange={(e) => {
                        setChotaForm({
                          ...chotaForm,
                          depositedPlanNumber: e.target.value,
                        });
                      }}
                    />
                  </div>
                  <div className='col-4' style={{ marginTop: '15px' }}>
                    <CustomTextInput
                      name='strataPlanNumber'
                      label='Strata Plan No.'
                      value={chotaForm?.strataPlanNumber}
                      onChange={(e) => {
                        setChotaForm({
                          ...chotaForm,
                          strataPlanNumber: e.target.value,
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
                    rows='2'
                    cols='45'
                    value={chotaForm.description}
                    placeholder={`Description ${
                      requiredFields.indexOf('description') >= 0 ? '*' : ''
                    }`}
                    onChange={(e) => {
                      setChotaForm({
                        ...chotaForm,
                        description: e.target.value,
                      });
                    }}
                    required={
                      requiredFields.indexOf('description') >= 0 ? true : false
                    }
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
          regDetails={regDetails}
          loggedInToken={loggedInToken}
          setBoolVal={setBoolVal}
          setIsEditTrue={setIsEditTrue}
        />
      )}
    </div>
  );
}

export default EditRegFormPopup;
