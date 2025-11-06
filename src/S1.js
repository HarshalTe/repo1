import { useState } from "react";

const S1 = () => {
    const [createdata, setcreatedata] = useState({ first: "", second: "" });
    const [listdata, setlistdata] = useState([]);
    const [id, setid] = useState(null); 

    const change = (e) => {
        setcreatedata({ ...createdata, [e.target.name]: e.target.value });
    };
    
    const click = (e) => {
        e.preventDefault();
        if (id !== null) {
           
            const updatedList = listdata.map((item, index) =>
                index === id ? createdata : item
            );
            setlistdata(updatedList);
            setid(null); 
        } else {
            
            setlistdata([...listdata, createdata]);
        }
        setcreatedata({ first: "", second: "" }); 
    };

    const Up = (i) => {
        setid(i); 
        setcreatedata(listdata[i]); 
    };

       const Del = (i) => {
    const dt = listdata.filter((_   , index) => index !== i);
    setlistdata(dt);}
    return (
        <>
            <h1>Create Data</h1>
            <input
                type="text"
                placeholder="Enter Name"
                name="first"
                value={createdata.first}
                onChange={change}
            />
            <br />
            <input
                type="text"
                placeholder="Enter Last Name"
                name="second"
                value={createdata.second}
                onChange={change}
            />
            <br />
            <button onClick={click}>{id !== null ? "Update" : "Create"}</button>
            <br />
            {listdata.map((e, i) => (
                <div key={i}>
                    <h1>{e.first}</h1>
                    <h1>{e.second}</h1>
                    <button onClick={() => Up(i)}>Update</button>
                    <button onClick={()=>Del(i)}>Delete</button>
                </div>
            ))}
        </>
    );
};

export default S1;
