import React , {useReducer} from 'react';
import axios from 'axios';
import AuthContext from './AuthContext';
import AuthReducer from './AuthReducer';
function AuthState(props) {
    const initialState = {
        user:null,
        error:null,
        isAuthenticated:false,
    }
    const [state , dispatch ] = useReducer( AuthReducer,initialState);

    const loadUser = async()=>{  // when we load the component or when we refrech
      try {
          const response = await axios.get('/user/auth');
          dispatch({type : 'LOAD_USER' , payload : response.data})
          
      } catch (error) {
          dispatch({ type : 'AUTH_ERROR' , payload : 'Server Error'})
          
      }
    }
    const login = ()=>{ 
        console.log(' Login user...')
    }
    const logout = async()=> {
        try {
            const response = await axios.get('/user/logout');
            dispatch({ type : 'LOGOUT' , payload : response.data })
            
        } catch (error) {
            dispatch({ type : 'LOGOUT_ERROR' , payload : 'LOGOUT Error'})
            
        }
     
    }
    const signup = ()=>{
        console.log('sign up user...')
    }

    return (
        <AuthContext.Provider value = {{
                                        user: state.user,
                                        isAuthenticated: state.isAuthenticated,
                                        error: state.error,
                                        login,
                                        logout,
                                        signup,
                                        loadUser        
                                      }}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthState
