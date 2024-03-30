import { Link } from "react-router-dom";
import Navbar from "./Navbar";

const NotFound=()=>{
    return(
        <>
            <Navbar/>
            <h1>Oppsi!!</h1>
            <Link to={'/'}>Home</Link>
        </>
    )
}

export default NotFound;