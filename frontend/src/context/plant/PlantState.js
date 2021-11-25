import React , {useReducer} from 'react';
import axios from 'axios'
import plantContext from './plantContext';
import plantReducer from './plantReducer';
const initialState = {
    plants: null,
    filteredPlants:null,
    error : null
 }

function PlantState(props) {
    const [state , dispatch] = useReducer(plantReducer , initialState);

    const getPlants = async()=>{     
       try {
           const response = await axios.get('/plant/allPlants');
           console.log(response.data);
           dispatch({ type :'GET_PLANTS' , payload : response.data})
           
       } catch (error) {
           console.log(error)
           dispatch({ type :'PLANTS_ERROR' ,payload:error.response.msg })
       }
    }
    const addPlant = async(formData)=>{
        const config = {
           
            headers: {
               
                'Accept':            'application/json',
                'Content-Type': "multipart/form-data"
            },
            withCredentials: true
       
    }
    try {
        const response = await axios.post('/plant/add', formData, config);
       
        console.log(response.data);
        dispatch({ type :'ADD_PLANT' ,payload:response.data });
        
    } catch (error) {
        
    }
   }
   const filterPlants = (str)=>{
      // console.log(' we are searching.....' ,str);
      dispatch({type :'FILTER_PLANTS' ,payload:str})
   }

    const deletePlant = ()=>{
        console.log(' delete plant ... ')
    }

    const updatePlant = ()=>{
        console.log(' update new plant ... ')
    }
    return (
        <plantContext.Provider value = {{
            plants : state.plants,
            filteredPlants : state.filteredPlants,
            error: state.error,
            getPlants,
            addPlant,
            deletePlant,
            updatePlant,
            filterPlants
        }}>
            {props.children}
        </plantContext.Provider>
    )
}

export default PlantState
