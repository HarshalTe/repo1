import { useState } from "react";
import { useDispatch,useSelector } from "react-redux";
import { postdata } from "./Redux/slice";
const Postdata = () => {
    const dispatch = useDispatch();
     const getname = useSelector((state)=> state.user.fulldata)
     console.log(getname  + "   getname");
    const [userdata, setuserdata] = useState({ name: "", last: "" });
    

    const change = (e)=>{
      setuserdata({...userdata,[e.target.name]:e.target.value}); 
    }

    const handlesubmit =  (e)=>{
        e.preventDefault();
        dispatch(postdata(userdata));
        setuserdata({ name: "", last: "" })
    }
    const update = (index)=>{
        setuserdata({name:getname[index].name,last:getname[index].last})
        
    }
    const ch = (e)=>{
        
    }
    return (
        <>
            <h1>POST DATA</h1>
            <input type="text" placeholder="First Name"s name="name" value={userdata.name} onChange={change}/>
            <input type="text" placeholder="Last Name" name="last" value={userdata.last} onChange={change} />
            <button onClick={handlesubmit} >SUBMIT</button>
             <select onChange={ch}>
                {getname.map((d,i)=>{
                    return(
                        <>
                           <div key={i}>
                              <option value={d.name}>
                                {d.name}
                              </option>
                           </div>
                        </>
                    );
                })}
             </select>
            {
                getname.map((u,index)=>{
                    return(
                        <>
                            <div key={index}>
                                  <h1>{`${index}  ${u.name}   ${u.last}`}</h1>
                                  <h1><button onClick={()=>update(index)}>update</button></h1>
                            </div>
                        </>
                    )
                })
            }
        </>
    );
}
export default Postdata;