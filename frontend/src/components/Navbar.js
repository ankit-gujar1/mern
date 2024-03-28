import React from "react";
import { Link, useNavigate } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css"
import { useAuthContext } from '../hooks/useAuthContext'

function Navbar() {

    const { user } = useAuthContext();

    const navigate=useNavigate();

    //logic of logout is simple, we just have to remove username and token stored in localstorage and calling dispatch function for logout case
    const { dispatch } = useAuthContext();
    function logout() {
        localStorage.removeItem('user');
        dispatch({ type: 'LOGOUT' });
        navigate('/login');
    }

    return (
        <div>
            <nav className="navbar navbar-expand-lg bg-body-tertiary navbar-dark bg-dark">
                <div className="container-fluid">

                    <Link className="navbar-brand" to={'/'}>Navbar</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item active">
                                <Link className="nav-link" to={'/'}>Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to={'/hello'}>Hello</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to={'/add'}>Add Student</Link>
                            </li>
                        </ul>

                        <ul className="navbar-nav ml-auto">
                            {!user && (
                                <>
                                    <li className="nav-item">
                                        <Link className="nav-link" to={'/signup'}>Signup</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to={'/login'}>Login</Link>
                                    </li>
                                </>
                            )}
                            {user && (
                                <>
                                    <li className="nav-item">
                                        <button className="nav-link" onClick={logout}>Logout</button>
                                    </li>
                                    <li className="d-flex nav-item">
                                        <Link className="nav-link text-light">welcome {user.uName}</Link>
                                    </li>
                                </>
                            )}

                        </ul>



                    </div>
                </div>
            </nav>
        </div>
    );
}

export default Navbar;