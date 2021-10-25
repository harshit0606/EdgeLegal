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

function AddUnregisteredLots(props) {
  const { modalId, tempUnregistered, setTempUnregistered, isAddTrue, unreg } =
    props;

  const [chotaFormUn, setChotaFormUn] = useState({
    lot: '',
    partOfLot: '',
    section: '',
    plan: '',
    description: '',
  });

  function chotaSave(e) {
    e.preventDefault();
    setTempUnregistered([...tempUnregistered, chotaFormUn]);
    setChotaFormUn({
      lot: '',
      partOfLot: '',
      section: '',
      plan: '',
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
    //     window.location.reload();
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
    // console.log('unregLots', dataToBeSent);
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
              <div className='addNewLots-buttonDiv'>
                <button
                  data-bs-toggle='modal'
                  data-bs-target={`#staticBackdrop${modalId}`}
                  type='submit'
                  className='propertyPageBtns'
                >
                  Save
                </button>

                {/* <button className="propertyPageBtns">Delete</button> */}
                {isAddTrue == true && (
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
                      name='lot'
                      label='Lot No.'
                      value={chotaFormUn.lot}
                      onChange={(e) => {
                        setChotaFormUn({
                          ...chotaFormUn,
                          lot: e.target.value,
                        });
                      }}
                      required={
                        unreg.indexOf('lot'.toLowerCase()) >= 0 ? true : false
                      }
                    />
                  </div>
                  <div className='col-4'>
                    <CustomTextInput
                      name='partOfLot'
                      label='Part of lot'
                      value={chotaFormUn.partOfLot}
                      onChange={(e) => {
                        setChotaFormUn({
                          ...chotaFormUn,
                          partOfLot: e.target.value,
                        });
                      }}
                      required={
                        unreg.indexOf('partOfLot'.toLowerCase()) >= 0
                          ? true
                          : false
                      }
                    />
                  </div>
                  <div className='col-4'>
                    <CustomTextInput
                      name='section'
                      label='Section'
                      value={chotaFormUn.section}
                      onChange={(e) => {
                        setChotaFormUn({
                          ...chotaFormUn,
                          section: e.target.value,
                        });
                      }}
                      required={
                        unreg.indexOf('section'.toLowerCase()) >= 0
                          ? true
                          : false
                      }
                    />
                  </div>
                  <div className='col-4' style={{ margin: '10px 0' }}>
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
                      required={
                        unreg.indexOf('plan'.toLowerCase()) >= 0 ? true : false
                      }
                    />
                  </div>
                </div>
                <div style={{ marginTop: '0.8rem', marginBottom: '0.5rem' }}>
                  <textarea
                    className='addNewCustody-textArea'
                    value={chotaFormUn.description}
                    placeholder='Description'
                    onChange={(e) => {
                      setChotaFormUn({
                        ...chotaFormUn,
                        description: e.target.value,
                      });
                    }}
                    rows='2'
                    cols='55'
                    required={
                      unreg.indexOf('description'.toLowerCase()) >= 0
                        ? true
                        : false
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

export default AddUnregisteredLots;
