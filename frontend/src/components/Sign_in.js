import { Row, Col, Form, Button } from "react-bootstrap";
import { useState , useEffect} from "react";
import axios from "axios";

function Sign_in() {
    const [jwtToken , setJwtToken] = useState('')

//     useEffect(async ()=>{
// const data = await axios.get('/user/jwtToken');
// setJwtToken(data.user);


//     },[])
    if(jwtToken!== ''){
       //window.location.href = '/dashboard';
    }
    const [user, setUser] = useState({
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
    const signIn = (e)=>{
        e.preventDefault();

        axios.post('/user/signinByJWT', user)
        .then(res=>{
            console.log(res.data) // token from backend
            setJwtToken(res.data.token)
         //  localStorage.setItem('currentToken', JSON.stringify(res.data));
          window.location.href = '/dashboard';
        })
        
        // axios.post('/user/signin', user)
        // .then(res=>{  
        //     // saving data to clients computer
        //     localStorage.setItem('currentUser', JSON.stringify(res.data))      
        //     window.location.href = '/all_plant';
        // })
    }
    return(
        <div className= "container"  style={{width:"50%"}}   >
        <h3 className="form-tittle mt-5 ">
        Sign in    
    </h3>

        <Row className= "mt-5"  >
            <Col>
                <Form onSubmit={signIn}>
                <Form.Group controlId="email"  className= "mb-3"   >
                    <Form.Label>Email:</Form.Label>
                    <Form.Control type="email"  onChange={getValue} name="email"/>
                </Form.Group>
                <Form.Group controlId="password" className= "mb-4"  >
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" onChange={getValue} name="password"/>
                </Form.Group>
                <Button variant="success" type="submit">
                    Sign In
                </Button>
                </Form>
            </Col>
        </Row>
    </div>
    )
}

export default Sign_in;


