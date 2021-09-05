import react,{useState} from "react";
import styles from "../stylesheets/login.css";

// import axios from "axios";
// import {useCookies} from 'react-cookie';

function Login(){

    const [username,setUsername] = useState(null);
    const [password,setPassword] = useState(null);
    
    function handleSubmit(e){
        e.preventDefault();

        if(username!=="" && password!==""){
            console.log("login submitted");
        }else{
            alert("enter both username and password");
        }
    }

    return (
        <div>
            <div className="container">
                <div className="loginHeader">Edge Logo</div>
                <div className="loginCard">
                    <h2 className="loginTitle">Login in to Edge</h2>
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
        </div>
    );
}

export default Login;