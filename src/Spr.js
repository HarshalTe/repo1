import React,{useState} from "react";
import { useDispatch,useSelector } from "react-redux";
import {add} from "./Redux/postslice"

const Spr = ()=>{
    const dispatch = useDispatch();
    const information = useSelector((state)=>state.post.postdata);
   console.log(information + "information");

    const info = {
          name:"",
          lname:""
    }
    const [usredata,setuserdata]=useState(info);

    const handlechange=(e)=>{
       setuserdata({...usredata,[e.target.name]:e.target.value});
    }
    const handleclick=()=>{
         dispatch(add(usredata))
    }
   return(
    <>
      <h1>USER DATA</h1>
      <br></br>
      <input type="text" placeholder="Enter First Name" name="name" value={usredata.name} onChange={handlechange} />
         <br></br>
       <input type="text" placeholder="Enter Last Name" name="lname" value={usredata.lname} onChange={handlechange} />
          <br></br>
          <button onClick={handleclick}>SUBMIT</button>
          <br></br>
          {information.map((itm,i)=>{
            return(
                <>
                    <div key={i}>
                        <h1>{`${itm.name + " "}${itm.lname}`}</h1>
                    </div>
                </>
            );
          })}
    </>
   );   
}
export default Spr