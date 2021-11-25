import React from 'react';
import { Link} from 'react-router-dom';
import  { useContext , useEffect} from 'react';
import AuthContext from '../context/auth/AuthContext';

function Navbar() {
    const { loadUser , logout, user , isAuthenticated  } = useContext(AuthContext);
    useEffect(()=>{
        loadUser();
    },[]);
     
    const logoutUser = ()=>{
        logout();
        window.location.href = '/signinform';
    }
    const guestLinks = (
        <>
        <li className="nav-item"> 
            <Link className="nav-link " to="/signupform">Sign Up</Link>
        </li>
        <li className="nav-item"> 
            <Link className="nav-link " to="/signinform">Sign In</Link>
        </li>
       

        </>)

          const userLinks = (
       
            <>
             <li className="nav-item"> 
                 <Link className="nav-link active" onClick = { logoutUser}  >Logout</Link>
             </li>
             <li className="nav-item"> 
                 <Link className="nav-link active" to="/dashboard">Dashboard</Link>
             </li>
            </>
        )
     
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">MyGarden</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link"  to="/">Home</Link>
              </li>
              { isAuthenticated ? userLinks : guestLinks }
              <li className="nav-item">
                <Link className="nav-link" to="/add_new">Add New</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/all_plant">All Plants</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/contactus">Contact US</Link>
              </li>

             
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Dropdown
                </a>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li><a className="dropdown-item" href="#">Action</a></li>
                  <li><a className="dropdown-item" href="#">Another action</a></li>
                  <li><hr className="dropdown-divider" /></li>
                  <li><a className="dropdown-item" href="#">Something else here</a></li>
                </ul>
              </li>
            
            </ul>
            <form className="d-flex">
              <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
              <button className="btn btn-outline-success" type="submit">Search</button>
            </form>
          </div>
        </div>
      </nav>
    )
}

export default Navbar