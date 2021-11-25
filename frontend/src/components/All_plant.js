import { Row, Col, Image, Alert, Button, Modal, Form , Card } from "react-bootstrap";
import axios from "axios";
import { useEffect, useState , useContext } from "react";
import plantContext from '../context/plant/plantContext';
function All_plant() {
     
    const myplantcontext = useContext(plantContext);

    const { plants , getPlants, filteredPlants} = myplantcontext;


    // const [plants, setPlants] = useState([]); // all plants from DB
    const [deleteMsg, setDeleteMsg] = useState(); 
    const [show, setShow] = useState(false);// modal hide/show
    const [plantData, setPlantData] = useState({ // one plant detail
        name: '',
        plantPic: ''
    });
    const [updateMsg, setUpdateMsg] = useState()
    // useEffect(()=>{
    //     const user = JSON.parse(localStorage.getItem('currentUser'));
    //     axios.get('/plant/allPlants')
    //     .then(response=>{
    //         setPlants(response.data)
    //         // make in unmount or clear after get all data
    //         setDeleteMsg(null)
    //         setUpdateMsg(null)
    //     })
    // }, [deleteMsg, updateMsg]);
    useEffect(()=>{
         
      async function fetchData(){
        await getPlants();

      }
      fetchData();
         
     
      
    },[])

    const deletePlant = (id)=>{
        axios.get('/plant/delete/'+id)
        .then(response=> {
            setDeleteMsg(response.data)
        })
    }
    const detailPlant = (id)=>{
        axios.get('/plant/detail/'+id)
        .then(response=> {
           setPlantData(response.data)
           setShow(true)
        })
    }
    const modalClose = ()=>{
        setShow(false);
    }
    const updatePlant = (event)=>{
        event.preventDefault();
        // update data to backend
        console.log(event.target.name.value)
        axios.post('/plant/update', {
            id: event.target.id.value,
            name:event.target.name.value
        })
        .then(response=>{
            setUpdateMsg(response.data)
        })
    }
    return(
        <Row>
            {
                deleteMsg!=null&&
                <Alert variant="danger">
                  {deleteMsg}
                </Alert>
            }
            {
                filteredPlants !== null ?
                filteredPlants.map((item, index)=>{
                    return(
                        <Card>
                            <Col key={item._id}>
                            <h3>Plant Name: {item.name}</h3>
                            <h3>Added by: {item.added_by &&  item.added_by.username}</h3>
                            <Image src={item.plantPic} thumbnail/>
                            <button type="button" onClick={()=>deletePlant(item._id)}>
                                Delete
                            </button>
                            <button type="button" onClick={()=>detailPlant(item._id)}>
                                Detail/update
                            </button>
                            </Col>
                        </Card>
                    )
                })
                :

              plants &&  plants.map((item, index)=>{
                    return(
                        <Col key={item._id}>
                        <div class="row row-cols-1 row-cols-md-3 g-4 d-flex justify-content-around align-items-sm-center mt-1 mb-2">
                            <div className ="card col " style={{width: "20rem" , height:"40rem"}} >
                            <Image src={item.plantPic} thumbnail  className= "card-img-top pl-1 mt-2" style={{height:"50%",width:"auto"}}  alt={item.name}     />

                            <div class="card-body">
                            <h5  className= "card-title text-center" style={{color: "blue"}}    >Plant Name: {item.name}</h5>
                            <h5>Added by: {item.added_by &&  item.added_by.username}</h5>
                            <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content. </p>
                            <div class=" mt-5 ms-3  mb-3">
                            <button type="button" onClick={()=>detailPlant(item._id)}  className="btn btn-outline-primary me-md-2 btn-lg position-relative"  >
                                Detail/update
                            </button>
                            <button type="button" onClick={()=>deletePlant(item._id)}  className ="btn btn-outline-danger me-md-5 mt-2 btn-lg  position-relative"        >
                                Delete
                            </button>
                            </div>
                            </div>
                            </div>
                        </div>
                        </Col>
  
                    )
                })
            }


        <Modal show={show} onHide={modalClose}>
            <Modal.Header closeButton>
            <Modal.Title>Plant Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {
                 updateMsg != null &&
                    <Alert variant="success">
                       {updateMsg}
                    </Alert>
                }
                <Form onSubmit={updatePlant}>
                    <input type="hidden" name="id" value={plantData._id}/>
                    <Form.Group controlId="plantName">
                        <Form.Label>Plant Name</Form.Label>
                        <Form.Control type="text" name="name" defaultValue={plantData.name}/>
                    </Form.Group>
                    <Form.Group controlId="plantPic">
                        <Form.Label>Plant picture</Form.Label>
                        <Image src={plantData.plantPic} thumbnail/>
                    </Form.Group>
                    <Button variant="danger" type="submit">
                        Update changes
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>


        </Row>
    )
}

export default All_plant;