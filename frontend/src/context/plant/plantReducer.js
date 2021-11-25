
function plantReducer(state , action) {
    switch(action.type){
        case 'GET_PLANTS' :
            console.log('action.payload' , action.payload);
            return {
                ...state,
                plants:action.payload
            }
        case 'FILTER_PLANTS':
            return {
                ...state,
                filteredPlants:state.plants.filter(plant=>{
                     
                     const search =  new RegExp(action.payload ,'gi')                 
                    if(plant.name.match(search) || plant.added_by.username.match(search)){
                        return plant
                    }
                })
            }
        default:
        return state;    
    }
}

export default plantReducer
