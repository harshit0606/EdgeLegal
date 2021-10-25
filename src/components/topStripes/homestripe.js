import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import '../../stylesheets/stripes.css';
import Bell from '../../icons/bell.png';
import { Avatar } from '@mui/material';
import Photo from '../../icons/avatar-4 (1).png';
import axios from 'axios';
import url from '../../config.js';
import { AiOutlineLogout } from 'react-icons/ai';
import { FiEdit } from 'react-icons/fi';
import { Modal } from 'react-bootstrap';
import '../../stylesheets/profileCard.css';
import { MdSearch } from 'react-icons/md';
import companyLogo from '../../icons/edgelogo.png';

function HomeStipe() {
  const [cookies, setCookie, removeCookie] = useCookies(['token']);
  const loggedInToken = cookies.token;
  function logout() {
    removeCookie('token', { path: '/' });
    window.localStorage.removeItem('metaData');
    window.location.href = '/';
  }
  const [user, setUser] = useState(undefined);
  const [show, setShow] = useState(false);
  useEffect(() => {
    axios
      .get(
        `${url}/api/user/${1}`,
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
        console.log('userdetails', response.data);
        setUser(response.data);
      });
  }, []);

  function showProfile() {
    const profile = document.querySelector('.profilecard');
    const backdrop = document.querySelector('.backdroppp');

    if (profile) {
      profile.classList.toggle('show');
    }
    if (backdrop) {
      backdrop.classList.toggle('show');
    }
  }

  const handleShow = () => {
    setShow(true);
  };
  const handleClose = () => {
    setShow(false);
  };

  const handleSiteChange = (e) => {
    if (user) {
      setUser({
        ...user,
        siteId: e.target.value,
      });
    }
  };

  return (
    <div className='homestripe'>
      <div className='backdroppp' onClick={showProfile}></div>
      <div className='safestrip'>
        <div className='searchhdiv'>
          <input style={{ outline: 'none' }} placeholder='Search' />
          <div
            style={{
              backgroundColor: 'lightgray',
              width: 'fit-content',
              padding: '2px 2px',
              cursor: 'pointer',
            }}
          >
            <MdSearch size={25} />
          </div>
        </div>

        <div className='logo_divv'>
          <img src={companyLogo} alt='company' />
        </div>
        <div className='safe_iconsDiv'>
          <img className='safe_iconsDivimg' src={Bell} alt='notifications' />
          <div onClick={showProfile} className='avatarr'>
            <Avatar sx={{ width: 56, height: 56 }} src={Photo} />
          </div>
        </div>
      </div>
      <div className='profilecard'>
        <div
          onClick={handleShow}
          style={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            cursor: 'pointer',
          }}
        >
          <FiEdit />
        </div>
        <div className='avatarDiv'>
          <Avatar sx={{ width: 56, height: 56 }} src={Photo} />
          <div className='nameDiv'>
            <h3>
              {user?.firstName} {user?.lastName}
            </h3>
            <p>{user?.login}</p>
          </div>
          <Modal show={show} onHide={handleClose}>
            <Modal.Body>
              <div className='editprofileDiv'>
                <h3>Change Password</h3>
                <p
                  style={{
                    fontSize: '20px',
                    cursor: 'pointer',
                    position: 'absolute',
                    top: '10px',
                    right: '20px',
                  }}
                  onClick={handleClose}
                >
                  &#10006;
                </p>
                <div className='editnamediv'>
                  <div className='row'>
                    <div className='col-12'>
                      <input
                        className='editProfile-input'
                        placeholder='Current Password'
                      />
                    </div>
                  </div>
                  <div className='row'>
                    <div className='col-12'>
                      <input
                        className='editProfile-input'
                        placeholder='New Password'
                      />
                      <br />
                    </div>
                  </div>
                  <div className='row'>
                    <div className='col-12'>
                      <input
                        className='editProfile-input'
                        placeholder='Confirm Password'
                      />
                    </div>
                  </div>
                  <button className='EditProfileBtn'>Update</button>
                </div>
              </div>
            </Modal.Body>
          </Modal>
        </div>
        <div className='cardDiv'>
          <h3>Company Name</h3>
          <p>{user?.organizationName} </p>
          <h3>Role</h3>
          <p>System administrator</p>
          <h3>Version</h3>
          <p>2.0.102</p>
          <hr></hr>
          <h3>My profile</h3>
          <select
            name='siteId'
            className='profile-siteInfo'
            onChange={handleSiteChange}
          >
            {user?.siteInfoList.map((site) => (
              <option
                key={site.siteId}
                value={site.siteId}
                selected={site.siteId === user.siteId}
              >
                {site.siteName}
              </option>
            ))}
          </select>
          <div
            onClick={() => {
              logout();
            }}
            className='logoutdivv'
          >
            <h2>
              Logout <AiOutlineLogout />
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeStipe;
