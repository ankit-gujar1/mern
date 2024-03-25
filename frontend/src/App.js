import React from "react";
import { useEffect, useState } from "react";
import { Link } from 'react-router-dom'
import axios from 'axios'
import "bootstrap/dist/css/bootstrap.min.css"
import Navbar from "./Navbar";

function App() {
  const [students, setStudents] = useState([]);

  // async function fetchData() {
  //   let response = await axios.get('http://localhost:8080/');
  //   let user = await response.data;
  //   setStudents(user);
  // }

  // const [n,setN]=useState(0);
  useEffect(() => {
    axios.get('http://localhost:8080/')
    // axios.get('https://student-details-4tcv.onrender.com/')
      .then((r) => {
        setStudents(r.data);
        console.log(students); //this wont log any thing this will log empty array but data is loaded in students so dw
      })
      .catch((e) => console.log(e));

    // fetchData();
  }, []) //[] is imp

  return (
    <div>
      <Navbar />
      <div className="row justify-content-center">
        <div className="col-8">
          <h1 className="text-center my-2">Students Details</h1>
          <table className="table table-bordered table-striped text-center">
            <thead>
              <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Age</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              { //these {} are imp without it we can not use .map function for iteration 
                students.map((i) =>
                  <tr key={i._id}>
                    <td>{i.sID}</td>
                    <td>{i.sName}</td>
                    <td>{i.sAge}</td>
                    <td>
                      <Link className="btn btn-primary" to={'/edit/' + i._id}>Edit</Link>
                      <Link className="btn btn-danger mx-2" to={'/delete/' + i._id}>Delete</Link>
                    </td>
                  </tr>
                )}
            </tbody>

          </table>
          {/* <button onClick={()=>{setN(n+1)}}>++</button> */}
          <div className="text-center">
            <Link className="btn btn-primary mx-5 my-2" to={'/add'}>Add Student</Link>
            {/* <Link to="/hello">hello</Link> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
