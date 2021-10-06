import React,{useState} from 'react'
import Detail from "./Detail"
import Matter from "./matters"
function SingleContact() {
    const[currScreen,setCurrScreen]=useState('details');

function renderDetails(){
  return(
    <div>
    <Detail/>
    </div>
  )
}
function renderSafeCustody(){
  return(
    <div>Safe Custody</div>
  )
}
function renderMatters(){
  return(
    <div><Matter/></div>
  )
}
function renderAttachId(){
  return(
    <div>attach id</div>
  )
}

    return (
        <div>
        <div className='safe-custody-stripe'></div>
        <div className='safe-custody-div'>
        <div className='safeContacts'>
        <div>
          <h5 style={{ fontWeight: 'bold' }}>Contacts</h5>
        </div>
       
      </div>
          <div className='safe-custody-btns-div'>
            <button
              className={
                currScreen === 'details'
                  ? 'safe-custody-btns safe-custody-btns-clicked'
                  : 'safe-custody-btns'
              }
              onClick={() => {
                setCurrScreen('details');
              }}
            >
              {' '}
              Details
            </button>
            <br />
            <button
              className={
                currScreen === 'matters'
                  ? 'safe-custody-btns safe-custody-btns-clicked'
                  : 'safe-custody-btns'
              }
              onClick={() => {
                setCurrScreen('matters');
              }}
            >
              {' '}
             Matters
            </button>
            <br />
            <button
              className={
                currScreen === 'safe custody'
                  ? 'safe-custody-btns safe-custody-btns-clicked'
                  : 'safe-custody-btns'
              }
              onClick={() => {
                setCurrScreen('safe custody');
              }}
            >
              {' '}
              Safe Custody
            </button>
            <br />
            <button
              className={
                currScreen === 'attachid'
                  ? 'safe-custody-btns safe-custody-btns-clicked'
                  : 'safe-custody-btns'
              }
              onClick={() => {
                setCurrScreen('attachid');
              }}
            >
              {' '}
              Attach Id
            </button>
            <br />
          </div>
  
          {currScreen === 'details' && renderDetails()}
          {currScreen === 'matters' && renderMatters()}
          {currScreen === 'safe custody' && renderSafeCustody()}
          {currScreen === 'attachid' && renderAttachId()}
        </div>
        </div>
    )
}

export default SingleContact;
