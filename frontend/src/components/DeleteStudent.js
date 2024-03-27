import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css"
import Navbar from "./Navbar";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function DeleteStudent() {

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

    function deleteStudent(e) {
        e.preventDefault();
        axios.delete('http://localhost:8080/' + id, { sID, sAge, sName })
        // axios.delete('https://student-details-4tcv.onrender.com/' + id, { sID, sAge, sName })
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
            <div className="row justify-content-center">
                <div className="col-4">
                    <h1 className="text-center my-3">Delete Student Details</h1>
                    <form onSubmit={deleteStudent}>
                        <div className="mb-3">
                            <label className="form-label">Enter Id</label>
                            <input readOnly className="form-control" value={sID} onChange={(e) => setsID(e.target.value)} />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Enter Name</label>
                            <input readOnly className="form-control" value={sName} onChange={(e) => setsName(e.target.value)} />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Enter Age</label>
                            <input readOnly className="form-control" value={sAge} onChange={(e) => setsAge(e.target.value)} />
                        </div>

                        <div className="text-center">
                            <button type="submit" className="btn btn-danger">Delete</button>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    )
}

export default DeleteStudent;