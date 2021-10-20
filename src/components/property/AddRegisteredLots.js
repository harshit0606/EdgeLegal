import React, { useState } from 'react';
import { FormControl, InputLabel, Select, TextField } from '@material-ui/core';
import '../../stylesheets/property.css';

const CustomTextInput = (props) => {
  return (
    <TextField
      {...props}
      style={{
        width: 130,
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
    />
  );
};

const CustomTextInputLg = (props) => {
  return (
    <TextField
      {...props}
      style={{
        width: 180,
        height: 40,
        marginRight: 7,
        marginLeft: 9,
        marginBottom: 10,
        marginTop: '0.5rem',
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
    />
  );
};

function AddRegisteredLots(props) {
  const { modalId, tempRegistered, setTempRegistered, isAddTrue } = props;

  const [chotaForm, setChotaForm] = useState({
    titleReference: '',
    lotNumber: '',
    depositedPlanNumber: '',
    strataPlanNumber: '',
    section: '',
    description: '',
  });

  function chotaSave() {
    setTempRegistered([...tempRegistered, chotaForm]);
    setChotaForm({
      titleReference: '',
      lotNumber: '',
      depositedPlanNumber: '',
      strataPlanNumber: '',
      section: '',
      description: '',
    });
    // axios
    //   .put(
    //     `${url}/api/property`,
    //     {
    //       requestId: '1123445',
    //       data: dataToBeSent,
    //     },
    //     {
    //       headers: {
    //         'Content-Type': 'application/json',
    //         Authorization: `Bearer ${loggedInToken}`,
    //       },
    //     },
    //     {
    //       withCredentials: true,
    //     }
    //   )
    //   .then((response) => {
    //     // console.log('property update response', response.data);
    //     // setSpecificProperty(dataToBeSent);
    //     window.location.reload();
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  }

  return (
    <div
      className='modal fade'
      id={`staticBackdrop${modalId}`}
      data-bs-backdrop='static'
      data-bs-keyboard='false'
      tabIndex='-1'
      aria-labelledby='staticBackdropLabel'
      aria-hidden='true'
    >
      <div className='modal-dialog modal-dialog-centered'>
        <div className='modal-content'>
          <div className='modal-header'>
            <h5
              style={{ marginRight: '10%' }}
              className='modal-title'
              id='staticBackdropLabel'
            >
              Registered Lots
            </h5>
            <div className='addNewLots-buttonDiv'>
              <button
                data-bs-toggle='modal'
                data-bs-target={`#staticBackdrop${modalId}`}
                onClick={() => {
                  chotaSave();
                }}
                className='propertyPageBtns'
              >
                Save
              </button>
              {isAddTrue === true && (
                <button className='propertyPageBtns'>Delete</button>
              )}
              <button
                className='propertyPageBtns'
                data-bs-toggle='modal'
                data-bs-target={`#staticBackdrop${modalId}`}
                aria-label='Close'
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
                <div className='col-5'>
                  <CustomTextInputLg
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
                <div className='col-5'>
                  <CustomTextInputLg
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
              <div style={{ marginTop: '2rem', marginBottom: '0.5rem' }}>
                <textarea
                  className='addNewCustody-textArea'
                  rows='2'
                  cols='55'
                  value={chotaForm.description}
                  placeholder='Description'
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
    </div>
  );
}

export default AddRegisteredLots;
