import { useState } from "react";
import Start2 from "./Start2"
const Start = () => {
    const [show, setshow] = useState(false);
    const [id, setid] = useState(null);
    const [select, setselect] = useState();
    console.log(g + "==================select");
    var g = null;
    const [userdata, setuserdata] = useState([
        {
            name: "harshal",
            last: "terekar"
        },
        {
            name: "anshu",
            last: "singh"
        },
        {
            name: "vilash",
            last: "sahu"
        },
        {
            name: "kabir",
            last: "ramanandi"
        },
    ])

    const up = (i) => {

        setid(i)
        setshow(true)
        const data = userdata[i]
        setselect(data);
    }
    return (
        <>
            {
                userdata.map((e, i) => {
                    return (
                        <>
                            <div key={i}>

                                <h1>{`${e.name}  ${e.last}`}</h1>
                                <button onClick={() => up(i)}>UPDATE</button>
                            </div>
                        </>
                    );
                })
            }
            <br />
            {show && <Start2 id={id} setid={setid} userdata={userdata} setuserdata={setuserdata} select={select} />}
        </>
    );
}
export default Start;