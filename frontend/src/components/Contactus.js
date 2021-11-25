import { Row, Col, Form, Button, Alert } from "react-bootstrap";
import axios from "axios";
import { useState, useEffect } from "react";

function Contactus() {
    const [emailData, setEmailData] = useState({
        username: '',
        message: '',
        email: ''
    });
    const [msg, setMsg] = useState();

    // get form values
    const getValue = (event)=>{
        setEmailData({
            ...emailData,
            [event.target.name] : event.target.value
        })
    }
    
    // send email data to backend
    const sendEmail = (e)=>{
       e.preventDefault();
       //console.log(emailData)
       axios.post('/backend/sendEmail', emailData)
       .then(res=> {
           const successMSg = res.data;
           setMsg(successMSg);
           setEmailData({
            username: '',
            message: '',
            email: ''
        })
       });
    }
    return(
        <div className= "container mb-3"  style={{width:"50%"}}   >
        <h3 className="form-tittle mt-5 ">
                Contact us    </h3>
                <Row>
                    <Col>
                        <Form onSubmit={sendEmail}>
                        {
                            msg&&
                            <div className="alert alert-success">
                                <h1>{msg}</h1>
                            </div>
                        }
                        <Form.Group controlId="username"   className="mb-3 mt-5" >
                            <Form.Label>Your Name</Form.Label>
                            <Form.Control type="text" onChange={getValue} name="username" value={emailData.username}/>
                        </Form.Group>
                        <Form.Group controlId="message" className="mb-3" >
                            <Form.Label> Your Message:</Form.Label>
                            <Form.Control type="text" onChange={getValue} name="message" value={emailData.message}/>
                        </Form.Group>
                        <Form.Group controlId="email" className="mb-4"   >
                            <Form.Label>Your Email</Form.Label>
                            <Form.Control type="text" onChange={getValue} name="email" value={emailData.email}/>
                        </Form.Group>
                        <Button variant="danger" type="submit">
                            Contact Us
                        </Button>
                        </Form>
                    </Col>
                </Row>
            </div>
    )
}

export default Contactus;