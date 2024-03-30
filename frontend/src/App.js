import React from "react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import "bootstrap/dist/css/bootstrap.min.css"
import Navbar from "./components/Navbar";
import { useAuthContext } from "./hooks/useAuthContext";

function App() {

  const navigate=useNavigate();

  const [students, setStudents] = useState([]);

  // async function fetchData() {
  //   let response = await axios.get('http://localhost:8080/');
  //   let user = await response.data;
  //   setStudents(user);
  // }

  // const [n,setN]=useState(0);

  const {user}=useAuthContext(); //to extract token from it and we send that token as header

  useEffect(() => {

    //when user is not found i.e., user is not logged in then below code will automatically redirect us to login component
    if(!user){
      navigate('/login');
      return;
    }

    // axios.get('http://localhost:8080/',{headers:{Authorization:'Bearer ' + user.token}})
    axios.get('https://mern-gb38.onrender.com', {headers:{Authorization:'Bearer ' + user.token}})
      .then((r) => {
        setStudents(r.data);
        console.log(students); //this wont log any thing this will log empty array but data is loaded in students so dw
      })
      .catch((e) => console.log(e));

    // fetchData();
  }, [user]) //[] is imp

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
