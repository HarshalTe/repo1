import { useNavigate } from "react-router-dom";

const Sp2 = ()=>{
    const nav = useNavigate()
  
    const logout = ()=>{
       
       const log =  localStorage.setItem('log',false)
        if(log != true)
        {
           nav('/');
        }
    }
    return(
        <>
             <h1>Home Page</h1>
             <button onClick={logout}>LOGOUT</button>
        
        </>
    );
}
export default Sp2;