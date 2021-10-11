import React from 'react';
import Ham from '../icons/Vector.png';
import Matters from '../icons/Matters.png';
import Safe from '../icons/Safe Custody.png';
import documentt from '../icons/document.png';
import task from '../icons/Tasks.png';
import contacts from '../icons/contacts.png';
import { Link } from 'react-router-dom';
import '../stylesheets/sidebar.css';
function Sidebar(props) {
  function handleCollapse(e) {
    const mainSidebar = document.querySelector('#side');
    // const minisidebar = document.querySelector('.minisidebar');

    e.preventDefault();
    if (props.collapse === false) {
      if (mainSidebar) mainSidebar.classList.add('collapsse');
      props.setCollapse(true);
    } else {
      if (mainSidebar) mainSidebar.classList.remove('collapsse');
      props.setCollapse(false);
    }
  }

  return (
    <div>
      <div id='side' className='sidebarDiv'>
        <div className='logo_div'>
          <img src={Ham} alt='toggle' onClick={handleCollapse} />
          <h1>Edge</h1>
        </div>
        <Link to='/home/matters' style={{ textDecoration: 'none' }}>
          <div className='firstTab' onClick={props.setCurrent('matters')}>
            <img src={Matters} alt='matters' />
            <p>Matters</p>
          </div>
        </Link>
        <div className='sideTab'>
          <img src={documentt} alt='doc' />
          <p>Document</p>
        </div>
        <div className='sideTab'>
          <img src={task} alt='tasks' />
          <p>Tasks</p>
        </div>
        <Link to='/home/contacts' style={{ textDecoration: 'none' }}>
          <div className='sideTab' onClick={props.setCurrent('contacts')}>
            <img src={contacts} alt='contacts' />
            <p>Contacts</p>
          </div>
        </Link>
        <Link to='/home/safecustody' style={{ textDecoration: 'none' }}>
          <div className='sideTab' onClick={props.setCurrent('safeCustody')}>
            <img src={Safe} alt='safecustody' />
            <p>Safe Custody</p>
          </div>
        </Link>
        <Link to='/home/property' style={{ textDecoration: 'none' }}>
          <div className='sideTab' onClick={props.setCurrent('safeCustody')}>
            <img src={Safe} alt='property' />
            <p>Property</p>
          </div>
        </Link>
      </div>
      <div className='minisidebar'>
        <img src={Ham} onClick={handleCollapse} alt='miniToggle' />
        <Link to='/home/matters' style={{ textDecoration: 'none' }}>
          <div className='firstminiTab'>
            <img src={Matters} alt='matters' />
          </div>
        </Link>
        <div className='minisideTab'>
          <img src={documentt} alt='doc' />
        </div>
        <div className='minisideTab'>
          <img src={task} alt='tasks' />
        </div>
        <Link to='/home/contacts' style={{ textDecoration: 'none' }}>
          <div className='minisideTab'>
            <img src={contacts} alt='contacts' />
          </div>
        </Link>
        <Link to='/home/safecustody' style={{ textDecoration: 'none' }}>
          <div className='minisideTab'>
            <img src={Safe} alt='safecustody' />
          </div>
        </Link>
        <Link to='/home/property' style={{ textDecoration: 'none' }}>
          <div className='minisideTab'>
            <img src={Safe} alt='property' />
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Sidebar;
