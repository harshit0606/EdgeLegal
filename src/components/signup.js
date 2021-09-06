import react,{useState} from "react";
import styles from "../stylesheets/signup.css";

import axios from "axios";
import {useCookies} from 'react-cookie';

import signupFooter from '../images/signupFooter.svg';
import arrow from '../images/arrow.svg';

function Signup(){

    function handleSubmit(e){
        e.preventDefault();
        console.log("signup submitted");
    }

    function handleChange(){

    }

    function goToLogin(){
        window.location.href = "/login";
    }

    const [firstName,setFirstname] = useState(null);
    const [lastName,setLastname] = useState(null);
    const [email,setEmail] = useState(null);
    const [phone,setPhone] = useState(null);
    const [firmSize,setFirmSize] = useState(null);

    return (
        <div>
            <div className="container">
                <div className="signupContainer">
                    <div className="signupCard">
                        <form>
                            <h1 className="logo">Logo</h1>
                            <div className="inputDiv">
                            <label htmlFor='firstName' className="labelStyle">
                                First name
                            </label>
                            <input
                                placeholder='Enter first name'
                                type='text'
                                name='firstName'
                                value={firstName}
                                onChange={handleChange}
                                className="inputStyle"
                            />
                            </div>
                            <div className="inputDiv">
                            <label htmlFor='lastName' className="labelStyle">
                                Last name
                            </label>
                            <input
                                placeholder='Enter last name'
                                type='text'
                                name='lastName'
                                value={lastName}
                                onChange={handleChange}
                                className="inputStyle"
                            />
                            </div>
                            <div className="inputDiv">
                            <label htmlFor='email' className="labelStyle">
                                Email
                            </label>
                            <input
                                placeholder='Enter email'
                                type='text'
                                name='email'
                                value={email}
                                onChange={handleChange}
                                className="inputStyle"
                            />
                            </div>
                            <div className="inputDiv">
                            <label htmlFor='phoneNumber' className="labelStyle">
                                Phone number
                            </label>
                            <input
                                placeholder='Enter phone number'
                                type='text'
                                name='phone'
                                value={phone}
                                onChange={handleChange}
                                className="inputStyle"
                            />
                            </div>
                            <div className="inputDiv">
                            <label htmlFor='firmSize' className="labelStyle">
                                Firm size
                            </label>
                            <input
                                placeholder='Enter firm size'
                                type='text'
                                name='firmSize'
                                value={firmSize}
                                onChange={handleChange}
                                className="inputStyle"
                            />
                            </div>
                            <button onClick={(e)=>{handleSubmit(e)}} className="buttonStyle">
                            Get Started
                            </button>
                        </form>
                    </div>
                    <div className="messageCard">
                    <h3 className="messageHead">
                        See how Edge can help your law firm succeed
                    </h3>
                    <p className="messageBody">
                        Save hours per day and boost billables with the world's most trusted
                        legal software.
                    </p>
                    <p className="messageFooter">
                        <span className="messageSpan">
                        <img
                            src={signupFooter}
                            alt='footer'
                            style={{ height: '34px', width: '34px' }}
                        />
                        </span>{' '}
                        Start you FREE trial now!
                    </p>
                    </div>
                </div>
                <div className="loginLink">
                    <div className="loginButton" onClick={goToLogin}>
                    <p className="login">Log in</p>
                    <span className="icon">
                        <img
                        src={arrow}
                        alt='up-arrow'
                        style={{ height: '10px', width: '10px' }}
                        />
                    </span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Signup;