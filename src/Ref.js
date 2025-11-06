import { useRef } from "react";
const Ref = ()=>{
   const Ref1 = useRef();
   const ref2 = useRef("harshal");

   const change = ()=>{
        ref2.current = "terekar"
        console.log(ref2.current + "ref2.current")

       if (Ref1.current.style.backgroundColor === "red") {
      Ref1.current.style.backgroundColor = "";
    } else {
      Ref1.current.style.backgroundColor = "red";
    }
     

   }
   
    return(
        <>
             <input type="text"  placeholder="change colour" ref={Ref1}/>  
             <h1>{ref2.current}</h1>
             <button onClick={change}>change</button>
            
        </>
    );
}
export default Ref;