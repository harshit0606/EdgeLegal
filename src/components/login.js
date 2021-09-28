import react,{useState} from "react";
import styles from "../stylesheets/login.css";
import url from "../config.js";

import axios from "axios";
import {useCookies} from 'react-cookie';

function Login(){

    const [cookies, setCookie, removeCookie] = useCookies(['name']);

    const [username,setUsername] = useState(null);
    const [password,setPassword] = useState(null);
    const [error,setError]=useState(null);
    
    function handleSubmit(e){
        e.preventDefault();
        axios.post(`${url}/api/auth/signin`,{
            "username": username,
            "password": password
        })
        .then((response)=>{
            setCookie("token", response.data.accessToken);
            window.location.href="/home";
        })
        .catch((error)=>{
            setError("Wrong Username or password");
        });
    }

    return (
        <div>
            {/* <div className="container"> */}
                <div className="loginHeader">Edge Logo</div>
                <div className="loginCard">
                    <h2 className="loginTitle">Log in to Edge</h2>
                    <form onSubmit={(e)=>{handleSubmit(e)}} >
                        <div className="inputDiv">
                            <label htmlFor='username' className="labelStyle">
                            Username
                            </label>
                            <input
                            placeholder='Enter username'
                            type='text'
                            name='username'
                            value={username}
                            onChange={(e)=>{setUsername(e.target.value)}}
                            className="inputStyle"
                            required
                            />
                        </div>
                        <div className="inputDiv">
                            <label htmlFor='password' className="labelStyle">
                            Password
                            </label>
                            <input
                            placeholder='Enter password'
                            type='password'
                            name='password'
                            value={password}
                            onChange={(e)=>{setPassword(e.target.value)}}
                            className="inputStyle"
                            required
                            />
                        </div>{
                            error&&(
                                <p style={{textAlign:"center",color:"red",fontSize:"14px"}}>{error}</p>
                            )
                        }
                        <button className="buttonStyle">
                            Log in
                        </button>
                    </form>
                </div>
            </div>
        // </div>
    );
}

export default Login;