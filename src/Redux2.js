import { useSelector,useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import {Update} from '././Redux/createslice1'
import { useState } from "react";
const CrudRedux2 = () => {
    const { id } = useParams();
    const ud = useSelector((state) => state.crud1.userdata[id]);
    const dispatch = useDispatch();
    const [information, setinformation] = useState({ name: ud.name, last: ud.last });
    const ch = (e)=>{
        setinformation({...information,[e.target.name]:e.target.value})    
    }
    const up =(e)=>{
     e.preventDefault();
     dispatch(Update(id,information))
    }


    return (
        <>
            <br></br>
            <input placeholder="Enter Name" type="text" name="name" value={information.name} onChange={ch} />
            <br></br>
            <input placeholder="Enter Name" type="text" name="last" value={information.last} onChange={ch} />
            <br></br>
            <button onClick={up}>UPDATE</button>
        </>
    );
}
export default CrudRedux2;