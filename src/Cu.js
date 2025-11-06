import { useState } from "react";
import Cu2 from "./Cu2";

const Cu = () => {

    const fullname = {
        name: "",
        middle: "",
        last: ""
    }
    const [user, setuser] = useState(fullname);
    const [list, setlist] = useState([]);
    const [show, setshow] = useState(false);
    const [select,setselect] = useState([]);

    const change = (e) => {
        setuser({ ...user, [e.target.name]: e.target.value });
        console.log(user)

    }
    const click = (e) => {
        e.preventDefault();
        setlist([...list, user]);
        setuser(fullname);

        console.log(JSON.stringify(list) + "=======fullname");
    }

    const update = (index) => {
        const updated = list[index]
        setshow(true);
        setselect(updated);
        console.log(JSON.stringify(select) + "*********************");

    }

    return (<>
        <h1>Create And Update</h1>
        <br></br>
        <input type="text" placeholder="First Name" name="name" value={user.name} onChange={change} />
        <input type="text" placeholder="Middle Name" name="middle" value={user.middle} onChange={change} />
        <input type="text" placeholder="Last Name" name="last" value={user.last} onChange={change} />
        <button onClick={click}>CREATE</button>
        {list.map((ele, index) => {
            return (
                <>

                    <div key={index}>

                        <h3>{ele.name} {ele.middle} {ele.last} <button onClick={()=>update(index)}>UPDATE</button></h3>

                    </div>


                </>
            );
        })}
        <br></br>
        <br></br>
       {show && <Cu2 show={show} setshow={setshow} select={select} setlist={setlist} list={list}  />}



   
    </>);

}
export default Cu;