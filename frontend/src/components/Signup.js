
//console.log fucking helps in every fucking case

import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css"
import Navbar from "./Navbar";
// import { useSignup } from "../hooks/useSignup";
import axios from "axios";
import { useAuthContext } from '../hooks/useAuthContext'
// import { useNavigate } from "react-router-dom";

function Signup() {
    const [uName,setuName]=useState();
    const [password,setPassword]=useState();

    //to display error which we set in backend we can access those errors using e.response.data.error in catch of axios
    const [error, setError] = useState(null);

    const { dispatch } = useAuthContext();
    // const {singupU,error,isLoading}=useSignup();

    async function signupUser(e){
        e.preventDefault();
        console.log(uName,password);

        axios.post('http://localhost:8080/signup',{uName,password})
        .then((r)=>{

            //console.log things for better understanding

            //r contains too many stuff but r.data contains the stuff we send from backend using res.json or in other words    r.data contains shit we see in postman response i.e., token and username in json format

            localStorage.setItem('user',JSON.stringify(r.data)); //converted r.data json format into string because localstorage only store string values

            //calling dispatch function to update global state which tells entire react app that that this particular user is logged in
            dispatch({type:'LOGIN',payload:r.data}) //in morning i was calling dispatch function for complete r but it should only be called for r.data

            // console.log(r.data);
        })
        .catch((e)=>{
            //same as r, e contains lot of shit but the error response we send from backend is in e.response.data but          e.response.data gives json and we need only one key value pair from that json from that json see the name of key by doing console.log(e.response.data) in this case name of key is error therefore e.response.data.error
            setError(e.response.data.error);
        })
    }

    return (
        <div>
            <Navbar />
            <div className="row justify-content-center">
                <div className="col-4">
                    <h1 className="text-center my-3">Signup User</h1>
                    <form onSubmit={signupUser}>
                        <div className="mb-3">
                            <label className="form-label">Enter Username</label>
                            <input type="text" className="form-control" onChange={(e) => setuName(e.target.value)} />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Enter Password</label>
                            <input type="password" className="form-control" onChange={(e) => setPassword(e.target.value)} />
                        </div>

                        <div className="text-center">
                            <button type="submit" className="btn btn-primary">Signup</button>
                        </div>

                        {error && <div>{error}</div>}

                    </form>
                </div>
            </div>
        </div>
    )
}

export default Signup;