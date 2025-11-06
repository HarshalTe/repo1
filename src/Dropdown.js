import { useState } from "react";

const Dropdown = () => {
    const [val,setval] = useState();
    const arob = [
        {
            company_name: "google",
            work: "web dev"
        },
        {
            company_name: "Microsoft",
            work: "app dev"
        },
        {
            company_name: "Apple",
            work: "Networking"
        }
        

    ]

    const arr2 = [
     {
        ob1:"hgdf"
       
     }
    ]

    const getval = (e)=>{
          setval(e.target.value);
          console.log(val + "*******************val*******************");
    }
    return (
        <>
            <select  >


                {arob.map((e, i) => {
                    return (<>


                        <option key={i} onChange={getval}  value={e.company_name}>{e.company_name}</option>

                    </>);
                })}


            </select>

        </>
    );
}
export default Dropdown;