import { Row, Col, Form, Button } from "react-bootstrap";
import { useState } from "react";
import axios from "axios";

function Sign_up() {
    const [user, setUser] = useState({
        username: '',
        email: '',
        password: ''
    })
    // get form value inside user state
    const getValue = (e)=>{
        setUser({
            ...user, // all previous values
            [e.target.name]: e.target.value // new key:value
        })
    }
    // Send signup data to backend and redirect to frontend
    const createUser = (e)=>{
        e.preventDefault();
        console.log(user)
        axios.post('/user/create', user)
        .then(res=>{
           window.location.href = '/signinform'
        })
    }
    return(
        <Row>
            <Col>
            <div className= "container"  style={{width:"50%"}}   >
            <h3 className="form-tittle mt-5">
                Sign up     
            </h3>

                    <Form onSubmit={createUser} className="justify-content-md-center mt-5 "     >

                    <Form.Group controlId="username"className="mb-3"   >
                        <Form.Label>UserName</Form.Label>
                        <Form.Control type="text" onChange={getValue} name="username" placeholder="userName"  />
                    </Form.Group>
                    <Form.Group controlId="email" className="mb-5"  >
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" onChange={getValue} name="email"placeholder="name@example.com"   />
                        <Form.Text className="text-muted">      
                            We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>
                    <Form.Group controlId="password" className="mb-4" >
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" onChange={getValue} name="password" placeholder="Password"  />
                    </Form.Group>
                    <Button variant="success" type="submit">
                        Sign Up
                    </Button>
                    </Form>
                </div>
            </Col>
        </Row>
    )
}

export default Sign_up;