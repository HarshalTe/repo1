import { useState } from "react";
import { useDispatch,useSelector } from "react-redux";
import {loginuser} from '././Redux/Loginslice'
import { useNavigate } from "react-router-dom";


const Login = ()=>{
    const [userdata,setuserdata] = useState({email:"",password:""});
    const dispatch = useDispatch()
    const usedata  = useSelector((state)=>state.login.user);
     const email = usedata?.email;
     const password = usedata?.password;
     const navigate = useNavigate()

    const handlechange = (e)=>{
       setuserdata({...userdata,[e.target.name]:e.target.value});
    }
    const handleclick = (e)=>{
       e.preventDefault();
       dispatch(loginuser(userdata));
       if(userdata.email != "harshal" || userdata.password != "password") 
        {
            alert("wrong data");
        } 
       
         navigate('/log');
    }
    return(
        <>
           <h1>Login Form</h1>
            <input type="text" placeholder="Enter Email" name="email" value={userdata.email} onChange={handlechange} />
            <br></br>
            <input type="text" placeholder="Enter Password" name="password" value={userdata.password}  onChange={handlechange}/>
            <br></br>
            <button onClick={handleclick}>Login</button>
        </>
    );

}
export default Login;