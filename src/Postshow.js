import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Post,del } from "././Redux/Postshowslice"
import Postshow2 from "./Postshow2"
const Postshow = () => {
    const [userdata, setuserdata] = useState({
        name: "",
        last: ""
    });
    const [id,setid] = useState(null);
    const [show,setshow] = useState(false);
    const data = useSelector((state) => state.postshow.userdata);
    console.log(JSON.stringify(data) + "     JSON.stringify(data)");
    const change = (e) => {
        setuserdata({ ...userdata, [e.target.name]: e.target.value })
    }
    const dispatch = useDispatch()
    const click = (e) => {


        e.preventDefault()

        dispatch(Post(userdata));
        setuserdata({
            name: "",
            last: ""
        })
    }

    const update = (k)=>{
        setid(k)
        setshow(true)

    }
    const del = (k)=>{
             setid(k)
             dispatch(del(id))
    }
    return (
        <>

            <h1>Create Data</h1>
            <br />
            <input type="text" name="name" placeholder="Enter Name" onChange={change} value={userdata.name} />
            <br />
            <input type="text" name="last" placeholder="Enter Last Name" onChange={change} value={userdata.last} />
            <br />
            <button onClick={click}>Create</button>
            <br></br>
            <h1>SHOW LIST</h1>
            {
                data.map((ele,k)=>{
                    return(
                        <>
                           <div key={k}>
                                 <h1>{ele.name}</h1>
                                 <h1>{ele.last}</h1>
                                 <button onClick={()=>update(k)}>Update</button>
                                 <button onClick={()=>del(k)}>Delete</button>
                           </div>
                        </>
                    )
                })
            }
           {
               show && <Postshow2 id={id}/>
           }
        </>
    );
}
export default Postshow;