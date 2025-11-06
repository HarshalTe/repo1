import { click } from "@testing-library/user-event/dist/click";
import { useState } from "react";
import { useContext } from "react";
import {data1} from "./App"

const CRUD1 = () => {
    const mydata = useContext(data1)
    const [fulldata,setfulldata] = useState({name:"",last:""});
    const [id,setid] = useState(null)
    const change = (e)=>{
        setfulldata({...fulldata,[e.target.name]:e.target.value});
    }
    const [list,setlist] = useState([])
    const click = (e)=>{
      e.preventDefault();
      setlist([...list,fulldata])
      setfulldata({name:"",last:""});
   
    }
    const up = (i)=>{
       
        setfulldata(list[i]) 
        setid(null);
    }
    const del = (i)=>{

    }
    return (
        <>
            <h1>CRUD APPLICATION</h1>
            <br></br>
            <input type="text" name="name" placeholder="Enter Name" onChange={change} value={fulldata.name}></input>
            <br></br>
            <input type="text" name="last" placeholder="Enter Last Name" onChange={change} value={fulldata.last} ></input>
            <br></br>
            <button onClick={click}>CREATE   {mydata}</button>
            <br></br>
            {
                list.map((ele,i)=>{
                      return(
                        <>
                            <div key={i}>
                               <h2>{ele.name}</h2>
                               <h2>{ele.last}</h2>
                               <button onClick={()=>up(i)}>Update</button>
                               <button onClick={()=>del(i)}>Delete</button>
                            </div>
                        </>
                      );
                })
            }

        </>
    );
}
export default CRUD1;