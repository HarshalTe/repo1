import { useEffect, useState } from "react";
import { useSelector,useDispatch } from "react-redux";
import {Up} from '././Redux/Postshowslice'

const Postshow2 = ({id})=>{
    const data = useSelector((state) => state.postshow.userdata);
    const dispatch = useDispatch();
 
    const [updatedata,setupdatedata] = useState(
        {
            name:"",
            last:""
        }
    );
    useEffect(()=>{
         setupdatedata({
              name:data[id].name,
              last:data[id].last
         })
    },[id,data])
    const change =  (e)=>{
       setupdatedata({...updatedata,[e.target.name]:e.target.value})
    }
    const click = (e)=>{
       e.preventDefault();
       dispatch(Up({updatedata,id}))
    }
    return(
        <> <h1>Update Data</h1>
          <br/>
           <input type="text" name="name" placeholder="Enter Name" onChange={change} value={updatedata.name} />
           <br/>
            <input type="text" name="last" placeholder="Enter Last Name" onChange={change} value={updatedata.last} />
               <br/>
            <button onClick={click}></button>
        
        </>
    );  
}
export default Postshow2;