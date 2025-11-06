import { click } from "@testing-library/user-event/dist/click";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Create } from "./Redux/createslice1"
import { Link, useNavigate } from "react-router-dom";


const Redux1 = () => {
    const [information, setinformation] = useState({ name: "", last: "" });
    const [id1, setid1] = useState(null)
    const dispatch = useDispatch();
    const navegate = useNavigate()
    const info = useSelector((state) => state.crud1.userdata)
    console.log(JSON.stringify(info) + "    info JSON.stringify(state.userdata)")
    const change = (e) => {
        setinformation({ ...information, [e.target.name]: e.target.value });
    }
    const click = (e) => {
        e.preventDefault();
        dispatch(Create(information));
        setinformation({ name: "", last: "" });

    }
  
    return (
        <>
            <br></br>
            <input placeholder="Enter Name" type="text" name="name" value={information.name} onChange={change} />
            <br></br>
            <input placeholder="Enter Name" type="text" name="last" value={information.last} onChange={change} />
            <br></br>
            <button onClick={click}>CREATE</button>
            {
                info.map((ele, i) => {
                    return (
                        <>
                            <div key={i}>
                                <h1>{ele.name}</h1>
                                <h1>{ele.last} <Link to={`/c/${i}`} >UPDATE</Link></h1>
                            
                            </div>
                        </>
                    );
                })
            }
        </>
    );
}
export default Redux1;