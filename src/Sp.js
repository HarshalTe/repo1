import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Sp = () => {
   const [fullname,setfullname] = useState({
      name:'',
      last:''
   });
   const [log,setlog] = useState(true);
   const nav = useNavigate()
   const change = (e)=>{
       setfullname({...fullname,[e.target.name]:e.target.value});
   }
   
   const click = (e)=>{  
     e.preventDefault();
     localStorage.setItem("data",JSON.stringify(fullname));
     setfullname({
      name:'',
      last:''
   })
   }
   
   const login = (e)=>{
      e.preventDefault();
     const getdata = JSON.parse(localStorage.getItem("data"));
     
     if(fullname.name === getdata.name && fullname.last === getdata.last){
           nav('/home');
           localStorage.setItem("log",log)
     }
    
     }

   return (
      <>
         <h1>CREATE USERNAME</h1>
         <input type="text" placeholder="Enter a name" name="name" value={fullname.name} onChange={change}/>
         <br></br>
         <input type="text" placeholder="Enter a name" name="last" value={fullname.last} onChange={change}/>
         <br></br>
         <button onClick={click}>SUBMIT</button>
          <button onClick={login}>Login</button>
      </>
   );
}
export default Sp;