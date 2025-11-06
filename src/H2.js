


import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { add,up,deleted} from "./Redux/crudslice";

const H2 = () => {
  const [userdata, setuserdata] = useState({ name: "", last: "" ,fname:[],aou:[]});
  const dispatch = useDispatch();
  const [id,setid] = useState(null);
  const {alldata} = useSelector((state)=>state.crud);
  const fname = ['banana','apple','grapes','orange','mango'];
  const aou = [
         {
            company:'google',
            work:['web dev','data svience','cyber security']
         },
         {
          company:'facebook',
          work:['app,dav','ios dev','mashine lerning']
         },
         {
           company:'apple',
           work:['graphic design','netwoeking','full-stack']
         }
  ]

  const change = (e) => {
    setuserdata({ ...userdata, [e.target.name]: e.target.value });
  }
  const click = (e) => {
    e.preventDefault();
    dispatch(add(userdata,setuserdata));
    setuserdata({ name: "", last: "" })
    }
    const update = (i)=>{
      setuserdata(alldata[i]);
      setid(i)
    }
    const updated = ()=>{
       dispatch(up({id,userdata}));
        setuserdata({ name: "", last: "" })
        
    }
    const Del = (i)=>{
      dispatch(deleted(i));
    }
  return (
    <>
      <input type="text" placeholder="Enter First Name" value={userdata.name} name="name" onChange={change} />
      <br></br>
      <input type="text" placeholder="Enter Last Name" last="last" value={userdata.last} name="last" onChange={change} />
      <br></br>
      <select onChange={change} name="fname" value={userdata.fname}> 
        {
            fname.map((ech,ele)=>{
              return(
                  <div key={ele}>
                    <option>{ech}</option>
                  </div>
              );
            })
        }
      </select>
        <br></br>
        <select onChange={change} name="aou" value={userdata.aou}>
          {
            aou.map((cn,ci)=>{
                return(
                  <div key={ci}>
                    <option >{cn.company}</option>
                  </div>
                );    
            })
          }
          </select>
        <br></br>
      <button onClick={click}>CREATE</button>
      <button onClick={updated}>UPDATED</button>
      <br></br>
      {
        alldata.map((e,i)=>{
           return(
            <div key={i}>
                <h1>{e.name}</h1>
                 <h1>{e.last}</h1>
                 <h1>{e.fname}</h1>
                    <h1>{e.company}</h1>
                 <button onClick={()=>update(i)}>UPDATE</button>
                 <button onClick={()=>Del(i)}>Delete</button>
            </div>
           );
        })
      }
    </>
  );
}
export default H2;