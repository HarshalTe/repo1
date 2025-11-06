import { useState } from "react";
import { ArraysObjects1,stringobj,ar2} from "./ArraysObjects1"
import { type } from "@testing-library/user-event/dist/type";
const ArraysObjects = () => {
    const [d, setd] = useState(1);
    const [str,setstr] = useState("harshal");


    return (
        <>

            <h1>{d}</h1>
            <br></br>
            <h1>{str}</h1>
            <br></br>
            <button onClick={() => setd(ArraysObjects1(d, type = "i"))}>+</button>
            <br></br>
            <button onClick={() => setd(ArraysObjects1(d, type = "d"))}>-</button>
            <br></br>
            <button onClick={()=> setstr(stringobj(str))}>change</button>
            <br></br>
            {ar2}

        </>
    );
}
export default ArraysObjects;