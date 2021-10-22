import React, { useState, useEffect } from 'react';
import axios from 'axios';
import url from '../../config.js';
import { useCookies } from 'react-cookie';
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

function PopupForm(props) {
  const {
    modalId,
    // addBtncount,
    // countFn,
    tempRegistered,
    setTempRegistered,
    specifiedDetails,
    isAddTrue,
    setBoolVal,
    setIsPopRForm,
    // idx,
    // regLot,
  } = props;

  const [chotaForm, setChotaForm] = useState({
    titleReference: '',
    lotNumber: '',
    depositedPlanNumber: '',
    strataPlanNumber: '',
    section: '',
    description: '',
  });

  const [cookies, setCookie, removeCookie] = useCookies(['token']);
  const loggedInToken = cookies.token;
  const requiredFields = JSON.parse(
    window.localStorage.getItem('metaData')
  ).registered_property.fields.filter((f) => {
    if (!f.allowNull) {
      return f.fieldName;
    }
  });

  // console.log(requiredFields);

  function chotaSave(e) {
    e.preventDefault();
    const dataToBeSent = {
      ...specifiedDetails,
      registeredProperties: [...tempRegistered, chotaForm],
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
        // console.log('property update response', response.data);
        // setSpecificProperty(dataToBeSent);
        // window.location.reload();
        setIsPopRForm(false);
        setBoolVal(false);
      })
      .catch((err) => {
        console.log(err);
      });
    // console.log('update property', dataToBeSent);
    //console.log("update property", specificProperty);
  }

  // console.log('specified', specifiedDetails);

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
              <div className='addPropertyLot-btnDiv'>
                <button
                  // data-bs-toggle='modal'
                  // data-bs-target={`#staticBackdrop${modalId}`}
                  type='submit'
                  className='propertyPageBtns'
                >
                  Save
                </button>
                {isAddTrue === true && (
                  <button className='propertyPageBtns'>Delete</button>
                )}
                <button
                  className='propertyPageBtns'
                  // data-bs-toggle='modal'
                  // data-bs-target={`#staticBackdrop${modalId}`}
                  // aria-label='Close'
                  onClick={() => setIsPopRForm(false)}
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
                    value={chotaForm.description ? chotaForm.description : ''}
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
    </div>
  );
}

export default PopupForm;
