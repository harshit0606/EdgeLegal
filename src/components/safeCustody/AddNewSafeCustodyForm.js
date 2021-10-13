import React, { useState } from "react";
import moment from "moment";
import axios from "axios";
import Dropzone from "react-dropzone";
import closeBtn from "../../images/close-white-btn.svg";
import "../../stylesheets/AddNewSafeCustodyForm.css";
import url from "../../config.js";
import { useCookies } from "react-cookie";
import { TextField } from "@material-ui/core";

const initialData = {
  name: "",
  safeCustodyPacketId: 1, // will make it dynamic later because now it is coming in custodyPacketContact
  dateOfDocument: "",
  dateReceived: "",
  comments: "",
};

const items = {
  siteName: "",
  packetNumber: "",
  companyName: "",
  status: "",
  comment: "",
};

const CustomTextInput = (props) => {
  return (
    <TextField
      {...props}
      style={{
        width: 200,
        height: 50,
        marginRight: 7,
        marginLeft: 9,
        marginBottom: 10,
        outline: "none",
      }}
      InputLabelProps={{
        style: {
          fontSize: 14,
          fontFamily: "inherit",
          color: "rgb(94, 94, 94)",
          marginLeft: 10,
        },
      }}
      inputProps={{
        style: {
          fontSize: 14,
          fontFamily: "inherit",
          color: "rgb(94, 94, 94)",
          marginLeft: 10,
        },
      }}
      type="text"
    />
  );
};

const AddNewSafeCustodyForm = (props) => {
  const { closeForm } = props;
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);
  const loggedInToken = cookies.token;
  const [formData, setFormData] = useState(initialData);
  const [itemDetails, setItemDetails] = useState(items);
  // const [uploadedFile, setUploadedFile] = useState(null);
  // const [fileName, setFileName] = useState('');

  const handleFormChange = (e) => {
    const { name } = e.target;
    setFormData({ ...formData, [name]: e.target.value });
  };

  const handleItemChange = (e) => {
    const { name } = e.target;
    setItemDetails({ ...itemDetails, [name]: e.target.value });
  };

  // const handleUploadFile = (acceptedFile) => {
  //   setUploadedFile(acceptedFile[0]);
  //   setFileName(acceptedFile[0].name);
  //   setFormData({
  //     ...formData,
  //     dateReceived: moment(new Date()).format('YYYY-MM-DD'),
  //   });
  //   // console.log(acceptedFile[0]);
  // };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   var inputData = new FormData();
  //   if (uploadedFile) {
  //     const data = {
  //       requestId: 11223,
  //       data: {
  //         ...formData,
  //       },
  //     };
  //     inputData.append('custodyAttachment', data);
  //     inputData.append('attachment', uploadedFile);
  //     try {
  //       const { data } = await axios.post(
  //         `${url}/api/safecustody/attachment`,
  //         inputData,
  //         {
  //           headers: {
  //             'Content-Type': 'multipart/form-data',
  //             Authorization: `Bearer ${loggedInToken}`,
  //           },
  //         },
  //         {
  //           withCredentials: true,
  //         }
  //       );
  //       // console.log(data);
  //       setFormData(initialData);
  //       setUploadedFile(null);
  //       setFileName('');
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   } else {
  //     alert('Please upload file');
  //   }
  // };

  return (
    <div className="addNewCustody-popup-container">
      <div className="addNewCustody-popup-grid">
        <div className="addNewCustody-header">
          <h2 className="addNewCustody-heading">Add Safe Custody Item</h2>
          <button onClick={closeForm} className="close-form-btn">
            {" "}
            <img src={closeBtn} alt="close-btn" />
          </button>
        </div>
        <div className="addNewCustody-form-div">
          <div className="addNewCustody-input-div">
            <CustomTextInput
              name="siteName"
              label="Location"
              value={itemDetails.siteName}
              onChange={handleItemChange}
            />
            <CustomTextInput
              name="packetNumber"
              label="Packet No."
              value={itemDetails.packetNumber}
              onChange={handleItemChange}
            />
          </div>
          <div className="addNewCustody-input-div">
            <CustomTextInput
              name="companyName"
              label="Contacts"
              value={itemDetails.companyName}
              onChange={handleItemChange}
            />
            <CustomTextInput
              name="status"
              label="Status"
              value={itemDetails.status}
              onChange={handleItemChange}
            />
          </div>
          <div className="addNewCustody-input-div">
            <TextField
              label="Comments"
              multiline
              rows={3}
              name="comment"
              type="text"
              value={itemDetails.comment}
              onChange={handleItemChange}
              variant="outlined"
              fullWidth
              style={{
                marginRight: 7,
                marginLeft: 9,
                marginBottom: 10,
              }}
              InputLabelProps={{
                style: {
                  fontSize: 20,
                  fontFamily: "inherit",
                  color: "rgb(94, 94, 94)",
                  marginLeft: 10,
                },
              }}
              inputProps={{
                style: {
                  fontSize: 14,
                  fontFamily: "inherit",
                  color: "rgb(94, 94, 94)",
                  marginLeft: 10,
                },
              }}
            />
          </div>
        </div>
        <div className="addNewCustody-buttonDiv">
          <button className="cancelButton" onClick={closeForm}>
            Cancel
          </button>
          <button className="addButton">Add</button>
        </div>
      </div>
    </div>
  );
};

export default AddNewSafeCustodyForm;
