import { useEffect, useState } from "react";

const Start2 = ({id,setid,userdata,setuserdata,select})=>{
   
  //  const [formdata,setformdata] = useState({ name: "", last: "" })
      const [formdata,setformdata] = useState(select)
   const change = (e)=>{
       setformdata({...formdata,[e.target.name]:e.target.value});
   }

      
    useEffect(() => {
        if (id !== null) {
            setformdata(userdata[id]);
        }
    }, [id, userdata]);


    const savedata = () => {
    const newData = [...userdata]; // create a copy of the array
    newData[id] = formdata;        // update the specific index
    setuserdata(newData);           // set the new array
    setid(null);                    // optional: hide form after saving
};

  
  return(
    <>
        <h1>UPDATE FORM</h1>
        <input type="text" placeholder="name" name="name" value={formdata.name} onChange={change} />
         <input type="text" placeholder="last" name="last" value={formdata.last} onChange={change} />
         <button onClick={savedata}>SAVE</button>
    
    </>
  );
}
export default Start2;