import { useState } from "react";
import { useNavigate,useParams } from "react-router-dom";


const Param = ()=>{
    const [getval,setgetval] = useState({val:""});
    const [valarr,setvalarr] = useState([]);
    const Nav = useNavigate();
    const {id} = useParams();
    const [userid,setuserid] = useState();
    const change = (e)=>{
     setgetval({...getval,[e.target.name]:e.target.value});
    }
    const Add = (e)=>{
        e.preventDefault();
     setvalarr([...valarr,getval]);
     setgetval({val:""});
    }
    const update = (i)=>{
       Nav(`/show/${i}`);
       setuserid(id)
    }
    return(
        <>
           <h1>ALL DATA</h1>
           <br></br>
          <input type="text" placeholder="Add Data" value={getval.val} onChange={change}  name="val"  />
          <br></br>
          <button onClick={Add}>ADD</button>
          <br></br>
          {valarr.map((e,i)=>{
              return(
                <div key={i}>
                     <h>{e.val}</h>
                     <button onClick={()=>update(i)}>PASS ID</button>
                </div>
              );
          })}
          <h1>{userid}</h1>
        </>
    );
}
export default Param;