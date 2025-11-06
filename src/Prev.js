import { useState } from "react";

const Prev = ()=>{ 
        const [task,settask] = useState();
        const [tasklist,settasklist] = useState([]);
        
  
        const handlechange = (e)=>{
             settask(e.target.value);   
           
        }

        const add = (e)=>{
            e.preventDefault();
           
            settasklist([...tasklist,task]);

        
           
            
                settask("");
            console.log("tasklist" + tasklist);
        }


        const del = (index)=>{
         
           const fill = tasklist.filter((_,id)=>{ return(
                    id!== index
           );})
           settasklist([fill]);
        }


        const update = (index)=>{
               settask(tasklist[index]) ;
        }


             

        

    return(    
        <>
           <h1>Prev Example</h1>
           <input type="text" placeholder="add task" value={task} onChange={handlechange} />
                 <button onClick={add}>ADD</button>
             {tasklist.map((e,index)=>{
                return(<>
                        <div key={index}>
                            <h1>{e}</h1>
                              <button onClick={()=>update(index)}>update</button>
                             <button onClick={()=>del(index)}>delete</button>
                             
                        </div>
                   
                </>);
             })}
     
            
             
        
        
        </>
    );
}
export default Prev;