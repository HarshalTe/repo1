import { useState } from "react";
const P = () => {
    const [userdata,setuserdata] = useState({name:"",skills:[]});
    const [getskills,setgetskills] = useState();
    const handlechange = (e)=>{
         if(e.target.name === "skills")
         {
            setuserdata( {...userdata, skills: [...userdata.skills, e.target.value]})
         }
         else{
                  setuserdata({...userdata,[e.target.name]:e.target.value});
            
         } 
         console.log(JSON.stringify(userdata) + "    userdata")   
    }
    const add = ()=>{

    }
    return (
        <>
            <input value={userdata.name} name="name" placeholder="name" onChange={handlechange} />
            <br></br>
            <input value={userdata.skills} name="skills" placeholder="sills" onChange={handlechange} />
            <br></br>
            <button onClick={add}>ADD</button>
            <br></br>
            <button>SUBMIT</button>
        </>
    );
}
export default P;