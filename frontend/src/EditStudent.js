import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css"
import Navbar from "./Navbar";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function EditStudent() {

    const { id } = useParams();
    // const [student,setStudent]=useState();
    const [sID, setsID] = useState();
    const [sName, setsName] = useState();
    const [sAge, setsAge] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:8080/' + id)
        // axios.get('https://student-details-4tcv.onrender.com/' + id)
            .then((r) => {
                // setStudent(r.data);
                // console.log(r.data);
                setsID(r.data.sID)
                setsName(r.data.sName)
                setsAge(r.data.sAge)
            })
            .catch((e) => {
                console.log(e);
            })
    }, []) //[] is imp

    function editStudent(e) {
        e.preventDefault();
        axios.patch('http://localhost:8080/' + id, { sID, sAge, sName })
        // axios.patch('https://student-details-4tcv.onrender.com/' + id, { sID, sAge, sName })
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
                    <h1 className="text-center my-3">Update Student Details</h1>
                    <form onSubmit={editStudent}>
                        <div className="mb-3">
                            <label className="form-label">Enter Id</label>
                            <input className="form-control" value={sID} onChange={(e) => setsID(e.target.value)} />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Enter Name</label>
                            <input className="form-control" value={sName} onChange={(e) => setsName(e.target.value)} />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Enter Age</label>
                            <input className="form-control" value={sAge} onChange={(e) => setsAge(e.target.value)} />
                        </div>

                        <div className="text-center">
                            <button type="submit" className="btn btn-primary">Update</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default EditStudent;