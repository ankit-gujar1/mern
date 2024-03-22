import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css"
import Navbar from "./Navbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AddStudent() {
    const [sID, setsID] = useState();
    const [sName, setsName] = useState();
    const [sAge, setsAge] = useState();
    const navigate = useNavigate();

    function addStudent(e) {
        e.preventDefault();
        // axios.post('http://localhost:8080/', { sID, sAge, sName })
        axios.post('https://student-details-4tcv.onrender.com/', { sID, sAge, sName })
            .then((r) => {
                console.log(r);
                navigate('/');
            })
            .catch((e) => {
                console.log(e);
            })
    }

    return (
        <div>
            <Navbar />
            <div class="row justify-content-center">
                <div class="col-4">
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