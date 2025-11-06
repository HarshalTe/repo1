import { useState } from "react";

const H1 = () => {
  const [userdata, setuserdata] = useState({ first: "", last: "" });
  const [list, setlist] = useState([]);
  const [id, setid] = useState(null);

  const change = (e) => {
    setuserdata({ ...userdata, [e.target.name]: e.target.value });
  };

  const click = (e) => {
    e.preventDefault();
    setlist([...list, userdata]);
    setuserdata({ first: "", last: "" });
  };

  const Update = (i) => {
    setuserdata(list[i]);
    setid(i);
  };

  const up = (e) => {
    e.preventDefault();
    if (id !== null) { 
      const newlist = [...list];
      newlist[id] = userdata;
      setlist(newlist);
      setuserdata({ first: "", last: "" });
      setid(null); 
    }
  };

  const del = (i)=>{
   
       const itm = list.filter((d,di)=>{
            return  di != i
        })

        setlist(itm)
 
  }

  return (
    <>
      <h1>CREATE DATA</h1>
      <input
        type="text"
        placeholder="Enter First Name"
        name="first"
        value={userdata.first}
        onChange={change}
      />
      <br />
      <input
        type="text"
        placeholder="Enter Last Name"
        name="last"
        value={userdata.last}
        onChange={change}
      />
      <br />
      <button onClick={click}>CREATE</button>
      <button onClick={up}>UPDATE</button>
      <br />
      {list.map((e, i) => (
        <div key={i}>
          <h1>{e.first}</h1>
          <h1>{e.last}</h1>
          <button onClick={() => Update(i)}>EDIT</button>
          <button onClick={()=>del(i)}>Delete</button>
        </div>
      ))}
    </>
  );
};

export default H1;
