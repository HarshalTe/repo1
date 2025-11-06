import { useState } from "react";

const Field = ()=>{
    const [field,detfield] = useState([]);

    const add = ()=>{
       detfield([...field,field + 1]) 
    }
    return(
        <>
          {
            field.map((e,i)=>{
                return(
                    <>
                      <input type="text" value={field}    />
                      <br></br>

                    </>
                );
            })
          }    
          <button onClick={add}>add</button>
        </>
    )
}
export default Field;










// import { useState } from "react";

// const Field = () => {
//   const [fields, setFields] = useState(0);

//   const add = () => {
//     setFields(fields); // ek aur input add karo
//   };

//   return (
//     <>
//       {[...Array(fields)].map((_, i) => (
//         <div key={i}>
//           <input type="text" />
//           <br />
//         </div>
//       ))}
//       <button onClick={add}>Add</button>
//     </>
//   );
// };

// export default Field;

