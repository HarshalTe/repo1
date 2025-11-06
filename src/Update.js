import { useState } from "react"

const Update = ()=>{
        const [updateuser,setupdateuser] = useState();
        const [show,setshow] = useState(false);
    const userdata = [
    
        {
            name:"anshu"

        },
        {
            name:"vikash"
        },
        {
            name:"harshal"
        },
        {
            name:"sandeep"
        },
        {
            name:"kabir"
        }

    ]
      const [list,setlist] = useState(userdata);
    
    const handlechange =  (e)=>{
         setupdateuser(e.target.value); 
         console.log(updateuser + "<=============>updateuser")
    }

    const Up = (index)=>{
           const pre =  list[index];
           setupdateuser(pre.name);
           setshow(true);
    }
    const sub = (e)=>{
       e.preventDefault();

    }
    return(
        <>
        <h1>UPDATE DATE</h1>
        
          {list.map((ele,index)=>{
            return(<>
                 <div key={index}>

                   <h1>{ele.name}<button onClick={()=>Up(index)}>UPDATE</button></h1>
                  

                 </div>
            </>);
          })}

           <br></br>
           {show && <input type="text" placeholder="Username" value={updateuser} onChange={handlechange} />}
                      {show && <button onClick={sub} >SUBMIT</button>}
                   
        
        </>
    );
}
export default Update;