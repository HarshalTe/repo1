import { useState } from "react";

const Createdata  = ()=>{
    const [createdata,setcreatedata] = useState({
        firstname:"",
        lastname:"",
    });


    const change = ()=>{

    }
    return(
        <>
           <h1>CREATE DATA</h1>
           <br></br>
           <input type="text" placeholder="First Name"  onChange={change}   />
           <br></br>
           <input type="text" placeholder="Last Name"  onChange={change} />
           <br></br>
           <button></button>

        </>
    );
}
export default Createdata;