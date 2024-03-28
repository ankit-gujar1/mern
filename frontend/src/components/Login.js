import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css"
import Navbar from "./Navbar";
import axios from "axios";
import { useAuthContext } from '../hooks/useAuthContext'
import { Link, useNavigate } from "react-router-dom";

function Login() {
    const [uName,setuName]=useState();
    const [password,setPassword]=useState();
    const navigate = useNavigate();

    //to display error which we set in backend we can access those errors using e.response.data.error in catch of axios
    const [error, setError] = useState(null);

    const { user,dispatch } = useAuthContext();

    //when user is found i.e., user is logged in then below code will prevent user to access /login path and automatically redirect them to App component
    useEffect(()=>{
        if(user){
            navigate('/');
        }
    },[user])

    async function loginUser(e){
        e.preventDefault();
        console.log(uName,password);

        axios.post('http://localhost:8080/login',{uName,password})
        .then((r)=>{

            // console.log(r.data);
            //console.log things for better understanding

            //r contains too many stuff but r.data contains the stuff we send from backend using res.json or in other words    r.data contains shit we see in postman response i.e., token and username in json format

            localStorage.setItem('user',JSON.stringify(r.data)); //converted r.data json format into string because localstorage only store string values

            //calling dispatch function to update global state which tells entire react app that that this particular user is logged in
            dispatch({type:'LOGIN',payload:r.data}) //in morning i was calling dispatch function for complete r but it should only be called for r.data

            navigate('/');

        })
        .catch((e)=>{
            //same as r, e contains lot of shit but the error response we send from backend is in e.response.data but       e.response.data gives json and we need only one key value pair from that json from that json see the name of key by doing console.log(e.response.data) in this case name of key is error therefore e.response.data.error
            setError(e.response.data.error);
        })
    }

    return (
        <div>
            <Navbar />
            <div className="row justify-content-center">
                <div className="col-4">
                    <h1 className="text-center my-3">Login User</h1>
                    <form onSubmit={loginUser}>
                        <div className="mb-3">
                            <label className="form-label">Enter Username</label>
                            <input type="text" className="form-control" onChange={(e) => setuName(e.target.value)} />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Enter Password</label>
                            <input type="password" className="form-control" onChange={(e) => setPassword(e.target.value)} />
                        </div>

                        <div className="text-center">
                            <button type="submit" className="btn btn-primary">Login</button>
                        </div>

                        <div className="text-center my-2">
                            <span>If not register </span><Link to={'/signup'}>Signup</Link>
                        </div>

                        {error && <div>{error}</div>}


                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login;


