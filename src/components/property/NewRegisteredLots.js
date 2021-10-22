import React, { useState } from 'react';
import '../../stylesheets/property.css';

import { FiEdit2 } from 'react-icons/fi';

const ConfirmationPopup = (props) => {
  // const { regDetails, closePopup, loggedInToken } = props;
};

const EditForm = (props) => {
  const {
    regDetails,
    setIsEditTrue,
    setTempRegistered,
    tempRegistered,
    index,
  } = props;
  const [chotaForm, setChotaForm] = useState(regDetails);
  const [openConfirm, setOpenConfirm] = useState(false);

  function chotaSave() {
    // console.log('regDetails', regDetails);
    let list = [...tempRegistered];
    list[index] = chotaForm;
    setTempRegistered(list);
    setIsEditTrue(false);
  }

  const deleteRegLot = () => {
    let list = [...tempRegistered];
    list.splice(index, 1);
    setTempRegistered(list);
  };

  return (
    <div className='propertyPopup-container'>
      <div className='propertyPopup-grid'>
        <div className='modal-content'>
          <div className='modal-header'>
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
            <button className='propertyPageBtns' onClick={deleteRegLot}>
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
                rows='2'
                cols='55'
                value={chotaForm?.description}
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
        />
      )}
    </div>
  );
};

function NewRegisteredLot(props) {
  const { registeredLot, index, setTempRegistered, tempRegistered } = props;
  const [isEditTrue, setIsEditTrue] = useState(false);
  return (
    <div>
      <div className='row'>
        <div className='col-1'>
          <button
            id={index}
            className='editBtn'
            onClick={() => {
              // setSelectedLot(registeredLot);
              // console.log('i got clicked');
              setIsEditTrue(true);
            }}
          >
            <FiEdit2 />
          </button>
          {isEditTrue && (
            <EditForm
              index={index}
              setIsEditTrue={setIsEditTrue}
              tempRegistered={tempRegistered}
              setTempRegistered={setTempRegistered}
              regDetails={registeredLot}
            />
          )}
        </div>
        <div className='col-2'>
          <input value={registeredLot?.titleReference} disabled type='text' />
        </div>
        <div className='col-1'>
          <input value={registeredLot?.lotNumber} disabled type='text' />
        </div>
        <div className='col-1'>
          <input value={registeredLot?.section} disabled type='text' />
        </div>
        <div className='col-3'>
          <input
            value={registeredLot?.depositedPlanNumber}
            disabled
            type='text'
          />
        </div>
        <div className='col-2'>
          <input disabled value={registeredLot?.strataPlanNumber} type='text' />
        </div>
        <div className='col-2'>
          <input disabled type='text' value={registeredLot?.description} />
        </div>
      </div>
    </div>
  );
}

export default NewRegisteredLot;
