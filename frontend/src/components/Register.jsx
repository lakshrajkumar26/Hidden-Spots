import { useState , useRef } from 'react';
import axios from 'axios';
import './register.css';
import RoomIcon from '@mui/icons-material/Room';
import CloseIcon from '@mui/icons-material/Close';
import logo from "../assets/logo.png"




const Register= ({setShowRegister}) => {
  const [success,setSuccess]  = useState(false);
  const [error,setError]  = useState(false);
const nameRef = useRef();
const emailRef = useRef();
const passwordRef = useRef();
const handleSubmit = async (e) => {
    e.preventDefault();
    const newUser = {
        username : nameRef.current.value,
        email : emailRef.current.value,
        password : passwordRef.current.value 
    };
    try{
     const res =  await axios.post("/api/register", newUser);
     setError(false);
     setSuccess(true);
    }
    catch(err){
        setError(true);
    }
}

    return (
        <>
        <div className="registerContainer">
            <div className="logo">
                 <img src={logo} alt="" />
                <RoomIcon/>
                Hidden Location
            </div>
            <form onSubmit={handleSubmit}>
                <CloseIcon className='registerCancel' onClick={ ()=>setShowRegister(false)}/>
                <input type="text" placeholder='username' ref={nameRef} />
                <input type="email" placeholder='email' ref={emailRef}/>
                <input type="password" placeholder='password' ref={passwordRef} />
                <button className='registerBtn'>Register</button>
                {success && <span className='success'> successfull.You can Login now </span>
                }  {error  && <span className='failure'>Something went wrong  </span>
                }
           
            </form>
            
        </div>
        </>
    )
}

export default  Register;