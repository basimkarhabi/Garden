import { Row, Col, Nav, Navbar, FormControl, Form, Button } from "react-bootstrap";
import React,  { useContext , useEffect} from 'react';
import AuthContext from '../context/auth/AuthContext';
import plantContext from "../context/plant/plantContext.js";

function Nav_top() {
    const { loadUser , logout, user , isAuthenticated  } = useContext(AuthContext);
    const {filterPlants} = useContext(plantContext);
    const inputChange = (event)=>{
       const text = event.target.value;
       if(text!== ''){
        filterPlants(text);
       }
       

        
    }
    useEffect(()=>{
        loadUser();
    },[]);
    
    const logoutUser = ()=>{
        logout();
        window.location.href = '/signinform';
    }
    const guestLinks = (
        <>
        <Nav.Link href="/signupform">+Sign Up</Nav.Link>
        <Nav.Link href="/signinform">Sign In with JWT</Nav.Link>
        <Nav.Link href="/signinformPassport">Signin with Passport</Nav.Link>

        </>
    )

    const userLinks = (
       
        <>
         <Nav.Link onClick = { logoutUser}  >Logout</Nav.Link>
         <Nav.Link href="/dashboard">Dashboard</Nav.Link>
        </>
    )
    return(
        <Row>
            <Col>
            <Navbar bg="primary" variant="dark">
                <Navbar.Brand href="#home">MyGarden</Navbar.Brand>
                <Nav className="mr-auto">
                <Nav.Link href="/">Home</Nav.Link>
                 
               { isAuthenticated ? userLinks : guestLinks }
                <Nav.Link href="/add_new">+Add New</Nav.Link>
                <Nav.Link href="/all_plant">All Plants</Nav.Link>
                
                <Nav.Link href="/contactus">Contact Us</Nav.Link>
                
                </Nav>
                <Form inline>
                <FormControl type="text" placeholder="Search" className="mr-sm-2" onChange={inputChange} />
                <Button variant="outline-light">Search</Button>
                </Form>
            </Navbar>
            </Col>
        </Row>
    )
}

export default Nav_top;