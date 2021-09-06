import react,{useState} from "react";
import styles from "../stylesheets/login.css";
import url from "../config.js";

import axios from "axios";
import {useCookies} from 'react-cookie';

function Login(){

    const [cookies, setCookie, removeCookie] = useCookies(['name']);

    const [username,setUsername] = useState(null);
    const [password,setPassword] = useState(null);
    
    function handleSubmit(e){
        e.preventDefault();
        
        if(username!=="" && password!==""){
            console.log(username);
            console.log(password);
            console.log("login submitted");
            axios.post(`${url}/api/auth/signin`,{
                "username": username,
                "password": password
            })
            .then((response)=>{
                console.log("response",response);
                setCookie("token", response.data.accessToken);
                alert("You are successfuly logged in");
            })
            .catch((error)=>{
                console.log("error",error);
                alert("Wrong username or password");
            });
        }else{
            alert("enter both username and password");
        }
    }

    return (
        <div>
            {/* <div className="container"> */}
                <div className="loginHeader">Edge Logo</div>
                <div className="loginCard">
                    <h2 className="loginTitle">Log in to Edge</h2>
                    <form>
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
                        />
                    </div>
                    <button onClick={(e)=>{handleSubmit(e)}} className="buttonStyle">
                        Log in
                    </button>
                    </form>
                </div>
            </div>
        // </div>
    );
}

export default Login;