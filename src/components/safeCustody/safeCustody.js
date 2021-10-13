import React, { useState, useEffect, Fragment } from 'react';
import moment from 'moment';
import axios from 'axios';
import '../../stylesheets/safeCustody.css';
import url from '../../config.js';
import Document from './document.js';
import ReceiptDocument from './ReceiptDocument';
import AddCustodyPopup from './addCustodyPopup.js';
import AssociatedContacts from './associatedContacts.js';
import File from './file.js';
import { useCookies } from 'react-cookie';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
} from '@material-ui/core';
import SafeStripe from '../topStripes/SafeStripe';
import { Modal, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import AddCustodyForm from './AddCustodyForm';
import LinkContactForm from './LinkContactForm';
import upArrow from '../../images/upArrow.svg';
import downArrow from '../../images/downArrow.svg';
import downArrowColoured from '../../images/downArrowColoured.svg';
import upArrowColoured from '../../images/upArrowColoured.svg';

const filterFields = {
  contactCode: '',
  firstName: '',
  lastName: '',
  companyName: '',
  contactType: '',
  emailAddress: '',
  telephoneNumber: '',
};

function RenderSafeCustody(props) {
  const [cookies, setCookie, removeCookie] = useCookies(['token']);
  const loggedInToken = cookies.token;
  const { id } = props.match.params;
  const [safeCustodyPackets, setSafeCustodyPackets] = useState(null);
  const [custodyPacketContacts, setCustodyPacketContacts] = useState([]);
  const [filterPerpare, setFilterPrepare] = useState([]);
  const [custodyPacket, setCustodyPacket] = useState({});
  const [filteredData, setFilteredData] = useState([]);
  const [filterInput, setFilterInput] = useState(filterFields);
  const [prepareInput, setPrepareInput] = useState(filterFields);
  const [prepareReceiptContact, setPrepareReceiptContact] = useState(null);
  const [safeCustodyStatus, setSafeCustodyStatus] = useState(null);
  const [isAddCustodyOpen, setIsAddCustoduOpen] = useState(false);

  const [openLinkContactForm, setOpenLinkContactForm] = useState(false);
  const [contactLists, setContactLists] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);
  const [selectedContent, setSelectedContent] = useState('');
  const [selectPrepare, setSelectPrepare] = useState([]);
  const [contentShow, setContentShow] = useState(false);
  const [size, setSize] = useState(1);
  const [sortOrder, setSortOrder] = useState('');
  const [sortField, setSortField] = useState('');

  useEffect(() => {
    axios
      .get(
        `${url}/api/safecustody/${id}?requestId=1124455`,
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
        console.log('all data', response.data.data);
        setCustodyPacketContacts(response.data?.data?.custodyPacketContacts);
        setCustodyPacket(response.data?.data);
        setFilteredData(response.data?.data?.custodyPacketContacts);
        setFilterPrepare(response.data?.data?.custodyPacketContacts);
      });
  }, []);

  const handleAddCustody = () => {
    setIsAddCustoduOpen(true);
  };
  const handleContentClose = () => {
    setContentShow(false);
    setPrepareInput(filterFields);
    setSelectPrepare([]);
    setPrepareReceiptContact(null);
  };
  const handleContentShow = () => {
    setContentShow(true);
  };

  const handleSelectedContact = (data) => {
    // console.log(data);
    setSelectedContact(data);
  };

  const handleShowContacts = () => {
    axios
      .get(
        `${url}/api/safecustody/1?requestId=1124455`,
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
        console.log(response.data.data);
        setCustodyPacketContacts(response.data?.data?.custodyPacketContacts);
        setFilteredData(response.data?.data?.custodyPacketContacts);
        setCurrentSafe('contacts');
      });
  };

  const handleOpenLinkForm = async () => {
    await axios
      .get(
        `${url}/api/contacts?requestId=1124455&textField=&type=`,
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
      .then((res) => {
        // console.log(res.data?.data);
        setContactLists(res.data?.data?.contactLists);
        setOpenLinkContactForm(true);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const handleUnLink = async () => {
    if (selectedContact) {
      let formData = {
        requestId: 11223,
        data: {
          safeCustodyPacketId: selectedContact.safeCustodyPacketId,
          contactId: selectedContact.contactId,
          contactType: selectedContact.contactType,
          contactRole: selectedContact.contactRole,
        },
      };

      // console.log(selectedContact);

      await axios
        .delete(
          `${url}/api/safecustody/contact`,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${loggedInToken}`,
            },
            data: formData,
          },
          {
            withCredentials: true,
          }
        )
        .then((res) => window.location.reload())
        .catch((err) => console.log(err));
    } else {
      alert('Select contact');
    }
  };

  const handleSetPrimary = async () => {
    if (selectedContact) {
      let formData = {
        requestId: 11223,
        data: {
          safeCustodyPacketId: selectedContact.safeCustodyPacketId,
          contactId: selectedContact.contactId,
          contactType: selectedContact.contactType,
          contactRole: selectedContact.role,
          primaryContact: true,
        },
      };

      // console.log(formData);

      await axios
        .post(
          `${url}/api/safecustody/contact`,
          formData,
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
        .then((res) => window.location.reload())
        .catch((e) => console.log(e));
    }
  };

  const filterData = (obj) => {
    // console.log(obj);
    const newData = custodyPacketContacts.filter(
      (data) =>
        data.contactDetails['contactCode']
          .toLowerCase()
          .includes(obj['contactCode'].toLowerCase()) &&
        data.contactDetails['firstName']
          .toLowerCase()
          .includes(obj['firstName'].toLowerCase()) &&
        data.contactDetails['lastName']
          .toLowerCase()
          .includes(obj['lastName'].toLowerCase()) &&
        data.contactDetails['companyName']
          .toLowerCase()
          .includes(obj['companyName'].toLowerCase()) &&
        data.contactDetails['emailAddress']
          .toLowerCase()
          .includes(obj['emailAddress'].toLowerCase()) &&
        data.contactDetails['telephoneNumber']
          .toLowerCase()
          .includes(obj['telephoneNumber'].toLowerCase())
    );
    setFilteredData(newData);
  };

  const handleFilter = (e) => {
    const { name } = e.target;
    setFilterInput({ ...filterInput, [name]: e.target.value });
    filterData({ ...filterInput, [name]: e.target.value });
    // console.log(filteredData);
    // if (e.target.value === '') {
    //   setFilteredData(contactLists);
    // } else {

    // }
  };

  const filterPrepareData = (obj) => {
    // console.log(obj);
    const newData = custodyPacketContacts.filter((data) =>
      data.contactDetails['firstName']
        .toLowerCase()
        .includes(obj['firstName'].toLowerCase())
    );
    setFilterPrepare(newData);
  };

  const handleFilterPrepare = (e) => {
    const { name } = e.target;
    setPrepareInput({ ...prepareInput, [name]: e.target.value });
    filterPrepareData({ ...prepareInput, [name]: e.target.value });
  };

  const handleSort = (field, order) => {
    if (sortOrder === order && sortField === field) {
      setSortOrder('');
      setSortField('');
      setFilteredData(custodyPacketContacts);
    } else {
      setSortOrder(order);
      setSortField(field);
      let sortedData = filteredData.sort((a, b) => {
        if (order === 'asc') {
          return a.contactDetails[field] < b.contactDetails[field] ? -1 : 1;
        } else {
          return a.contactDetails[field] < b.contactDetails[field] ? 1 : -1;
        }
      });
      setFilteredData(sortedData);
    }
  };

  const handleSelectToPrepare = (id) => {
    const selectedIndex = selectPrepare.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selectPrepare, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selectPrepare.slice(1));
    } else if (selectedIndex === selectPrepare.length - 1) {
      newSelected = newSelected.concat(selectPrepare.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selectPrepare.slice(0, selectedIndex),
        selectPrepare.slice(selectedIndex + 1)
      );
    }
    setSelectPrepare(newSelected);
  };

  const handleSelectAllPrepare = (event) => {
    if (event.target.checked) {
      const newSelecteds = custodyPacket?.custodyPacketAttachments?.map(
        (row) => row.id
      );
      // console.log(newSelecteds);
      setSelectPrepare(newSelecteds);
      return;
    }
    setSelectPrepare([]);
  };

  // to check whether the property is selected or not
  const isSelected = (id) => selectPrepare.indexOf(id) !== -1;

  const handleSelectContact = (e) => {
    const data = JSON.parse(e.target.value);
    console.log(data);
    setPrepareReceiptContact(data);
  };

  const handlePrepareReceipt = () => {
    if (prepareReceiptContact && selectPrepare.length !== 0) {
      const data = {
        contactId: prepareReceiptContact.contactId,
        contactType: prepareReceiptContact.contactType,
        safeCustodyPacketId: prepareReceiptContact.safeCustodyPacketId,
        custodyPacketAttachmentIdList: selectPrepare,
      };

      console.log(data);

      axios
        .post(
          `${url}/api/safecustody/receipt`,
          {
            requestId: '1123445',
            data: data,
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
          handleContentClose();
          window.location.reload();
          // console.log(response.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      alert('Select contact and document');
    }
  };

  const handleDeleteAttachment = () => {
    // console.log(selectedContent);
    if (selectedContent !== '') {
      axios
        .delete(
          `${url}/api/safecustody/attachment/${selectedContent}?requestId=1234`,
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
        .then((res) => {
          // console.log(res.data);
          window.location.reload();
        })
        .catch((e) => {
          console.log(e);
        });
    } else {
      alert('Select attachment');
    }
  };

  function renderSafeSelectTop() {
    return (
      <div>
        <div>
          <SafeStripe />
        </div>
        <div className='selectsFileDiv'>
          <div className='d-flex'>
            <h6 style={{ paddingTop: '12%' }}>Status</h6>
            <Box sx={{ minWidth: 120 }} style={{ marginLeft: '25%' }}>
              <FormControl fullWidth>
                <InputLabel id='demo-simple-select-label'>Files</InputLabel>
                <Select
                  labelId='demo-simple-select-label'
                  id='demo-simple-select'
                  value={safeCustodyStatus}
                  label='Files'
                  onChange={(e) => {
                    getSafeCustody(e);
                  }}
                >
                  <MenuItem value={'ALL'}>All</MenuItem>
                  <MenuItem value={'ACTIVE'}>Active</MenuItem>
                  <MenuItem value={'INACTIVE'}>Inactive</MenuItem>
                  <MenuItem value={'UPLIFTED'}>Uplifted</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </div>
          <input
            style={{ width: '40%' }}
            placeholder='Search by packet no., Contact name, Address, Document name'
          ></input>
          <div className='custodyPageBtns' style={{ width: '22%' }}>
            <button>Filter </button>
            <button>Clear</button>
            <button>More</button>
          </div>
        </div>
      </div>
    );
  }

  function renderSafeContactsTop() {
    return (
      <div>
        <div className='safeContacts'>
          <div>
            <h5 style={{ fontWeight: 'bold' }}>Associated Contacts</h5>
          </div>
          <div className='custodyPageBtns'>
            <button onClick={handleOpenLinkForm}>Add </button>

            <button onClick={handleUnLink}>Delete</button>

            <button onClick={handleSetPrimary}>Set Primary Contact</button>
          </div>
        </div>
      </div>
    );
  }

  function renderSafeContentsTop() {
    return (
      <div>
        <div className='safeContentsTop'>
          <h5 style={{ fontWeight: 'bold' }}>Details for packet no.1</h5>
          <div className='custodyPageBtns'>
            <Link to='/home/safecustody'>
              <button>Cancel</button>
            </Link>

            <button>Delete</button>
          </div>
        </div>
      </div>
    );
  }

  function renderSafeReceiptsTop() {
    return (
      <div>
        <div className='safeContentsTop'>
          <h5 style={{ fontWeight: 'bold' }}>Receipts for packet no.1</h5>
          <div className='recepientsTop'>
            <button className='custodyAddbtn'>Download </button>
            <button
              className='custodyAddbtn'
              onClick={() => {
                window.print();
              }}
            >
              Prepare Receipt
            </button>
          </div>
        </div>
      </div>
    );
  }

  function getSafeCustody(e) {
    const currentStatus = e.target.value;

    setSafeCustodyStatus(currentStatus);
    axios
      .get(
        `${url}/api/safecustody?requestId=1124455&status=${currentStatus}`,
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
        console.log(response.data.data.safeCustodyPackets);
        setSafeCustodyPackets(response.data.data.safeCustodyPackets);
      });
  }

  function renderSafeSelect() {
    return (
      <div>
        <div className='row safeSelectHeads'>
          <div className='col-2'>
            <label>Location</label>
            <input type='text'></input>
          </div>
          <div className='col-2'>
            <label>Packet No.</label>
            <input type='text'></input>
          </div>
          <div className='col-2'>
            <label>Contacts</label>
            <input type='text'></input>
          </div>
          <div className='col-2'>
            <label>Status</label>
            <input type='text'></input>
          </div>
          <div className='col-3'>
            <label>Comments</label>
            <input type='text'></input>
          </div>
        </div>
        <div>
          {/** */}
          {safeCustodyPackets?.map((packet, index) => {
            if (index % 2 == 0)
              return (
                <div className='contacttdatadiv'>
                  <div className='row '>
                    <div className='col-1'>
                      <input type='checkbox' />
                    </div>
                    <div className='col-2'>
                      <h6>{packet.siteName}</h6>
                    </div>
                    <div className='col-2'>
                      <h6>{packet.packetNumber}</h6>
                    </div>
                    <div className='col-2'>
                      <h6>{packet.companyName}</h6>
                    </div>
                    <div className='col-2'>
                      <h6>{packet.status}</h6>
                    </div>
                    <div className='col-3'>
                      <h6>{'comments'}</h6>
                    </div>
                  </div>
                </div>
              );
            else {
              return (
                <div className='lightcontacttdatadiv'>
                  <div className='row '>
                    <div className='col-1'>
                      <input type='checkbox' />
                    </div>
                    <div className='col-2'>
                      <h6>{packet.siteName}</h6>
                    </div>
                    <div className='col-2'>
                      <h6>{packet.packetNumber}</h6>
                    </div>
                    <div className='col-2'>
                      <h6>{packet.companyName}</h6>
                    </div>
                    <div className='col-2'>
                      <h6>{packet.status}</h6>
                    </div>
                    <div className='col-3'>
                      <h6>{'comments'}</h6>
                    </div>
                  </div>
                </div>
              );
            }
          })}
        </div>
      </div>
    );
  }

  function renderSafeContacts() {
    return (
      <div>
        <div>
          <div className='row associatedContacts'>
            <div className='col-1' style={{ paddingRight: '3rem' }}>
              <input type='checkbox'></input>
            </div>
            <div className='col-2'>
              <label className='associatedContacts-label'>
                Code
                <div className='associatedContacts-label-btn'>
                  {sortOrder === 'asc' && sortField === 'contactCode' ? (
                    <img
                      src={upArrowColoured}
                      alt='asc'
                      className='label-btn-img-1'
                      onClick={() => handleSort('contactCode', 'asc')}
                    />
                  ) : (
                    <img
                      src={upArrow}
                      alt='asc'
                      className='label-btn-img-1'
                      onClick={() => handleSort('contactCode', 'asc')}
                    />
                  )}
                  {sortOrder === 'desc' && sortField === 'contactCode' ? (
                    <img
                      src={downArrowColoured}
                      alt='desc'
                      className='label-btn-img-2'
                      onClick={() => handleSort('contactCode', 'desc')}
                    />
                  ) : (
                    <img
                      src={downArrow}
                      alt='desc'
                      className='label-btn-img-2'
                      onClick={() => handleSort('contactCode', 'desc')}
                    />
                  )}
                </div>
              </label>
              <input
                type='text'
                name='contactCode'
                onChange={handleFilter}
              ></input>
            </div>
            <div className='col-1'>
              <label className='associatedContacts-label'>
                F. Name
                <div className='associatedContacts-label-btn'>
                  {sortOrder === 'asc' && sortField === 'firstName' ? (
                    <img
                      src={upArrowColoured}
                      alt='asc'
                      className='label-btn-img-1'
                      onClick={() => handleSort('firstName', 'asc')}
                    />
                  ) : (
                    <img
                      src={upArrow}
                      alt='asc'
                      className='label-btn-img-1'
                      onClick={() => handleSort('firstName', 'asc')}
                    />
                  )}
                  {sortOrder === 'desc' && sortField === 'firstName' ? (
                    <img
                      src={downArrowColoured}
                      alt='desc'
                      className='label-btn-img-2'
                      onClick={() => handleSort('firstName', 'desc')}
                    />
                  ) : (
                    <img
                      src={downArrow}
                      alt='desc'
                      className='label-btn-img-2'
                      onClick={() => handleSort('firstName', 'desc')}
                    />
                  )}
                </div>
              </label>
              <input
                type='text'
                name='firstName'
                onChange={handleFilter}
              ></input>
            </div>
            <div className='col-1'>
              <label className='associatedContacts-label'>
                L. Name
                <div className='associatedContacts-label-btn'>
                  {sortOrder === 'asc' && sortField === 'lastName' ? (
                    <img
                      src={upArrowColoured}
                      alt='asc'
                      className='label-btn-img-1'
                      onClick={() => handleSort('lastName', 'asc')}
                    />
                  ) : (
                    <img
                      src={upArrow}
                      alt='asc'
                      className='label-btn-img-1'
                      onClick={() => handleSort('lastName', 'asc')}
                    />
                  )}
                  {sortOrder === 'desc' && sortField === 'lastName' ? (
                    <img
                      src={downArrowColoured}
                      alt='desc'
                      className='label-btn-img-2'
                      onClick={() => handleSort('lastName', 'desc')}
                    />
                  ) : (
                    <img
                      src={downArrow}
                      alt='desc'
                      className='label-btn-img-2'
                      onClick={() => handleSort('lastName', 'desc')}
                    />
                  )}
                </div>
              </label>
              <input
                type='text'
                name='lastName'
                onChange={handleFilter}
              ></input>
            </div>
            <div className='col-2'>
              <label className='associatedContacts-label'>
                Company
                <div className='associatedContacts-label-btn'>
                  {sortOrder === 'asc' && sortField === 'companyName' ? (
                    <img
                      src={upArrowColoured}
                      alt='asc'
                      className='label-btn-img-1'
                      onClick={() => handleSort('companyName', 'asc')}
                    />
                  ) : (
                    <img
                      src={upArrow}
                      alt='asc'
                      className='label-btn-img-1'
                      onClick={() => handleSort('companyName', 'asc')}
                    />
                  )}
                  {sortOrder === 'desc' && sortField === 'companyName' ? (
                    <img
                      src={downArrowColoured}
                      alt='desc'
                      className='label-btn-img-2'
                      onClick={() => handleSort('companyName', 'desc')}
                    />
                  ) : (
                    <img
                      src={downArrow}
                      alt='desc'
                      className='label-btn-img-2'
                      onClick={() => handleSort('companyName', 'desc')}
                    />
                  )}
                </div>
              </label>
              <input
                type='text'
                name='companyName'
                onChange={handleFilter}
              ></input>
            </div>
            <div className='col-1'>
              <label className='associatedContacts-label'>
                Type
                <div className='associatedContacts-label-btn'>
                  {sortOrder === 'asc' && sortField === 'contactType' ? (
                    <img
                      src={upArrowColoured}
                      alt='asc'
                      className='label-btn-img-1'
                      onClick={() => handleSort('contactType', 'asc')}
                    />
                  ) : (
                    <img
                      src={upArrow}
                      alt='asc'
                      className='label-btn-img-1'
                      onClick={() => handleSort('contactType', 'asc')}
                    />
                  )}
                  {sortOrder === 'desc' && sortField === 'contactType' ? (
                    <img
                      src={downArrowColoured}
                      alt='desc'
                      className='label-btn-img-2'
                      onClick={() => handleSort('contactType', 'desc')}
                    />
                  ) : (
                    <img
                      src={downArrow}
                      alt='desc'
                      className='label-btn-img-2'
                      onClick={() => handleSort('contactType', 'desc')}
                    />
                  )}
                </div>
              </label>
              <input
                type='text'
                // name='contactType'
                // onChange={handleFilter}
              ></input>
            </div>
            <div className='col-2'>
              <label className='associatedContacts-label'>
                Email Address
                <div className='associatedContacts-label-btn'>
                  {sortOrder === 'asc' && sortField === 'emailAddress' ? (
                    <img
                      src={upArrowColoured}
                      alt='asc'
                      className='label-btn-img-1'
                      onClick={() => handleSort('emailAddress', 'asc')}
                    />
                  ) : (
                    <img
                      src={upArrow}
                      alt='asc'
                      className='label-btn-img-1'
                      onClick={() => handleSort('emailAddress', 'asc')}
                    />
                  )}
                  {sortOrder === 'desc' && sortField === 'emailAddress' ? (
                    <img
                      src={downArrowColoured}
                      alt='desc'
                      className='label-btn-img-2'
                      onClick={() => handleSort('emailAddress', 'desc')}
                    />
                  ) : (
                    <img
                      src={downArrow}
                      alt='desc'
                      className='label-btn-img-2'
                      onClick={() => handleSort('emailAddress', 'desc')}
                    />
                  )}
                </div>
              </label>
              <input
                type='text'
                name='emailAddress'
                onChange={handleFilter}
              ></input>
            </div>
            <div className='col-2'>
              <label className='associatedContacts-label'>
                Phone Number
                <div className='associatedContacts-label-btn'>
                  {sortOrder === 'asc' && sortField === 'telephoneNumber' ? (
                    <img
                      src={upArrowColoured}
                      alt='asc'
                      className='label-btn-img-1'
                      onClick={() => handleSort('telephoneNumber', 'asc')}
                    />
                  ) : (
                    <img
                      src={upArrow}
                      alt='asc'
                      className='label-btn-img-1'
                      onClick={() => handleSort('telephoneNumber', 'asc')}
                    />
                  )}
                  {sortOrder === 'desc' && sortField === 'telephoneNumber' ? (
                    <img
                      src={downArrowColoured}
                      alt='desc'
                      className='label-btn-img-2'
                      onClick={() => handleSort('telephoneNumber', 'desc')}
                    />
                  ) : (
                    <img
                      src={downArrow}
                      alt='desc'
                      className='label-btn-img-2'
                      onClick={() => handleSort('telephoneNumber', 'desc')}
                    />
                  )}
                </div>
              </label>
              <input
                type='text'
                name='telephoneNumber'
                onChange={handleFilter}
              ></input>
            </div>
          </div>

          <div style={{ marginTop: '3%' }}>
            <AssociatedContacts
              contacts={filteredData}
              selected={handleSelectedContact}
            />
          </div>
        </div>
        {openLinkContactForm && (
          <LinkContactForm
            closeForm={() => setOpenLinkContactForm(false)}
            contactLists={contactLists}
            safeCustodyPacketId={id}
          />
        )}
      </div>
    );
  }
  function renderSafeContents() {
    // var x = 'client';
    return (
      <div>
        <div>
          <div style={{ padding: '2.5%' }} className='row'>
            <div className='col-12'>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <label
                  for='contents'
                  style={{ marginRight: '5%', color: '#A0A5AA' }}
                >
                  Contents
                </label>
                <textarea rows='2' cols='100' id='contents'></textarea>
              </div>
              <br></br>
            </div>
            <div className='contentsInfo'>
              <div
                style={{
                  marginRight: '90px',
                  display: 'flex',
                  flexDirection: 'column',
                  width: '500px',
                }}
              >
                <div className='data-show-div'>
                  <span>First Name : </span>
                  <p>firstname</p>
                </div>
                <div className='data-show-div'>
                  <span>Last Name : </span>
                  <p> lastname</p>
                </div>
                <div className='data-show-div'>
                  <span>Contact Type : </span> <p> type</p>
                </div>
              </div>

              <div style={{ width: '500px', flexWrap: 'wrap' }}>
                <div className='data-show-div'>
                  <span>Address:</span>
                  <p>full address</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='associatedDocs'>
          <h6 style={{ fontWeight: 'bold' }}>Associated documents</h6>
          <div className='custodyPageBtns' style={{ width: '48%' }}>
            <button onClick={handleAddCustody}>ADD</button>
            <button onClick={handleDeleteAttachment}>DELETE</button>
            <button>DOWNLOAD</button>
            <button onClick={handleContentShow}>PREPARE RECEIPT</button>
          </div>
          <Modal centered='true' show={contentShow} onHide={handleContentClose}>
            <Modal.Body>
              <div className='title-div-popup'>
                <h3>Prepare Reciept</h3>
                <p
                  style={{
                    fontSize: '20px',
                    cursor: 'pointer',
                    position: 'absolute',
                    top: '10px',
                    right: '20px',
                  }}
                  onClick={handleContentClose}
                >
                  &#10006;
                </p>
              </div>
              <div className='popup-content'>
                <input
                  className='filter-input'
                  placeholder='Search Contact'
                  name='firstName'
                  value={prepareInput.firstName}
                  onChange={handleFilterPrepare}
                ></input>
                <div>
                  <p>Contacts:</p>
                  <select onChange={handleSelectContact}>
                    <option disabled selected>
                      select
                    </option>
                    {filterPerpare.map((contact) => (
                      <option value={JSON.stringify(contact)}>
                        {contact.contactDetails.firstName}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <hr />
              <div style={{ diplay: 'flex', width: '95%', marginLeft: '0px' }}>
                <div class='row'>
                  <div className='smaller-div'>
                    <input
                      style={{ marginLeft: '50%' }}
                      type='checkbox'
                      checked={
                        custodyPacket?.custodyPacketAttachments.length > 0 &&
                        selectPrepare.length ===
                          custodyPacket?.custodyPacketAttachments.length
                      }
                      onChange={handleSelectAllPrepare}
                    />
                  </div>
                  <div className='larger-div'>
                    <h3>Document Name</h3>
                  </div>
                  <div className='medium-div'>
                    <h3>Date</h3>
                  </div>
                </div>
              </div>
              <hr />
              <div className='documentData'>
                {custodyPacket?.custodyPacketAttachments?.map((d) => (
                  <Fragment>
                    <div class='row'>
                      <div className='smaller-div'>
                        <input
                          style={{ marginLeft: '50%' }}
                          type='checkbox'
                          checked={isSelected(d.id)}
                          onChange={() => handleSelectToPrepare(d.id)}
                        />
                      </div>
                      <div className='larger-div'>
                        <p>{d.name ? d.name : 'name'}</p>
                      </div>
                      <div className='medium-div'>
                        <p>
                          {d.dateReceived
                            ? moment(d.dateReceived).format('DD/MM/YYYY')
                            : 'date'}
                        </p>
                      </div>
                    </div>
                  </Fragment>
                ))}
              </div>
              <div className='prepare-btn-div'>
                <button
                  className='custodyAddbtn'
                  onClick={handlePrepareReceipt}
                >
                  Prepare
                </button>
              </div>
            </Modal.Body>
          </Modal>
        </div>
        {isAddCustodyOpen && (
          <AddCustodyForm
            closeForm={() => setIsAddCustoduOpen(false)}
            safeCustodyPacketId={id}
          />
        )}
        <div className='row associatedDocsHead'>
          <div className='col-1'></div>
          <div className='col-2'>
            <label>Document Name</label>
          </div>
          <div className='col-2'>
            <label>Date Received</label>
          </div>
          <div className='col-1'>
            <label>Status</label>
          </div>
          <div className='col-2'>
            <label>Data Uplifted</label>
          </div>
          <div className='col-2'>
            <label>Uplifted By</label>
          </div>
          <div className='col-2'>
            <label>Comments</label>
          </div>
        </div>
        <div>
          <Document
            data={custodyPacket}
            selectedContent={selectedContent}
            setSelectedContent={setSelectedContent}
          />
          {/*
//         <div className="contacttdatadiv">
//         <div className='row' >
//         <div className='col-1'>
//           <input style={{ marginLeft: '50%' }} type='checkbox' />
//         </div>
//         <div className='col-2'>
//           <label>Document Name</label>
//         </div>
//         <div className='col-2'>
//           <label>Date Received</label>
//         </div>
//         <div className='col-1'>
//           <label>Status</label>
//         </div>
//         <div className='col-2'>
//           <label>Data Uplifted</label>
//         </div>
//         <div className='col-2'>
//           <label>Uplifted By</label>
//         </div>
//         <div className='col-2'>
//           <label>Comments</label>
//         </div>
//       </div>
//       </div>
//       <div className="lightcontacttdatadiv">
//       <div className='row' >
//       <div className='col-1'>
//         <input style={{ marginLeft: '50%' }} type='checkbox' />
//       </div>
//       <div className='col-2'>
//         <label>Document Name</label>
//       </div>
//       <div className='col-2'>
//         <label>Date Received</label>
//       </div>
//       <div className='col-1'>
//         <label>Status</label>
//       </div>
//       <div className='col-2'>
//         <label>Data Uplifted</label>
//       </div>
//       <div className='col-2'>
//         <label>Uplifted By</label>
//       </div>
//       <div className='col-2'>
//         <label>Comments</label>
//       </div>
//     </div>
//     </div>
//           <div className="contacttdatadiv">
//         <div className='row' >
//         <div className='col-1'>
//           <input style={{ marginLeft: '50%' }} type='checkbox' />
//         </div>
//         <div className='col-2'>
//           <label>Document Name</label>
//         </div>
//         <div className='col-2'>
//           <label>Date Received</label>
//         </div>
//         <div className='col-1'>
//           <label>Status</label>
//         </div>
//         <div className='col-2'>
//           <label>Data Uplifted</label>
//         </div>
//         <div className='col-2'>
//           <label>Uplifted By</label>
//         </div>
//         <div className='col-2'>
//           <label>Comments</label>
//         </div>
//       </div>
//       </div>
//       <div className="lightcontacttdatadiv">
//       <div className='row' >
//       <div className='col-1'>
//         <input style={{ marginLeft: '50%' }} type='checkbox' />
//       </div>
//       <div className='col-2'>
//         <label>Document Name</label>
//       </div>
//       <div className='col-2'>
//         <label>Date Received</label>
//       </div>
//       <div className='col-1'>
//         <label>Status</label>
//       </div>
//       <div className='col-2'>
//         <label>Data Uplifted</label>
//       </div>
//       <div className='col-2'>
//         <label>Uplifted By</label>
//       </div>
//       <div className='col-2'>
//         <label>Comments</label>
//       </div>
//     </div>
            //     </div>*/}
        </div>
      </div>
    );
  }

  function renderSafeReceipts() {
    return (
      <div>
        <div className='row associatedDocsHead'>
          <div className='col-1'></div>
          <div className='col-2'>
            <label>Document Name</label>
          </div>
          <div className='col-2'>
            <label>Data Received</label>
          </div>
          <div className='col-1'>
            <label>Status</label>
          </div>
          <div className='col-2'>
            <label>Data Uplifted</label>
          </div>
          <div className='col-2'>
            <label>Uplifted By</label>
          </div>
          <div className='col-2'>
            <label>Comments</label>
          </div>
        </div>
        <div>
          <ReceiptDocument data={custodyPacket} />
        </div>
      </div>
    );
  }

  const [currentSafe, setCurrentSafe] = useState('contacts');
  const [a, setA] = useState(null);
  const [b, setB] = useState(null);
  const [c, setC] = useState(null);
  const [d, setD] = useState(null);

  return (
    <div>
      <div className='safe-custody-stripe'></div>
      <div className='safe-custody-div'>
        {currentSafe === 'select' && renderSafeSelectTop()}
        {currentSafe === 'contacts' && renderSafeContactsTop()}
        {currentSafe === 'contents' && renderSafeContentsTop()}
        {currentSafe === 'recepients' && renderSafeReceiptsTop()}

        <div className='safe-custody-btns-div'>
          <button
            className={
              currentSafe === 'contacts'
                ? 'safe-custody-btns safe-custody-btns-clicked'
                : 'safe-custody-btns'
            }
            onClick={handleShowContacts}
          >
            {' '}
            Contacts
          </button>
          <br />
          <button
            className={
              currentSafe === 'contents'
                ? 'safe-custody-btns safe-custody-btns-clicked'
                : 'safe-custody-btns'
            }
            onClick={() => {
              setCurrentSafe('contents');
            }}
          >
            {' '}
            Contents
          </button>
          <br />
          <button
            className={
              currentSafe === 'recepients'
                ? 'safe-custody-btns safe-custody-btns-clicked'
                : 'safe-custody-btns'
            }
            onClick={() => {
              setCurrentSafe('recepients');
            }}
          >
            {' '}
            Receipts
          </button>
          <br />
        </div>

        {currentSafe === 'select' && renderSafeSelect()}
        {currentSafe === 'contacts' && renderSafeContacts()}
        {currentSafe === 'contents' && renderSafeContents()}
        {currentSafe === 'recepients' && renderSafeReceipts()}
      </div>
    </div>
  );
}

export default RenderSafeCustody;
