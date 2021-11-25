import React,  { useEffect , useState , useContext} from 'react'
import axios from 'axios';
import AuthContext from '../context/auth/AuthContext';

function Dashboard() {
    const {  user , isAuthenticated  } = useContext(AuthContext);

    useEffect(()=>{
       
        if(!isAuthenticated){
           // window.location.href = '/signinform';
        }

    },[])
   

    //const [user , setUser] = useState({});
    // const logoutUser = async()=>{
    //     const response = await axios.get('/user/logout');
    //     if(response.data.success) {
    //      setUser({});
    //      window.location.href = '/signinform';
    //     }
    // }

    // useEffect(async()=>{
    //    const response = await axios.get('/user/dashboard')  ;
    //    try {
    //        console.log(response);
    //        setUser(response.data.user);
           
    //    } catch (error) {
    //        setUser({ msg : error})
    //    }
    // },[]);
    return (
        <div>
            
            <h1> This is the user Page </h1>
          
            {user !== null &&
             <p>  <h2>  welcome back       {user.username}  </h2> 
                 <img src={user.profile_pic} />
             </p>
            
            } 
            
        </div>
    )
}

export default Dashboard
