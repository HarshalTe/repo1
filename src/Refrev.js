



import { useEffect, useRef, useState } from "react";

const Refrev = ()=>{
    const ref1 = useRef("harshal");
    const [num,setnum] = useState(0);


    const click = ()=>{
        setnum(num + 1)
    }

    const change = ()=>{
            ref1.current = ref1.current === "anshu" ? "harshal" : "anshu";
          
         console.log(ref1.current + "    ref1.current")    
    }

    useEffect(()=>{
       change();
    },[num])

   return(
    <>
        
        <h1>USE REF</h1>
        <h1>{ref1.current}</h1>
        <h1>{num}</h1>

        <button onClick={click}>change</button>
          
    
    </>
   );
}
export default Refrev;