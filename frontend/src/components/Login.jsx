import './login.css';
import { useState , useRef } from 'react';
import axios from 'axios';
import RoomIcon from '@mui/icons-material/Room';
import CloseIcon from '@mui/icons-material/Close';
import logo from "../assets/logo.png"


const Login = ({setShowLogin, myStorage , setCurrentUser}) => {


const [error,setError]  = useState(false);
const nameRef = useRef();
const passwordRef = useRef();
const handleSubmit = async (e) => {
    e.preventDefault();
    const user = {
        username : nameRef.current.value,
        password : passwordRef.current.value 
    };
    try{
       
     const res =  await axios.post("/api/login", user); 
     myStorage.setItem("user",res.data.username)
     setCurrentUser(res.data.username);
     setShowLogin(false);
     setError(false);
    }
    catch(err){
        setError(true);
    }
}

    return (
        <>
        <div className="loginContainer">
            <div className="logo">
                <img src={logo} alt="" />
                {/* <RoomIcon/> */}
                Hidden Location
            </div>
            <form onSubmit={handleSubmit}>
                <CloseIcon className='loginCancel' onClick={ ()=>setShowLogin(false)}/>
                <input type="text" placeholder='username' ref={nameRef} />
                <input type="password" placeholder='password' ref={passwordRef} />
                <button className='loginBtn'>Login</button>
                 {error  && <span className='failure'>Something went wrong  </span>
                }
           
            </form>
            
        </div>
        </>
    )
}

export default  Login;