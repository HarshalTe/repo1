import { useState } from "react";

const Create = ()=>{
    const [details,setdetails] = useState({name:"",mid_name:"",last_name:""});
    const [getdata,setgetdata] = useState([]);
    const usersdata = {name1:"",name2:"",name3:""}
    const handlechange = (e) =>{
        setdetails({...details,[e.target.name]:e.target.value});
        console.log(details); 
    }

    const handlesubmit = (e)=>{
        e.preventDefault(e)
       setgetdata([...getdata,details]); 

            //   setgetdata([...getdata,{NAME:details.name,MIDDLE_NAME:details.mid_name,LAST_NAME:details.last_name}]); 
       console.log(getdata);
       setdetails({name:"",mid_name:"",last_name:""});
    }

   const deletedata = (index) => {
    const newData = getdata.filter((_, i) => i !== index);
    setgetdata(newData);
  };
  
  const updatedata = ()=>{
    
  }
 

    return(<>
     <form onSubmit={handlesubmit}>
      <h1>Create Data</h1>
        <input type="text" placeholder="Enter Name" name="name" value={details.name} onChange={handlechange}/>
        <br/>
        <input type="text" placeholder="Enter Middle Name" name="mid_name" value={details.mid_name} onChange={handlechange}/>
        <br/>
          <input type="text" placeholder="Enter Last Name" name="last_name" value={details.last_name} onChange={handlechange}/>
        <br/>
        <button type="submit">SUBMIT</button>
        </form>
        {getdata.map((ele, index) => {
        return (
          <div key={index}>
            <h1>{ele.name}</h1>
            <h1>{ele.mid_name}</h1>
            <h1>{ele.last_name}</h1>
            <h1><button onClick={()=>deletedata(index)}>Delete</button></h1>
             <h1><button onClick={()=>updatedata(index)}>Update</button></h1>
          </div>
        );
      })}
    
    </>);
}

export default Create;