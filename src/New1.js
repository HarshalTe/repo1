import { useEffect, useState } from "react";
import New2 from "./New2";

const New1 = () => {
    const [serachdata,setsearchdata] = useState('');
    const [info,setinfo] = useState([]);

    const [fullname, setfullname] = useState({ name: "", last: "" });
    const [showform, setshowform] = useState(false);
    const [id, setid] = useState(null);
    const change = (e) => {
        setfullname({ ...fullname, [e.target.name]: e.target.value })
    }
    const [list, setlist] = useState([]);
    const show = (e) => {
        e.preventDefault()
        setlist([...list, fullname]);
        setfullname({ name: "", last: "" });
    }
    const update = (e, i) => {

        setshowform(true);
        setid(i);
    }
    const deletedata = (i)=>{
       const dlist = [...list];
       const a1 = dlist.splice(i,1);
       console.log(a1);
       setlist(dlist);
    }
    const search = (e)=>{
      setsearchdata(e.target.value)
    }
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("https://jsonplaceholder.typicode.com/posts");
        const data = await res.json(); 
        setinfo(data);
      } catch (error) {
        alert(error);
      }
    };

    fetchData();
  }, []);

    return (
        <>
            <h1>NEW FORM-MDATA</h1>
            <br></br>
            <input type="text" placeholder="Enter First Name" name="name" value={fullname.name} onChange={change} />
            <br></br>
            <input type="text" placeholder="Enter Last Name" name="last" value={fullname.last} onChange={change} />
            <br />
            <button onClick={show}>CREATE</button>
            {/* <br></br>
            <input type="text" placeholder="search here" onChange={search} value={serachdata}/> */}
          
            {
                list.map((e, i) => {
                    return (
                        <>
                            <div key={e}>
                                <h1>{`${e.name}   ${e.last}`}</h1>
                                <button onClick={() => { update(e, i) }}>UPDATE</button>
                                <button onClick={()=>deletedata(i)}>DELETE</button>
                            </div>
                        </>
                    );
                })
            }
            <br></br>
            {showform && <New2 id={id} list={list}  setlist={setlist} />}
            <br></br>
             {/* {info.map((e,i)=>{
                return(
                    <>
                       <div key={i}>
                           <h1>{e.title}</h1>
                       </div>
                    
                    </>

                )
             })} */}
        </>
    );
}
export default New1;