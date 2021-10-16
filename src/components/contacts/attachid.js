import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import moment from 'moment';
import AttachIDForm from './AttachIDForm';
import url from '../../config.js';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import '../../stylesheets/attach.css';
import { FiDownload } from 'react-icons/fi';

const Attachid = (props) => {
  const [cookies, setCookie, removeCookie] = useCookies(['token']);
  const loggedInToken = cookies.token;
  const { details, changeBool, attach, handleContactAttachments } = props;
  const [showForm, setShowForm] = useState(false);

  const handleDownloadAttach = async (id, fileName) => {
    // try {
    //   const res = await axios.get(
    //     `${url}/api/contact-attachment/attachment/${id}?requestId=1234`,
    //     {
    //       headers: {
    //         'Content-Type': 'multipart/form-data',
    //         Authorization: `Bearer ${loggedInToken}`,
    //       },
    //     },
    //     {
    //       withCredentials: true,
    //     }
    //   );
    //   console.log(res.json());
    // } catch (err) {
    //   console.log(err);
    // }
    axios
      .get(
        `${url}/api/contact-attachment/attachment/${id}?requestId=1234`,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${loggedInToken}`,
          },
        },
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        // console.log('b64', response.headers['content-type']);
        // var json = JSON.stringify();
        var blob = new Blob([response.data], {
          type: response.headers['content-type'],
        });
        var linkSource = window.URL.createObjectURL(blob);
        console.log(linkSource);
        // const linkSource = `data:${response.headers['content-type']};base64,${response.data}`;
        const downloadLink = document.createElement('a');
        downloadLink.href = linkSource;
        // downloadLink.download = fileName;
        downloadLink.click();
      });
    // .then((data) => console.log(data));
  };

  return (
    <div className='attach-id-main'>
      <div>
        <button className='attachid-btn' onClick={() => setShowForm(true)}>
          Add Attachment
        </button>
      </div>
      <div className='attach-main-table'>
        {attach?.map((data) => (
          <div className='attach-table-row'>
            <div className='attach-div1'>{data.type}</div>
            <div className='attach-div2'>{data.name}</div>
            <div className='attach-div3'>
              {moment(data.uploadDate).format('DD-MM-YYYY')}
            </div>
            <div className='attach-div4'>
              {data.uploadedBy ? data.uploadedBy : 'uploaded by'}
            </div>
            {/*<div className='attach-div5'>Actions</div>*/}
            <div className='attach-div6'>
              <div className='download-icon-div'>
                <FiDownload
                  onClick={() => handleDownloadAttach(data.id, data.name)}
                />
              </div>
            </div>
          </div>
        ))}
        {showForm && (
          <AttachIDForm
            closeForm={() => setShowForm(false)}
            details={details}
            handleContactAttachments={handleContactAttachments}
          />
        )}
      </div>
    </div>
  );
};

export default Attachid;
