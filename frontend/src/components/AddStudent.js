import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css"
import Navbar from "./Navbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";

function AddStudent() {
    const [sID, setsID] = useState();
    const [sName, setsName] = useState();
    const [sAge, setsAge] = useState();
    const navigate = useNavigate();

    const {user}=useAuthContext(); //to extract token from it and we send that token as header

    //when user is not found i.e., user is not logged in then below code will automatically redirect us to login component
    useEffect(()=>{
        if(!user){
            navigate('/login');
            return;
        }
    },[user])

    function addStudent(e) {
        e.preventDefault();

        if(!user){
            // navigate('/login');
            return;
        }

        // axios.post('http://localhost:8080/', { sID, sAge, sName }, {headers:{Authorization:'Bearer ' + user.token}})
        axios.post('https://mern-gb38.onrender.com/', { sID, sAge, sName }, {headers:{Authorization:'Bearer ' + user.token}})
            .then((r) => {
                console.log(r);
                navigate('/');
            })
            .catch((e) => {
                //e.response.data.error for accessing the errors we set in backend code ref Signup.js component for details
                console.log(e.response.data.error); 
            })
    }

    return (
        <div>
            <Navbar />
            <div className="row justify-content-center">
                <div className="col-4">
                    <h1 className="text-center my-3">Add Student Details</h1>
                    <form onSubmit={addStudent}>
                        <div className="mb-3">
                            <label className="form-label">Enter Id</label>
                            <input className="form-control" onChange={(e) => setsID(e.target.value)} />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Enter Name</label>
                            <input className="form-control" onChange={(e) => setsName(e.target.value)} />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Enter Age</label>
                            <input className="form-control" onChange={(e) => setsAge(e.target.value)} />
                        </div>

                        <div className="text-center">
                            <button type="submit" className="btn btn-primary">Submit</button>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    )
}

export default AddStudent;