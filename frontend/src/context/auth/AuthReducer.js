import React from 'react'

function AuthReducer(state , action) {
    switch(action.type){
        case 'LOAD_USER' : 
        return {...state , isAuthenticated: true , user : action.payload.user };

        case 'AUTH_ERROR' : 
        return {...state , isAuthenticated: false , user:null , error : action.payload };

        case 'LOGOUT' :
            console.log(action.payload)
            return { ...state, isAuthenticated :false,user:null }

        default : return state;

    }
     
}

export default AuthReducer
